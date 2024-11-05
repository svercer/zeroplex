<?php

namespace Database\Seeders;

use App\Models\Enums\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'stoleuser',
                'email' => 'stoleuser@gmail.com',
                'password' => Hash::make('P@ssw0rd')
            ],
            [
                'name' => 'stoleuser2',
                'email' => 'stoleuser2@gmail.com',
                'password' => Hash::make('P@ssw0rd')
            ],
        ];
         $admin = [
            'name' => 'stoleadmin',
            'email' => 'stoleadmin@gmail.com',
            'password' => Hash::make('P@ssw0rd'),
        ];

         foreach ($users as $user) {
             $createdUser = User::create($user);
                $createdUser->syncRoles(Role::USER->value);
         }

         $createdAdmin = User::create($admin);
         $createdAdmin->syncRoles(Role::ADMIN->value);


    }
}
