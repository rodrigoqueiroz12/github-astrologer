<?php

test('rota POST /api/astrology/analyze retorna 422 sem username', function () {
    $response = $this->postJson('/api/astrology/analyze', []);

    $response->assertStatus(422);
    $response->assertJsonValidationErrorFor('username');
});

test('rota GET /api/astrology/analyze retorna 405 (metodo nao permitido)', function () {
    $response = $this->getJson('/api/astrology/analyze');

    $response->assertStatus(405);
});
