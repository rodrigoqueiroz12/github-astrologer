<?php

// Teste simples pra ver se a home carrega
test('the application returns a successful response', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});
