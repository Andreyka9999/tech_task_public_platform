<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;


/*
  API routes only (no Blade views here).
  We use prefix /api/v1 → makes it easier to version the API later.
  Auth is handled via Laravel Sanctum middleware.
*/


Route::prefix('v1')->group(function () {
    // Public endpoints. No token needed
    // Public endpoints
    Route::post('auth/register', [AuthController::class, 'register']);  // basic signup
    Route::post('auth/login', [AuthController::class, 'login']);        // login returns token

    // Public read-only endpoints
    Route::get('categories', [CategoryController::class, 'index']);     // get list of categories
    Route::get('posts', [PostController::class, 'index']);              // posts feed with filters
    Route::get('posts/{post}', [PostController::class, 'show']);        // single post with comments

    // Protected endpoints (need valid Sanctum token)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('auth/logout', [AuthController::class, 'logout']);  // invalidate current token

        // CRUD for posts (only author can update/delete: checked via PostPolicy)
        Route::post('posts', [PostController::class, 'store']);
        Route::put('posts/{post}', [PostController::class, 'update']);
        Route::delete('posts/{post}', [PostController::class, 'destroy']);

        // Comments (only logged-in users can create, only owner can delete)
        Route::post('posts/{post}/comments', [CommentController::class, 'store']);
        Route::delete('comments/{comment}', [CommentController::class, 'destroy']);
    });
});
