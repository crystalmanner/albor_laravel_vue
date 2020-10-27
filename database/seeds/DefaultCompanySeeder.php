<?php

namespace App\Database\Seeds;

use Illuminate\Database\Seeder;
use FreshinUp\FreshBusForms\Models\Company\Company;

class DefaultCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $company = Company::firstOrCreate([
            'name' => env('APP_NAME'),
            'status' => 1
        ]);
    }
}
