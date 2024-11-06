<?php

namespace App\Console\Commands;

use App\Jobs\TaskExpirationJob;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Console\Command;

class TaskExpirationCommand extends Command
{
    protected $signature = 'task:expiration';

    protected $description = 'Command description';

    public function handle(): void
    {
//        (new TaskExpirationJob)->handle();
        $this->info('Job executed');
        TaskExpirationJob::dispatch()->onQueue('tasks');
        $this->info('Job done');
    }
}
