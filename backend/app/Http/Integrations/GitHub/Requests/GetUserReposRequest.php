<?php

namespace App\Http\Integrations\GitHub\Requests;

use App\DTOs\Github\Repo;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Saloon\CachePlugin\Contracts\Cacheable;
use Saloon\CachePlugin\Contracts\Driver;
use Saloon\CachePlugin\Drivers\LaravelCacheDriver;
use Saloon\CachePlugin\Traits\HasCaching;
use Saloon\Enums\Method;
use Saloon\Http\PendingRequest;
use Saloon\Http\Request;
use Saloon\Http\Response;

class GetUserReposRequest extends Request implements Cacheable
{
    use HasCaching;

    /**
     * The HTTP method of the request
     */
    protected Method $method = Method::GET;

    public function __construct(protected readonly string $username) {
        //
    }

    public function resolveCacheDriver(): Driver
    {
        return new LaravelCacheDriver(Cache::store('redis'));
    }
    
    public function cacheExpiryInSeconds(): int
    {
        return 3600;
    }

    protected function cacheKey(PendingRequest $pendingRequest): string
    {
        return "users:{$this->username}:repos";
    }

    /** @return Repo[] */
    public function createDtoFromResponse(Response $response): array
    {
        $data = $response->json();
    
        return collect($data)->map(fn (array $repo) => new Repo(
            name: Arr::get($repo, 'name'),
            language: Arr::get($repo, 'language'),
        ))->all();
    }

    public function defaultQuery(): array
    {
        return [
            'per_page' => 5,
            'sort' => 'pushed',
            'direction' => 'desc',
        ];
    }

    /**
     * The endpoint for the request
     */
    public function resolveEndpoint(): string
    {
        return "/users/{$this->username}/repos";
    }
}
