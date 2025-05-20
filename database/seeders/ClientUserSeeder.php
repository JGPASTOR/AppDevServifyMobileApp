<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ClientUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'full_name' => 'John Doe',
            'email' => 'client@example.com',
            'password' => Hash::make('Password123!'),
            'role' => 'client',
            'status' => 'active',
        ]);
    }
} 