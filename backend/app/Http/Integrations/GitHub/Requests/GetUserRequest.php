<?php

namespace App\Http\Integrations\GitHub\Requests;

use App\DTOs\Github\User;
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

class GetUserRequest extends Request implements Cacheable
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
        return 3600; // one hour
    }

    protected function cacheKey(PendingRequest $pendingRequest): string
    {
        return "users:{$this->username}";
    }

    public function createDtoFromResponse(Response $response): mixed
    {
        $data = $response->json();
    
        return new User(
            username: Arr::get($data, 'login'),
            avatar_url: Arr::get($data, 'avatar_url'),
        );
    }

    /**
     * The endpoint for the request
     */
    public function resolveEndpoint(): string
    {
        return "/users/{$this->username}";
    }
}
