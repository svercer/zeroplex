<?php

namespace App\Models\Enums;

enum Status: string
{
    case TODO = 'Todo';
    case IN_PROGRESS = "In progress";
    case COMPLETED = "Completed";
}
