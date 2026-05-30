<?php

namespace App\DTOs\Github;

class User
{
    public function __construct(
        public readonly string $username,
        public readonly string $avatarUrl,
        public readonly string $followers,
        public readonly string $publicRepos,
        public readonly string $createdAt,
    ) {}

    public function toArray(): array
    {
        return [
            'username' => $this->username,
            'avatar_url' => $this->avatarUrl,
            'followers' => $this->followers,
            'public_repos' => $this->publicRepos,
            'created_at' => $this->createdAt,
        ];
    }
}
