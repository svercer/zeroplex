<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\CreateRequest;
use App\Http\Requests\Task\UpdateRequest;
use App\Models\Enums\Role;
use App\Models\Status;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        if (request()->user()->hasRole(Role::ADMIN->value)) {
            $tasks = Task::with('user', 'status')->get();
        } else {
            $tasks = request()->user()->tasks()->with('status')->get();
        }

        return Inertia::render('Task/Index', ['tasks' => $tasks]);
    }

    public function create()
    {
        return Inertia::render('Task/Create');
    }

    public function store(CreateRequest $request)
    {
        $req = [
            ...$request->all(),
            ...['user_id' => Auth::user()->id, 'status_id' => 1]
        ];

        try {
            Task::create($req);
        } catch (\Throwable $tr) {
            throw $tr;
        }
        return to_route('tasks.create');
    }

    public function show(Task $task)
    {
        $task->load(['status', 'comments', 'comments.user','user']);
        return Inertia::render('Task/View', ['task' => $task]);
    }

    public function edit(Task $task)
    {
        Gate::authorize('update', $task);
        return Inertia::render('Task/Edit', ['task' => $task, 'statuses' => Status::all()]);
    }

    public function update(UpdateRequest $request, Task $task)
    {
        Gate::authorize('update', $task);
        try {
            $task->update($request->all());
        } catch (\Throwable $tr) {
            throw $tr;
        }
        return redirect()->back()->with(['message' => __('task.updated')]);
    }

    public function destroy(Task $task)
    {
        Gate::authorize('update', $task);
        try {
            $task->delete();
        } catch (\Throwable $tr) {
            throw $tr;
        }
        return redirect()->back()->with(['message' => 'Deleted']);
    }
}
