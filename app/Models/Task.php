<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public mixed $user_id;
    protected $fillable = [
      'title',
      'description',
      'due_date',
      'status',
      'user_id'
    ];
}
