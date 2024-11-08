<?php

namespace Database\Factories;

use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->text('64'),
            'description' => $this->faker->text('1000'),
            'due_date' => Carbon::now(),
            'created_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'updated_at' => Carbon::now(),
            'status_id' => $this->faker->numberBetween(1, 3),
            'user_id' => User::factory(),
        ];
    }
}
