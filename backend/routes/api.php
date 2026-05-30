<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('test', fn () => response()->json(['status' => 'ok']));
});
