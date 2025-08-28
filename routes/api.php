<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;

Route::prefix('v1')->group(function () {
    // Public endpoints
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/login', [AuthController::class, 'login']);

    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('posts', [PostController::class, 'index']);
    Route::get('posts/{post}', [PostController::class, 'show']);

    // Under the protection of sanctum
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('auth/logout', [AuthController::class, 'logout']);

        Route::post('posts', [PostController::class, 'store']);
        Route::put('posts/{post}', [PostController::class, 'update']);
        Route::delete('posts/{post}', [PostController::class, 'destroy']);

        Route::post('posts/{post}/comments', [CommentController::class, 'store']);
        Route::delete('comments/{comment}', [CommentController::class, 'destroy']);
    });
});
