<?php

namespace App\Http\Controllers\API;

use FreshinUp\FreshBusForms\Http\Controllers\Controller;
use App\Http\Resources\ArborRole as ArborRoleResource;
use App\Models\ArborRole;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

/**
 * Class ArborRoles.
 */
class ArborRoles extends Controller
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
        $query = ArborRole::query();
        $userStatuses = QueryBuilder::for($query, $request)
            ->allowedFilters(['name']);

        return ArborRoleResource::collection($userStatuses->paginate());
    }
}
