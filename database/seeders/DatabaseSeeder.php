<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            ClientUserSeeder::class,
        ]);

        // Create a test client user
        User::create([
            'full_name' => 'Test Client',
            'email' => 'client@example.com',
            'password' => Hash::make('Password123!'),
            'role' => 'client',
            'status' => 'active',
        ]);
    }
}
