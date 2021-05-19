<?php

namespace Database\Factories;

use App\Models\Campaign;
use Illuminate\Support\Str;
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
        $date = $this->faker->date;
        return [
            'title' =>$title,
            'slug' => Str::slug($title),
            'description' => $this->faker->text,
            'slot_duration' => $this->faker->numberBetween(0, 60),
            'start_date' => $date,
            'end_date' => $date,
            'start_time' => '08:00',
            'end_time' => '17:00',
        ];
    }
}
