<?php

namespace Tests\Feature;

use App\Http\Helpers\Kong;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    
    /** @test */
    public function authentified_user_cannot_register() 
    {
        $this->withoutExceptionHandling();

        $user = User::factory()->create();

        $response = $this->postJson(route('register'), 
                [
                    'email' => $user->email,
                    'firstname' => $user->firstname,
                    'lastname' => $user->lastname,
                    'password' => 'password'
                ], 
                [
                    'apiKey' => Str::random(),
                ]
            );

        $response->assertStatus(400);
    }

    /** @test */
    public function a_guest_can_register() 
    {
        $this->withoutExceptionHandling();

        $user = User::factory([
            'id' => 9999999 
        ])->make(); 

        $response = $this->postJson(
            route('register'), 
            [
                'email' => $user->email,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
                'password' => 'password',
                'password_confirmation' => 'password'
            ]
        );

        $response->assertStatus(201);
        
        Kong::deleteConsumer($user->email);
    }
}
