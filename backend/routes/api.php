<?php

use App\Http\Controllers\AstrologyController;
use Illuminate\Support\Facades\Route;

Route::post('astrology/analyze', [AstrologyController::class, 'analyze']);
