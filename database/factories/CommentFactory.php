<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        $tasks = Task::all()->pluck('id');

        return [
            'text' => $this->faker->text('64'),
            'user_id' => $this->faker->numberBetween(1,9),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'task_id' => $tasks->random(),
        ];
    }
}
