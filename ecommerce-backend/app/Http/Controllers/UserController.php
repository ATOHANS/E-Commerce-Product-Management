<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request) 
    {
        $validatedata = $request->validate([
            'name' => 'required|string|max:255',
            'contactNo' => 'required|string|max:15', 
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8', 
            'role' => 'required|string|in:admin,user', 
        ]);
        $user = User::create([
            'name' => $validatedata['name'],
            'contactNo' => $validatedata['contactNo'],
            'email' => $validatedata['email'],
            'password' => Hash::make($validatedata['password']), 
            'role' => $validatedata['role'],
        ]);

       
        return response()->json([
            'message' => 'User created successfully!',
            'user' => $user,
        ], 201); 
    }

    public function get($id) {

        $users = User::find($id);

        return response()->json($users);
    }
}
