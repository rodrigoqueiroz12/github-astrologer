<?php

namespace App\Http\Controllers;

use App\Http\Integrations\GitHub\GitHubConnector;
use App\Http\Requests\AnalyseRequest;
use App\Services\AstrologyService;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class AstrologyController extends Controller
{
    public function __construct(
        public readonly GitHubConnector $connector,
        public readonly AstrologyService $astrologyService
    ) {
        //
    }

    public function analyze(AnalyseRequest $request)
    {
        try {
            $username = $request->validated('username');

            [$user, $repos] = $this->astrologyService->getUserAndRepos($username);

            if (! $user) {
                return response()->json([
                    'message' => 'GitHub user not found.',
                ], 404);
            }

            $commits = $this->astrologyService->getUserCommits($username, $repos);

            $map = $this->astrologyService->generateAstralMap($user, $repos, $commits);

            return response()->json([
                'user' => [
                    'username' => $user->username,
                    'avatar_url' => $user->avatarUrl,
                    'analysis_date' => now()->format('d/m/Y'),
                    'lunar_cycle' => Arr::get($map, 'lunar_cycle'),
                    'cosmic_reach' => Arr::get($map, 'cosmic_reach'),
                ],

                'solar_sign' => [
                    'title' => Arr::get($map, 'solar_sign_title'),
                    'description' => Arr::get($map, 'solar_sign_description'),
                    'tags' => Arr::get($map, 'solar_sign_tags'),
                ],

                'ascendant' => [
                    'name' => Arr::get($map, 'ascendant_name'),
                    'status' => Arr::get($map, 'ascendant_status'),
                    'title' => Arr::get($map, 'ascendant_title'),
                    'tags' => Arr::get($map, 'ascendant_tags'),
                    'quote' => Arr::get($map, 'ascendant_quote'),
                ],

                'temporal_rhythm' => [
                    'sync_rate' => $this->astrologyService->calculateTemporalRhythmSyncRate($commits),
                    'chart_data' => $this->astrologyService->calculateTemporalRhythm($commits),
                ],

                'babel_fish' => [
                    'input_hash' => Arr::get($map, 'babel_input_hash'),
                    'input_message' => Arr::get($map, 'babel_input_message'),
                    'haiku' => Arr::get($map, 'babel_fish_haiku'),
                ],

                'astrolabe' => [
                    'orbital_cycles' => Arr::get($map, 'orbital_cycles'),
                    'zodiac_repos' => \count($repos),
                    'collaboration_flow' => Arr::get($map, 'collaboration_flow'),
                    'constellation_phase' => Arr::get($map, 'constellation_phase'),
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('AstrologyController@analyze', [
                'exception' => $e,
            ]);

            return response()->json([
                'message' => 'Server error occurred.',
            ], 500);
        }
    }
}
