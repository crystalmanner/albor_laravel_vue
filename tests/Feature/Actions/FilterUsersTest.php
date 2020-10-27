<?php

namespace Tests\Feature\Actions;

use App\User;
use Tests\TestCase;
use FreshinUp\FreshBusForms\Models\User\UserStatus;
use FreshinUp\FreshBusForms\Enums\UserStatus as UserStatusEnum;
use FreshinUp\FreshBusForms\Seeds\NotifierSeed;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use App\Models\Community;
use App\Models\ArborRole;
use App\Models\Discipline;

class FilterUsersTest extends TestCase
{
    use WithoutMiddleware, RefreshDatabase, WithFaker;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testAcceptNewFilters()
    {
        factory(Community::class)->create();
        factory(ArborRole::class)->create();
        factory(Discipline::class)->create();
        
        $user = factory(User::class)->create([
            'community_id' => 1,
            'discipline_id' => 1,
            'arbor_role_id' => 1
        ]);
        Passport::actingAs($user);

        factory(User::class, 3)->create();

        $data = $this
            ->json(
                'GET',
                'api/users?filter[discipline_id]=1&filter[community_id]=1&filter[arbor_role_id]=1'
            )
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [],
            ])
            ->json('data');

        $this->assertEquals(count($data), 1);
    }
}
