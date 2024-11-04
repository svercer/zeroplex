<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedModelPermissions();
        $this->seedRoles([
            'admin'     => [],
            'user'   => [],
        ]);
    }



    public function seedModelPermissions(): void
    {
        $models = [
            'user',
            'task'
        ];

        $permissions = [
            'index',
            'view',
            'create',
            'update',
            'delete',
            'view-all'
        ];

        foreach ($models as $model) {
            foreach ($permissions as $permission) {
                $name = $permission . '-' . $model;
                Permission::query()->firstOrCreate(['name' => $name]);
            }
        }
    }

    public function seedRoles(array $roles): void
    {
        foreach ($roles as $role => $permissions) {
            $role = Role::query()->firstOrCreate(['name' => $role]);
            $role->syncPermissions($permissions);
        }
    }
}
