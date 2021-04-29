<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Bloodgroup::create([
            'title' => "A+"
        ]);
        \App\Models\Bloodgroup::create([
            'title' => "A-"
        ]);
        \App\Models\Bloodgroup::create([
            'title' => "B+"
        ]);
        \App\Models\Bloodgroup::create([
            'title' => "B-"
        ]);
        \App\Models\Bloodgroup::create([
            'title' => "AB+"
        ]);
        \App\Models\Bloodgroup::create([
            'title' => "AB-"
        ]);
        \App\Models\Bloodgroup::create([
            'title' => "O+"
        ]);
        \App\Models\Bloodgroup::create([
            'title' => "O-"
        ]);
        \App\Models\User::create([
            'lastname' => 'John',
            'firstname' => 'Doe',
            'email' => 'john.doe@gmail.com',
            'password' => Hash::make('password'),
            'type' => 1,
            'bloodgroup_id' => 1
        ]);
    }
}
