<?php

namespace App\Helpers;

use FreshinUp\FreshBusForms\Helpers\Permissions;

class UserPermissions extends Permissions
{
    public function getProperties($filters)
    {
        return [
            'status' => [
                'label' => 'Status',
                'rules' => ['required'],
                'readonly' => false
            ],
            'first_name' => [
                'label' => 'First Name',
                'rules' => ['required'],
                'readonly' => false
            ],
            'last_name' => [
                'label' => 'Last Name',
                'rules' => ['required'],
                'readonly' => false
            ],
            'email' => [
                'label' => 'Email',
                'rules' => ['required', 'email'],
                'readonly' => false
            ],
            'level' => [
                'label' => 'Level',
                'rules' => ['required', 'integer', 'min:' . $this->currentUser->level],
                'readonly' => false
            ],
        ];
    }
}
