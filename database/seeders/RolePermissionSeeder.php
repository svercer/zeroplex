<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
          'index-task',
          'view-task',
          'create-task',
          'update-task',
          'delete-task',
        ];

        $roleAdmin = Role::where('name', 'admin')->first();
        $roleUser = Role::where('name', 'user')->first();
        $roleAdmin->syncPermissions(Permission::all());
        $roleUser->syncPermissions($permissions);
    }
}
