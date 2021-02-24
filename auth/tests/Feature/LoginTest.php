<?php

namespace Tests\Feature;

use App\Http\Helpers\Kong;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function authentified_user_cannot_login() 
    {
        $this->withoutExceptionHandling();

        $user = User::factory()->create();

        $response = $this->postJson(route('login'), 
                [
                    'email' => $user->email,
                    'password' => 'password'
                ], 
                [
                    'apiKey' => Str::random(),
                ]
            );

        $response->assertStatus(400);
    }

    /** @test */
    public function a_guest_can_login() 
    {
        $this->withoutExceptionHandling();

        $user = User::factory([
            'id' => 9999999
        ])->create();

        $response = $this->postJson(
            route('login'), 
            [
                'email' => $user->email,
                'password' => 'password'
            ]
        );

        $response->assertStatus(201);
        
        Kong::deleteConsumer($user->email);
    }
}
