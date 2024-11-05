<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = [
            [
                'name' => \App\Enums\Status::TODO->value,
            ],
            [
                'name' => \App\Enums\Status::IN_PROGRESS->value,
            ],
            [
                'name' => \App\Enums\Status::COMPLETED->value,
            ],
        ];
        foreach ($statuses as $status) {
            Status::create($status);
        }
    }
}
