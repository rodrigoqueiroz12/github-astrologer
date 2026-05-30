<?php

namespace App\Http\Controllers;

use App\DTOs\Github\User;
use App\Http\Integrations\GitHub\GitHubConnector;
use App\Http\Integrations\GitHub\Requests\GetRepoCommitsRequest;
use App\Http\Integrations\GitHub\Requests\GetUserReposRequest;
use App\Http\Integrations\GitHub\Requests\GetUserRequest;
use App\Http\Requests\AnalyseRequest;
use Saloon\Http\Response;

class AstrologyController extends Controller
{
    public function __construct(public readonly GitHubConnector $connector)
    {
        //
    }

    public function analyse(AnalyseRequest $request)
    {
        $username = $request->validated('username');

        $user = null;
        $repos = [];

        $pool = $this->connector->pool(
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

        $commitsRequests = function () use ($username, $repos) {
            foreach ($repos as $repo) {
                yield new GetRepoCommitsRequest($username, $repo->name);
            }
        };

        $commits = [];

        $commitsPool = $this->connector->pool(
            requests: $commitsRequests,
            responseHandler: function (Response $response) use (&$commits) {
                $commits = [...$commits, ...$response->json()];
            }
        );

        $commitsPromise = $commitsPool->send();

        $commitsPromise->wait();

        return response()->json([
            'github_info' => $user->toArray(),
            'repos' => $repos,
            'commits' => $commits,
        ]);
    }
}
