<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $tasks = request()->user()->tasks()->get();
        return Inertia::render("Dashboard", ['tasks' => $tasks]);

    }
}
