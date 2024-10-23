<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

// Authentication route
Route::post('/login', [AuthController::class, 'login']);

// Example of defining an API route
Route::resource('products', ProductController::class);

// Example of a web route
Route::get('/', function () {
    return view('welcome');
});
