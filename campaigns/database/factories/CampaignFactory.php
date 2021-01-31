<?php

namespace Database\Factories;

use App\Models\Campaign;
use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Campaign::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence;
        return [
            'title' =>$title,
            'slug' => \Str::slug($title),
            'description' => $this->faker->text,
            'location' => $this->faker->numberBetween(1, 99),
            'capacity' => $this->faker->randomDigit
        ];
    }
}
