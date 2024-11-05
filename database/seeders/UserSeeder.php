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
             $existingUser = User::where('email', $user['email'])->first();
             if (!$existingUser) {
                 $createdUser = User::firstOrCreate($user);
                $createdUser->syncRoles(Role::USER->value);
             }
         }

         $existingAdmin = User::where('email',$admin['email'])->first();
         if (!$existingAdmin) {
            $createdAdmin = User::create($admin);
            $createdAdmin->syncRoles(Role::ADMIN->value);
         }


    }
}
