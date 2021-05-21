<?php

namespace Tests\Feature;

use App\Models\Adress;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase, WithFaker;
   
    /** @test */
    public function a_user_can_update_only_his_adress()
    {
        $this->withExceptionHandling();

        $user = User::factory()->create();
        $this->actingAs($user);

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

        $response = $this->patchJson(route('users.update.adress', $user->id), $adress);

        $response->assertStatus(200);
        $this->assertDatabaseHas('adresses', $adress);
        $user->refresh();
        $this->assertEquals(1, $user->adress->id);

        $user2 = User::factory()->create();
        $response = $this->patchJson(route('users.update.adress', $user2->id), $adress);

        $response->assertStatus(403);
        $user2->refresh();
        $this->assertNull($user2->adress);
    }

    /** @test */
    public function an_admin_can_update_anu_user_adress()
    {
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

        $response = $this->patchJson(route('users.update.adress', $user->id), $adress);

        $response->assertStatus(200);
        $this->assertDatabaseHas('adresses', $adress);
        $user->refresh();
        $this->assertEquals(1, $user->adress->id);
    }
}
