<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AddCommentNotification extends Notification implements ShouldQueue
{
    use Queueable;
    private Task $task;

    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function viaQueues(): array
    {
        return [
            'mail' => 'mail-queue',
        ];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->line("Comment has been added to your Task: {$this->task->title}.")
            ->action('View Comment', url(route('tasks.show', ['task' => $this->task->id])))
            ->line('Thank you for using our application!');
    }

    public function toArray($notifiable): array
    {
        return [];
    }
}
