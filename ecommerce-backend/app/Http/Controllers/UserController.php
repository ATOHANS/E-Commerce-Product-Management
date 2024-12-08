<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'contactNo' => 'required|string|max:15',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:5',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Set default role to 'user' if not provided
        $role = $request->role ?? 'user';

        $user = User::create([
            'name' => $request->name,
            'contactNo' => $request->contactNo,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $role,
        ]);

        return response()->json([
            'message' => 'Registration successful!',
            'user' => $user,
        ], 201);
    }

    // Login
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'message' => 'Login successful!',
                'user' => $user,
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Logout the authenticated user
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logout successful!']);
    }

    // Store a new user (Admin functionality)
    public function store(Request $request)
    {
        $validatedata = $request->validate([
            'name' => 'required|string|max:255',
            'contactNo' => 'required|string|max:15',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:5',
            'role' => 'sometimes|string|in:admin,user',
        ]);

        // Set default role to 'user' if not provided
        $role = $validatedata['role'] ?? 'user';

        $user = User::create([
            'name' => $validatedata['name'],
            'contactNo' => $validatedata['contactNo'],
            'email' => $validatedata['email'],
            'password' => Hash::make($validatedata['password']),
            'role' => $role,
        ]);

        return response()->json([
            'message' => 'User created successfully!',
            'user' => $user,
        ], 201);
    }

    // Get user details by ID
    public function get($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }
}
