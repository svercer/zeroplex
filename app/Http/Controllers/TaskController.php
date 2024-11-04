<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', [Task::class, request()->user()]);
        return Inertia::render('Task/Index');
    }

    public function create()
    {
        return Inertia::render('Task/Create');
    }

    public function store(Request $request)
    {
        //        store
    }

    public function show($id)
    {
        return Inertia::render('Task/View');
    }

    public function edit(Task $task)
    {
        return Inertia::render('Task/Edit', ['task' => $task]);
    }

    public function update(Request $request, Task $task)
    {
        dd($task);
//        update
    }

    public function destroy($id)
    {
        return Task::delete($id);
    }
}
