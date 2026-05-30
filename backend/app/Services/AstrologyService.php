<?php

namespace App\Services;

use App\DTOs\Github\Commit;
use App\DTOs\Github\Repo;
use App\Http\Integrations\GitHub\GitHubConnector;
use App\Http\Integrations\GitHub\Requests\GetRepoCommitsRequest;
use App\Http\Integrations\GitHub\Requests\GetUserReposRequest;
use App\Http\Integrations\GitHub\Requests\GetUserRequest;
use Illuminate\Support\Str;
use Saloon\Http\Response;

final class AstrologyService
{
    public function getUserAndRepos(string $username): array
    {
        $user = null;
        $repos = [];

        $connector = new GitHubConnector;

        $pool = $connector->pool(
            requests: [
                'user' => new GetUserRequest($username),
                'repos' => new GetUserReposRequest($username),
            ],
            responseHandler: function (Response $response, string $key) use (&$user, &$repos) {
                match ($key) {
                    'user' => $user = $response->dtoOrFail(),
                    'repos' => $repos = $response->dtoOrFail(),
                };
            }
        );

        $promise = $pool->send();

        $promise->wait();

        return [
            $user,
            $repos,
        ];
    }

    /**
     * @param  Repo[]  $repos
     * @return Commit[]
     */
    public function getUserCommits(string $username, array $repos): array
    {
        $connector = new GitHubConnector;

        $commitsRequests = function () use ($username, $repos) {
            foreach ($repos as $repo) {
                yield new GetRepoCommitsRequest($username, $repo->name);
            }
        };

        $commits = [];

        $commitsPool = $connector->pool(
            requests: $commitsRequests,
            responseHandler: function (Response $response) use (&$commits) {
                $commits = [...$commits, ...$response->dtoOrFail()];
            }
        );

        $commitsPromise = $commitsPool->send();

        $commitsPromise->wait();

        return $commits;
    }

    /**
     * @param  Commit[]  $commits
     */
    public function calculateTemporalRhythmSyncRate(array $commits): string
    {
        $activeDays = array_filter($this->calculateTemporalRhythm($commits), fn ($value) => $value > 0);

        $rate = (\count($activeDays) / 7) * 100;

        return round($rate).'%';
    }

    /**
     * @param  Commit[]  $commits
     */
    public function calculateTemporalRhythm(array $commits): array
    {
        $days = [
            'MON' => 0,
            'TUE' => 0,
            'WED' => 0,
            'THU' => 0,
            'FRI' => 0,
            'SAT' => 0,
            'SUN' => 0,
        ];

        $totalCommits = 0;

        foreach ($commits as $commit) {
            $dayName = Str::upper($commit->date->dayOfWeek());

            $map = [
                0 => 'SUN',
                1 => 'MON',
                2 => 'TUE',
                3 => 'WED',
                4 => 'THU',
                5 => 'FRI',
                6 => 'SAT',
            ];

            $cleanDay = $map[$dayName] ?? 'MON';

            $days[$cleanDay]++;

            $totalCommits++;
        }

        if ($totalCommits === 0) {
            return $days;
        }

        return $days;
    }
}
