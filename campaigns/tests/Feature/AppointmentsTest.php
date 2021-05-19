<?php

namespace Tests\Feature;

use App\Models\Adress;
use App\Models\Campaign;
use App\Models\File;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AppointmentsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_book_an_appointment() {
        // $this->withExceptionHandling();

        $user = User::factory()->create();
        $this->actingAs($user);

        $campaign = Campaign::create([
            'title' => 'test title',
            'slug' => 'test-title',
            'description' => 'test description',
            'start_date' => '2021-02-01',
            'end_date' => '2021-02-07',
            'start_time' => '08:00',
            'end_time' => '13:00',
            'slot_duration' => 10,
            'adress_id' => Adress::create([
                'label' => 'Example adress',
                'name' => 'example',
                'postcode' => 83000,
                'city' => 'Toulon',
                'street' => '1 rue Example',
                'importance' => 0.7,
                'x' => 100,
                'y' => 100,
            ])->id
        ]);

        $response = $this->postJson(
            route('appointments.store', $campaign->slug),
            [
                'slot' => '2021-02-01 08:50'
            ]
        );
        $response->assertStatus(200);

        $this->assertDatabaseHas('campaign_user', [
            'campaign_id' => $campaign->id,
            'user_id' => $user->id,
            'date' => '2021-02-01 08:50'
        ]);
    }

    /** @test */
    public function user_can_only_delete_his_appointment() {
        // $this->withExceptionHandling();

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $this->actingAs($user2);

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
        $campaign->users()->attach($user1->id, ['date' => '2021-02-01 08:50']);

        $response = $this->deleteJson(
            route('appointments.destroy', [$campaign->slug, $user1->id]),
        );

        $response->assertStatus(403);
        $this->assertDatabaseHas('campaign_user', [
            'campaign_id' => $campaign->id,
            'user_id' => $user1->id
        ]);

        $this->actingAs($user1);
        $response = $this->deleteJson(
            route('appointments.destroy', [$campaign->slug, $user1->id]),
        );
        $response->assertStatus(200);
        $this->assertDatabaseMissing('campaign_user', [
            'campaign_id' => $campaign->id,
            'user_id' => $user1->id
        ]);
    }


    /** @test */
    public function admin_can_delete_any_appointment() {
        // $this->withExceptionHandling();

        $admin = User::factory([
            'type' => 1
        ])->create();
        $this->actingAs($admin);

        $user = User::factory()->create();

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
        $campaign->users()->attach($user->id, ['date' => '2021-02-01 08:50']);

        $response = $this->deleteJson(
            route('appointments.destroy', [$campaign->slug, $user->id]),
        );

        $response->assertStatus(200);
        $this->assertDatabaseMissing('campaign_user', [
            'campaign_id' => $campaign->id,
            'user_id' => $user->id
        ]);
    }
}
