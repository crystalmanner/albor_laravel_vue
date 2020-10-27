<?php

namespace App\Database\Seeds;

use Illuminate\Database\Seeder;
use App\Models\ArborRole;

class ArborRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arbor_roles = [
            'Accountants',
            'Business Office Director',
            'Business Office Specialist',
            'Dining Director',
            'Dining Partner',
            'Dining Specialist',
            'Discipline Leader Accounting',
            'Discipline Leader Communication',
            'Discipline Leader Dining',
            'Discipline Leader Engagement',
            'Discipline Leader Resident Care',
            'Discipline leader Sales',
            'Engagement Director',
            'Engagement Partner',
            'Engagement Specialist',
            'EVP/People',
            'Executive Director',
            'Executive Project Coordinator',
            'HR Specialist',
            'Maintenance Specialist',
            'Marketing Specialist',
            'Memory Care Director',
            'Miantenance Director ',
            'Operations Partner',
            'President/Operations',
            'Resident Care Director',
            'Resident Care Partner',
            'Resident Care Specialist',
            'Sales Partners',
            'Sales Specialists',
            'Senior Care Counselor',
            'Training Specialist'
        ];

        foreach ($arbor_roles as $arbor_role) {
            ArborRole::firstOrCreate([
                'name' => $arbor_role
            ]);
        }
    }
}
