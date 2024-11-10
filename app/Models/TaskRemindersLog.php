<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskRemindersLog extends Model
{
    protected $fillable = [
        'task_id',
        'send_at',
    ];


    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
