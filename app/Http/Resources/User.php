<?php

namespace App\Http\Resources;

use FreshinUp\FreshCoachingApi\Resources\User as UserResource;

class User extends UserResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $data = parent::toArray($request);
        $data['community_id'] = $this->community_id;
        $data['community'] = optional($this->community)->name;
        $data['discipline_id'] = $this->discipline_id;
        $data['discipline'] = optional($this->discipline)->name;
        $data['arbor_role_id'] = $this->arbor_role_id;
        $data['arbor_role'] = optional($this->arborRole)->name;

        return $data;
    }
}
