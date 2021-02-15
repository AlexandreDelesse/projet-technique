<?php

namespace Tests\Unit;

use App\Models\Campaign;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CampaignTest extends TestCase
{
    use RefreshDatabase;
    
    /** @test */
    public function it_has_a_path() {
        $campaign = Campaign::factory()->create();
        $this->assertEquals('/campaigns/' . $campaign->slug, $campaign->path());
    }
}