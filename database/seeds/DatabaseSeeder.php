<?php

namespace App\Database\Seeds;

use FreshinUp\FreshCoachingApi\Seeds\StepStatusSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            DefaultCompanySeeder::class,
            ArborRoleSeeder::class,
            CommunitySeeder::class,
            DisciplineSeeder::class,
            UserTypeSeed::class,
            StepStatusSeeder::class
        ]);
    }
}
