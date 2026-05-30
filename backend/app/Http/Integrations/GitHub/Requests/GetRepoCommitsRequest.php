<?php

namespace App\Http\Integrations\GitHub\Requests;

use App\DTOs\Github\Commit;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Saloon\CachePlugin\Contracts\Cacheable;
use Saloon\CachePlugin\Contracts\Driver;
use Saloon\CachePlugin\Drivers\LaravelCacheDriver;
use Saloon\CachePlugin\Traits\HasCaching;
use Saloon\Enums\Method;
use Saloon\Http\PendingRequest;
use Saloon\Http\Request;
use Saloon\Http\Response;

class GetRepoCommitsRequest extends Request implements Cacheable
{
    use HasCaching;

    /**
     * The HTTP method of the request
     */
    protected Method $method = Method::GET;

    public function __construct(protected readonly string $owner, protected readonly string $repo)
    {
        //
    }

    public function resolveCacheDriver(): Driver
    {
        return new LaravelCacheDriver($this->resolveCacheStore());
    }

    private function resolveCacheStore()
    {
        if (! class_exists(\Redis::class)) {
            return Cache::store('file');
        }

        return Cache::store('redis');
    }

    public function cacheExpiryInSeconds(): int
    {
        return 3600;
    }

    protected function cacheKey(PendingRequest $pendingRequest): string
    {
        return "users:{$this->owner}:repos:{$this->repo}:commits";
    }

    public function createDtoFromResponse(Response $response): array
    {
        $data = $response->json();

        return collect($data)->map(fn (array $commit) => new Commit(
            repo: $this->repo,
            sha: Arr::get($commit, 'sha'),
            date: Carbon::parse(Arr::get($commit, 'commit.author.date')),
            message: Arr::get($commit, 'commit.message')
        ))->all();
    }

    public function defaultQuery(): array
    {
        return [
            'committer' => $this->owner,
            'per_page' => 20,
        ];
    }

    /**
     * The endpoint for the request
     */
    public function resolveEndpoint(): string
    {
        return "/repos/{$this->owner}/{$this->repo}/commits";
    }
}
