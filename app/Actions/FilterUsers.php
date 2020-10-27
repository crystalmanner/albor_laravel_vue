<?php

namespace App\Actions;

use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\Filter;

use FreshinUp\FreshBusForms\Actions\FilterUsers as BusFilterUsers;

class FilterUsers extends BusFilterUsers
{
    protected function getAllowedFilters()
    {
        $filters = parent::getAllowedFilters();
        $filters[] = Filter::exact('discipline_id');
        $filters[] = Filter::exact('community_id');
        $filters[] = Filter::exact('arbor_role_id');
        return $filters;
    }
}
