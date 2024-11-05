<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Status extends Model
{
    use HasFactory;
    protected $fillable = [
      'name',
      'value'
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
