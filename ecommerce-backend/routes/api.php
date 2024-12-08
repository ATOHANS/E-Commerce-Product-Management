<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('products', [ProductController::class, 'index']);        
    Route::post('products', [ProductController::class, 'store']);  
    Route::post('addToCart', [ProductController::class, 'addToCart']);     
    Route::get('products/{id}', [ProductController::class, 'show']);    
    Route::put('products/{id}', [ProductController::class, 'update']);  
    Route::delete('products/{id}', [ProductController::class, 'destroy']); 
    Route::post('processOrder', [ProductController::class, 'processOrder']);

Route::post('register', [UserController::class, 'store']);
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


