<?php

namespace App\Database\Seeds;

use FreshinUp\FreshCoachingApi\Seeds\CoachSeeder;
use FreshinUp\FreshCoachingApi\Seeds\StepSeeder;
use Illuminate\Database\Seeder;

class DatabaseTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CoachSeeder::class,
            StepSeeder::class
        ]);
    }
}
