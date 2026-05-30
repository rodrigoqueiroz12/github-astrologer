<?php

namespace App\DTOs\Github;

use Illuminate\Support\Carbon;

final class Commit
{
    public function __construct(
        public readonly string $repo,
        public readonly string $sha,
        public readonly Carbon $date,
        public readonly string $message
    ) {
        //
    }

    public function toArray(): array
    {
        return [
            'repo' => $this->repo,
            'sha' => $this->sha,
            'date' => $this->date->toIso8601String(),
            'message' => $this->message,
        ];
    }
}
