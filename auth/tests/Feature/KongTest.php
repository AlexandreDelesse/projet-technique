<?php

namespace Tests\Feature;

use App\Http\Helpers\Kong;
use Exception;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class KongTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_should_retreive_consumers()
    {
        $response = Kong::consumers();
    
        $this->assertEquals(200, $response->status());
    }

    /** @test */
    public function it_can_add_consumer()
    {
        $this->withoutExceptionHandling();

        $username = Str::random(8); // Make sure that username does not exist
        $custom_id = Str::random(8);

        $response = Kong::createConsumer($username, $custom_id);

        $this->assertEquals(201, $response->status());

        $response = Kong::consumerExists($username);

        $this->assertEquals(200, $response->status());

        Kong::deleteConsumer($username);
    }

    /** @test */
    public function it_can_generate_keys()
    {
        $this->withoutExceptionHandling();

        $username = Str::random(8); // Make sure that username does not exist
        $custom_id = Str::random(8);

        Kong::createConsumer($username, $custom_id);

        $response = Kong::generatekey($username);

        $this->assertEquals(201, $response->status());

        Kong::deleteConsumer($username);

        // Generate key for inexistant consumer, should throw exception
        $username = Str::random();
        try {
            $response = Kong::generatekey($username);
        } catch(Exception $e) {
            echo $e->getMessage();
            $this->assertEquals('Can\'t generate key for consumer ' . $username . '.', $e->getMessage());
        }

        Kong::deleteConsumer($username);
    }

    /** @test */
    public function it_should_delete_consumer() {
        $this->withoutExceptionHandling();

        $username = Str::random(8); // Make sure that username does not exist
        $custom_id = Str::random(8);

        Kong::createConsumer($username, $custom_id);

        $response = Kong::deleteConsumer($username);

        $this->assertEquals(204, $response->status());

        $response = Kong::consumerExists($username);

        $this->assertFalse($response);

    }
}
