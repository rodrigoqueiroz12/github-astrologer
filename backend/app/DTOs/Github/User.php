<?php

namespace App\DTOs\Github;

class User {
    public function __construct(
        public readonly string $username,
        public readonly string $avatar_url,
    ) {}

    public function toArray(): array
    {
        return [
            'username' => $this->username,
            'avatar_url' => $this->avatar_url,
        ];
    }
}