<?php

namespace Tests\Feature\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CampaignTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_create_campaign() {
        $this->withExceptionHandling();

        $admin = User::factory([
            'type' => 1
        ])->create();

        $response = $this->post(
            route('campaigns.store'),
            [
                'title' => 'test title',
                'description' => 'test description',
                'location' => 'Toulon',
                'start_at' => '2021-02-01 20:23:00',
                'end_at' => '2021-02-07 20:23:00',
                'capacity' => 100
            ], 
            [
                'X-Consumer-Username' => $admin->email
            ]
        );

        $response->assertStatus(201);
    }

    /** @test */
    public function usera_cannot_create_campaign() {
        // Todo
    }
}
