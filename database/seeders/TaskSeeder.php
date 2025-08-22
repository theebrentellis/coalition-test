<?php

namespace Database\Seeders;

use Faker\Factory as Faker;

use App\Models\Project;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        Project::all()->each(function ($project) use ($faker) {
            for ($i = 1; $i <= 3; $i++) {
                \App\Models\Task::create([
                    'name' => rtrim($faker->sentence(3), '.'),
                    'description' => $faker->sentences(2, true),
                    'project_id' => $project->id,
                    'priority' => null, // Random priority between 1 and 5
                ]);
            }
        });
    }
}
