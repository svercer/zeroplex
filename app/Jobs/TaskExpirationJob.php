<?php

namespace App\Jobs;

use App\Mail\TaskExpirationMail;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class TaskExpirationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, SerializesModels, Queueable;

    public function __construct()
    {
    }

    public function handle(): void
    {
        $expiredTasks = Task::where('due_date', '<' , Carbon::now())->with('user')->get();
        foreach ($expiredTasks as $task) {
            try {

                Mail::to($task->user->email)->sendNow(new TaskExpirationMail($task));
                sleep(5); // not to get to many emails per second
            } catch (\Exception $e) {
                Log::error($e->getMessage());
            }
        }
    }
}
