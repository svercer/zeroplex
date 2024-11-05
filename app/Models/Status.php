<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Status extends Model
{
    protected $fillable = [
      'name',
      'value'
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
