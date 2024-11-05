<?php

namespace App\Policies;

use App\Models\Enums\Role;
use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TaskPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasRole(Role::ADMIN->value);
    }

    public function view(User $user, Task $task): bool
    {
        return $user->hasRole(Role::ADMIN->value) || $task->user_id === $user->id;
    }

    public function create(User $user): bool
    {
    }

    public function update(User $user, Task $task): bool
    {
        return $user->hasRole(Role::ADMIN->value) || $user->id == $task->user_id;
    }

    public function delete(User $user, Task $task): bool
    {
        return $user->hasRole(Role::ADMIN->value) || $user->id === $task->user_id;
    }

    public function restore(User $user, Task $task): bool
    {
        return $user->hasRole(Role::ADMIN->value);

    }

    public function forceDelete(User $user, Task $task): bool
    {
        return $user->hasRole(Role::ADMIN->value);
    }
}
