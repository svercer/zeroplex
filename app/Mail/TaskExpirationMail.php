<?php

namespace App\Mail;

use App\Models\Task;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Queueable;

class TaskExpirationMail extends Mailable implements ShouldQueue
{
    use  SerializesModels, Queueable;

    public Task $task;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function build(): self
    {
        return $this->markdown('emails.task-expiration', [
            'task' => $this->task
        ]);
    }
}
