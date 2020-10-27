<?php

namespace App\Database\Seeds;

use Illuminate\Database\Seeder;
use App\Models\Discipline;

class DisciplineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $disciplines = [
            'Accounting',
            'Communication',
            'Dining',
            'Engagement',
            'Maintenance',
            'Operations',
            'People',
            'Resident Care',
            'Sales'
        ];

        foreach ($disciplines as $discipline) {
            Discipline::firstOrCreate([
                'name' => $discipline
            ]);
        }
    }
}
