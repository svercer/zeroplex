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
    public function index(Request $request)
    {
        try {
            if (request()->user()->hasRole(Role::ADMIN->value)) {
                $tasks = Task::with('user', 'status')
                    ->where(function ($query) use ($request) {
                        if ($request->due_date) {
                            $query->where('due_date', $request->due_date);
                        }
                        if ($request->status_id) {
                            $query->where('status_id', $request->status_id);
                        }
                    })
                    ->get();
            } else {
                $tasks = request()->user()->tasks()->with('status')
                    ->where(function ($query) use ($request) {
                        if ($request->due_date) {
                            $query->where('due_date', $request->due_date);
                        }
                        if ($request->status_id) {
                            $query->where('status_id', $request->status_id);
                        }
                    })
                    ->get();
            }
        } catch (\Throwable $tr) {
            throw $tr;
        }

        return Inertia::render('Task/Index', ['tasks' => $tasks, 'statuses' => Status::all()]);
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
        return redirect()->back();
    }

    public function destroy(Task $task)
    {
        Gate::authorize('delete', $task);
        try {
            $task->delete();
        } catch (\Throwable $tr) {
            throw $tr;
        }
        return to_route('tasks.index');
    }
}
