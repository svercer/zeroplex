<?php

namespace App\Http\Controllers;

use App\Models\Enums\Role;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            if (request()->user()->hasRole(Role::ADMIN->value)) {

                $tasks_count = Task::all()->count();
            } else {
                $tasks_count = Auth::user()->tasks()->count();
            }
        } catch (\Throwable $tr) {
            throw $tr;
        }
        return Inertia::render("Dashboard", ['tasks_count' => $tasks_count]);

    }
}
