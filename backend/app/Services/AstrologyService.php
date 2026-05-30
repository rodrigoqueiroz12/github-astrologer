<?php

namespace App\Services;

use App\Ai\Agents\AstralMapGeneratorAgent;
use App\Ai\Agents\BabelFishGeneratorAgent;
use App\DTOs\Github\Commit;
use App\DTOs\Github\Repo;
use App\DTOs\Github\User;
use App\Http\Integrations\GitHub\GitHubConnector;
use App\Http\Integrations\GitHub\Requests\GetRepoCommitsRequest;
use App\Http\Integrations\GitHub\Requests\GetUserReposRequest;
use App\Http\Integrations\GitHub\Requests\GetUserRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
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

    /**
     * @param  Repo[]  $repos
     * @param  Commit[]  $commits
     * @return array[]|array{babel_fish_trigger: array, recent_repositories: array, user_metadata: array{account_created_at: string, followers: string, public_repos_total: string}}
     */
    protected function buildContext(User $user, array $repos, array $commits): array
    {
        $context = [
            'user_metadata' => [
                'account_created_at' => $user->createdAt,
                'public_repos_total' => $user->publicRepos,
                'followers' => $user->followers,
            ],
            'recent_repositories' => [],
            'babel_fish_trigger' => [],
        ];

        foreach ($repos as $repo) {
            $repoData = [
                'name' => $repo->name,
                'language' => $repo->language ?? 'Unknown',
                'commit_messages' => [],
                'commit_hours' => [],
            ];

            collect($commits)->filter(fn ($commit) => $commit->repo === $repo->name)->each(function (Commit $commit) use (&$repoData) {
                $repoData['commit_messages'][] = $commit->message;
                $repoData['commit_hours'][] = $commit->date->format('H:i');
            });

            $context['recent_repositories'][] = $repoData;
        }

        /** @var Commit|null */
        $latestCommit = collect($commits)->sortByDesc(fn ($commit) => $commit->date)->first();

        if ($latestCommit) {
            $context['babel_fish_trigger'] = [
                'sha' => $latestCommit->sha,
                'message' => $latestCommit->message,
            ];
        }

        return $context;
    }

    /**
     * @param  Repo[]  $repos
     * @param  Commit[]  $commits
     * @return array{ascendant_name: mixed, ascendant_quote: mixed, ascendant_status: mixed, ascendant_tags: mixed, ascendant_title: mixed, babel_fish_haiku: mixed, babel_input_hash: mixed, babel_input_message: mixed, collaboration_flow: mixed, constellation_phase: mixed, cosmic_reach: mixed, lunar_cycle: mixed, orbital_cycles: mixed, solar_sign_description: mixed, solar_sign_tags: mixed, solar_sign_title: mixed|null}
     */
    public function generateAstralMap(User $user, array $repos, array $commits): ?array
    {
        try {
            $context = $this->buildContext($user, $repos, $commits);

            $response = Cache::driver('redis')->remember(
                key: "user:{$user->username}:astral_map",
                ttl: now()->addMinutes(30),
                callback: function () use ($context) {
                    $response = (new AstralMapGeneratorAgent)->prompt('Gere um mapa astral utilizando este contexto: '.json_encode($context));

                    return [

                        'lunar_cycle' => Arr::get($response, 'lunar_cycle'),

                        'cosmic_reach' => Arr::get($response, 'cosmic_reach'),

                        'solar_sign_title' => Arr::get($response, 'solar_sign_title'),

                        'solar_sign_description' => Arr::get($response, 'solar_sign_description'),

                        'solar_sign_tags' => Arr::get($response, 'solar_sign_tags'),

                        'ascendant_name' => Arr::get($response, 'ascendant_name'),

                        'ascendant_status' => Arr::get($response, 'ascendant_status'),

                        'ascendant_title' => Arr::get($response, 'ascendant_title'),

                        'ascendant_tags' => Arr::get($response, 'ascendant_tags'),

                        'ascendant_quote' => Arr::get($response, 'ascendant_quote'),

                        'babel_input_hash' => Arr::get($context, 'babel_fish_trigger.sha'),

                        'babel_input_message' => Arr::get($context, 'babel_fish_trigger.message'),

                        'babel_fish_haiku' => Arr::get($response, 'babel_fish_haiku'),

                        'orbital_cycles' => Arr::get($response, 'orbital_cycles'),

                        'collaboration_flow' => Arr::get($response, 'collaboration_flow'),

                        'constellation_phase' => Arr::get($response, 'constellation_phase'),

                    ];
                }
            );

            if (! \is_array($response)) {
                Cache::driver('redis')->forget("user:{$user->username}:astral_map");

                return null;
            }

            return $response;
        } catch (\Throwable $th) {
            return null;
        }
    }

    /**
     * @param  Repo[]  $repos
     * @param  Commit[]  $commits
     * @return array{babel_fish_haiku: mixed, babel_input_hash: mixed, babel_input_message: mixed|null}
     */
    public function generateBabelFish(User $user, array $repos, array $commits): ?array
    {
        try {
            $context = $this->buildContext($user, $repos, $commits);

            $randomCommit = ! empty($commits) ? Arr::random($commits) : null;

            $context['babel_fish_trigger'] = [
                'sha' => $randomCommit?->sha ?? '',
                'message' => $randomCommit?->message ?? '',
            ];

            $response = Cache::driver('redis')->remember(
                key: "user:{$user->username}:babel_fish",
                ttl: now()->addSeconds(5),
                callback: function () use ($context) {
                    $response = (new BabelFishGeneratorAgent)->prompt('Analise o contexto fornecido, focando na mensagem de commit em `babel_fish_trigger`, e gere um haiku sarcástico correspondente: '.json_encode($context));

                    return [

                        'babel_input_hash' => Arr::get($context, 'babel_fish_trigger.sha'),

                        'babel_input_message' => Arr::get($context, 'babel_fish_trigger.message'),

                        'babel_fish_haiku' => Arr::get($response, 'babel_fish_haiku'),

                    ];
                }
            );

            if (! \is_array($response)) {
                Cache::driver('redis')->forget("user:{$user->username}:babel_fish");

                return null;
            }

            return $response;
        } catch (\Throwable $th) {
            return null;
        }
    }
}
