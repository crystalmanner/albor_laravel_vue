<?php

namespace App;

use App\Models\ArborRole;
use App\Models\Community;
use App\Models\Discipline;

class User extends \FreshinUp\FreshCoachingApi\Models\User
{
    public function getMorphClass()
    {
        return 'FreshinUp\FreshBusForms\Models\User\User';
    }

    public function arborRole()
    {
        return $this->belongsTo(ArborRole::class);
    }

    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    public function discipline()
    {
        return $this->belongsTo(Discipline::class);
    }

    public function coach()
    {
        return $this->belongsTo(User::class, 'coach_uuid', 'uuid');
    }

    public function trainees()
    {
        return $this->hasMany(User::class, 'coach_uuid', 'uuid');
    }
}
