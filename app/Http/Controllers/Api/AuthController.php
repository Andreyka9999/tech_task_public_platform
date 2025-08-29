<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {

    /*
     * Basic auth controller using Laravel Sanctum tokens.
     * Idea: validate input, never trust raw password, return a token the frontend can store.
     */
    
    public function register(Request $request) {
        // Keep inputs clean — short rules but cover the basics (length, email format, unique).
        // 'confirmed' means we expect password_confirmation in the payload.
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'email' => ['required','email','max:255','unique:users,email'],
            'password' => ['required','string','min:8','confirmed'],
        ]);

        // Never store plain passwords. Hash::make() uses bcrypt by default.
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // One token per session/device is enough here. Name 'api' is arbitrary.
        $token = $user->createToken('api')->plainTextToken;

        // Return only the fields the UI actually needs; avoid dumping everything.
        return response()->json([
            'user' => $user->only(['id','name','email']),
            'token' => $token,
        ], 201);
    }

    public function login(Request $request) {
        // Minimal checks to avoid weird states and noisy errors
        $data = $request->validate([
            'email' => ['required','email'],
            'password' => ['required','string'],
        ]);

        // Look up by email first. Keep the error generic so we don’t leak which field failed.
        $user = User::where('email', $data['email'])->first();

        // Hash::check compares the provided password with the stored hash.
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 422);
        }

        // New token for this session. Frontend should send it as Bearer <token>.
        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'user' => $user->only(['id','name','email']),
            'token' => $token,
        ]);
    }

    public function logout(Request $request) {
         // Simple approach: drop ALL tokens for this user (log out from everywhere).
        // If you want "logout only this device", use: $request->user()->currentAccessToken()->delete();

        $request->user()->tokens()->delete();

        // 204 = no content.
        return response()->noContent();
    }
}
