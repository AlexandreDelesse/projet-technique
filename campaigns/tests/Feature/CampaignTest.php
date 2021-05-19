<?php

namespace Tests\Feature\Feature;

use App\Models\Campaign;
use App\Models\File;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CampaignTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function only_admin_can_create_campaign() {
        $this->withExceptionHandling();

        $admin = User::factory([
            'type' => 1
        ])->create();
        $user = User::factory()->create();

        $this->actingAs($admin);
        $adress = [
            'label' => 'Example adress',
            'name' => 'example',
            'postcode' => 83000,
            'city' => 'Toulon',
            'street' => '1 rue Example',
            'importance' => 0.7,
            'x' => 100,
            'y' => 100,
        ];
        $file = File::create([
            'path' => 'test path'
        ]);
        $campaign = [
            'title' => 'test title',
            'description' => 'test description',
            'adress' => $adress,
            'start_date' => '2021-02-01',
            'end_date' => '2021-02-07',
            'start_time' => '08:00',
            'end_time' => '13:00',
            'slot_duration' => 10,
            'file_id' => $file->id
        ];

        $response = $this->postJson(
            route('campaigns.store'),
            $campaign
        );
        $response->assertStatus(201);

        $this->actingAs($user);

        $response = $this->postJson(
            route('campaigns.store'),
            $campaign
        );

        $response->assertStatus(403);
    }

    /** @test */
    public function only_admin_can_delete_campaign() {
        // $this->withExceptionHandling();

        $admin = User::factory([
            'type' => 1
        ])->create();
        $user = User::factory()->create();

        $this->actingAs($admin);

        $campaign = Campaign::create([
            'title' => 'test title',
            'slug' => 'test-title',
            'description' => 'test description',
            'start_date' => '2021-02-01',
            'end_date' => '2021-02-07',
            'start_time' => '08:00',
            'end_time' => '13:00',
            'slot_duration' => 10,
        ]);

        $response = $this->deleteJson(
            route('campaigns.destroy', $campaign->slug),
        );

        $response->assertStatus(200);
        $this->assertDatabaseMissing('campaigns', $campaign->toArray());

        $campaign = Campaign::create([
            'title' => 'test title',
            'slug' => 'test-title',
            'description' => 'test description',
            'start_date' => '2021-02-01',
            'end_date' => '2021-02-07',
            'start_time' => '08:00',
            'end_time' => '13:00',
            'slot_duration' => 10,
        ]);
        $this->actingAs($user);

        $response = $this->deleteJson(
            route('campaigns.destroy', $campaign->slug),
        );

        $response->assertStatus(403);
        $this->assertDatabaseHas('campaigns', $campaign->getAttributes());
    }
}
