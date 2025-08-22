<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        for ($i = 1; $i <= 3; $i++) {
            \App\Models\Project::create([
                'name' => $faker->words(3, true),
                'description' => $faker->sentence()
            ]);
        }
    }
}
