<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ServiceProviderController;
use App\Http\Controllers\AdminController;

// Public routes
Route::prefix('auth')->group(function () {
    // Client auth routes
    Route::prefix('client')->group(function () {
        Route::post('/login', [AuthController::class, 'clientLogin']);
        Route::post('/register', [AuthController::class, 'clientRegister']);
    });

    // Provider auth routes
    Route::prefix('provider')->group(function () {
        Route::post('/login', [AuthController::class, 'providerLogin']);
        Route::post('/register', [AuthController::class, 'providerRegister']);
    });
});

// Protected routes with Sanctum
Route::middleware(['auth:sanctum'])->group(function () {
    // User routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Client routes
    Route::prefix('client')->middleware(['role:client'])->group(function () {
        Route::get('/profile', [ClientController::class, 'profile']);
        Route::put('/profile', [ClientController::class, 'updateProfile']);
        Route::get('/bookings', [ClientController::class, 'bookings']);
        Route::post('/bookings', [ClientController::class, 'createBooking']);
    });

    // Service Provider routes
    Route::prefix('provider')->middleware(['role:provider'])->group(function () {
        Route::get('/profile', [ServiceProviderController::class, 'profile']);
        Route::put('/profile', [ServiceProviderController::class, 'updateProfile']);
        Route::get('/services', [ServiceProviderController::class, 'services']);
        Route::post('/services', [ServiceProviderController::class, 'createService']);
        Route::get('/bookings', [ServiceProviderController::class, 'bookings']);
    });

    // Admin routes
    Route::prefix('admin')->middleware(['role:admin'])->group(function () {
        Route::get('/users', [AdminController::class, 'users']);
        Route::get('/providers', [AdminController::class, 'providers']);
        Route::get('/bookings', [AdminController::class, 'bookings']);
        Route::put('/users/{id}/status', [AdminController::class, 'updateUserStatus']);
    });
}); 