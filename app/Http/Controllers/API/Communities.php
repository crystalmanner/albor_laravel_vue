<?php

namespace App\Http\Controllers\API;

use FreshinUp\FreshBusForms\Http\Controllers\Controller;
use App\Http\Resources\Community as CommunityResource;
use App\Models\Community;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

/**
 * Class Communities.
 */
class Communities extends Controller
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
        $query = Community::query();
        $userStatuses = QueryBuilder::for($query, $request)
            ->allowedFilters(['name']);

        return CommunityResource::collection($userStatuses->paginate());
    }
}
