<?php

namespace App\DTOs\Github;

final class Repo
{
    public function __construct(
        public readonly string $name,
        public readonly ?string $language,
    ) {
        //
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'language' => $this->language,
        ];
    }
}
