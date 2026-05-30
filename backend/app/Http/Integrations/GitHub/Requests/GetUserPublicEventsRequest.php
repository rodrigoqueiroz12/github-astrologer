<?php

namespace App\Http\Integrations\GitHub\Requests;

use App\DTOs\Github\PublicEvent;
use Illuminate\Support\Facades\Cache;
use Saloon\CachePlugin\Contracts\Cacheable;
use Saloon\CachePlugin\Contracts\Driver;
use Saloon\CachePlugin\Drivers\LaravelCacheDriver;
use Saloon\CachePlugin\Traits\HasCaching;
use Saloon\Enums\Method;
use Saloon\Http\PendingRequest;
use Saloon\Http\Request;
use Saloon\Http\Response;

class GetUserPublicEventsRequest extends Request implements Cacheable
{
    use HasCaching;
    
    /**
     * The HTTP method of the request
     */
    protected Method $method = Method::GET;

    public function __construct(
        protected readonly string $username,
        protected readonly int $perPage = 30,
        protected readonly int $page = 2,
    ) {
        //
    }

    public function resolveCacheDriver(): Driver
    {
        return new LaravelCacheDriver(Cache::store('redis'));
    }
    
    public function cacheExpiryInSeconds(): int
    {
        return 1800; // thirty minutes
    }

    protected function cacheKey(PendingRequest $pendingRequest): string
    {
        return "users:{$this->username}:public-events";
    }

    protected function defaultQuery(): array
    {
        return [
            'per_page' => $this->perPage,
            'page' => $this->page,
        ];
    }

    /**
     * The endpoint for the request
     */
    public function resolveEndpoint(): string
    {
        return "/users/{$this->username}/events/public";
    }
}
