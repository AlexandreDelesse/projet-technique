<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Rules\CurrentPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PasswordController extends Controller
{
    public function update(User $user) {
        if (auth()->user()->isAdmin() || auth()->id() == $user->id) {
            $data = request()->validate([
                'current_password' => ['required', new CurrentPassword],
                'password' => 'required|string|min:8|confirmed'
            ]);
    
            $user->update([
                'password' => Hash::make($data['password'])
            ]);
    
            return $user;        
        }
        abort(403);
    }
}
