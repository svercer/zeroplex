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
                'name' => \App\Models\Enums\Status::TODO->value,
            ],
            [
                'name' => \App\Models\Enums\Status::IN_PROGRESS->value,
            ],
            [
                'name' => \App\Models\Enums\Status::COMPLETED->value,
            ],
        ];
        foreach ($statuses as $status) {
            $existingStatus = Status::where('name', $status['name'])->first();
            if (!$existingStatus) {
                Status::create($status);
            }
        }
    }
}
