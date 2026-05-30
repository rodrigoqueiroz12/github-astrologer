<?php

namespace App\Http\Controllers;

use App\Http\Integrations\GitHub\GitHubConnector;
use App\Http\Requests\AnalyseRequest;
use App\Services\AstrologyService;

class AstrologyController extends Controller
{
    public function __construct(
        public readonly GitHubConnector $connector,
        public readonly AstrologyService $astrologyService
    ) {
        //
    }

    public function analyse(AnalyseRequest $request)
    {
        $username = $request->validated('username');

        [$user, $repos] = $this->astrologyService->getUserAndRepos($username);

        $commits = $this->astrologyService->getUserCommits($username, $repos);

        return response()->json([
            'user' => [
                'username' => $user->username,
                'avatar_url' => $user->avatar_url,
                'analysis_date' => now()->format('d/m/Y'),
                'lunar_cycle' => null,
                'cosmic_reach' => null,
            ],

            'solar_sign' => [
                'title' => '',
                'description' => '',
                'tags' => [],
            ],

            'temporal_rhythm' => [
                'sync_rate' => $this->astrologyService->calculateTemporalRhythmSyncRate($commits),
                'chart_data' => $this->astrologyService->calculateTemporalRhythmChartData($commits),
            ],

            'babel_fish' => [
                'input_hash' => '',
                'input_message' => '',
                'haiku' => '',
            ],

            'astrolabe' => [
                'orbital_cycles' => '',
                'zodiac_repos' => \count($repos),
                'collaboration_flow' => '',
                'constellation_phase' => '',
            ],
        ]);
    }
}
