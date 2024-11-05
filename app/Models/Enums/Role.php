<?php

namespace App\Models\Enums;

enum Role: string
{
    case ADMIN = 'admin';
    case USER = 'user';
}
