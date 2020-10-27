<?php

namespace App\Http\Controllers\API;

use FreshinUp\FreshBusForms\Http\Controllers\Controller;
use FreshinUp\FreshBusForms\Http\Resources\User\Status as UserStatusResource;
use FreshinUp\FreshBusForms\Models\User\UserStatus;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use FreshinUp\FreshBusForms\Enums\UserStatus as UserStatusesEnum;

/**
 * Class UserStatuses.
 */
class UserStatuses extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $query = UserStatus::query();
        $userStatuses = QueryBuilder::for($query, $request)
            ->allowedFilters(['default', 'name'])
            ->where('id', '<>', UserStatusesEnum::INACTIVE)
        ;

        return UserStatusResource::collection($userStatuses->paginate());
    }
}
