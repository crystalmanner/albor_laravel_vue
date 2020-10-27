<?php

namespace App\Database\Seeds;

use FreshinUp\FreshBusForms\Models\User\UserType;
use FreshinUp\FreshBusForms\Enums\UserType as UserTypeEnum;
use Illuminate\Database\Seeder;

class UserTypeSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        UserType::updateOrCreate([
            'display_id' => UserTypeEnum::STAFF
        ], [
            'name' => 'Staff'
        ]);

        UserType::where('display_id', '<>', UserTypeEnum::STAFF)->delete();
    }
}
