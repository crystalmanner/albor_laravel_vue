<?php

namespace Tests\Feature\Http\Controllers\API;

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

class UsersTest extends TestCase
{
    use WithoutMiddleware, RefreshDatabase, WithFaker;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetList()
    {
        factory(Community::class)->create();
        factory(ArborRole::class)->create();
        factory(Discipline::class)->create();
        
        factory(User::class)->create([
            'community_id' => 1,
            'discipline_id' => 1,
            'arbor_role_id' => 1,
        ]);

        $user = factory(User::class)->create();
        Passport::actingAs($user);

        $data = $this
            ->json(
                'GET',
                'api/users'
            )->assertStatus(200)
            ->assertJsonStructure([
                'data' => [],
            ])
            ->json('data');
        
        $this->assertArrayHasKey('community', $data[0]);
        $this->assertArrayHasKey('discipline', $data[0]);
        $this->assertArrayHasKey('arbor_role', $data[0]);

        $this->assertEquals($data[0]['community'], Community::find(1)->name);
        $this->assertEquals($data[0]['discipline'], Discipline::find(1)->name);
        $this->assertEquals($data[0]['arbor_role'], ArborRole::find(1)->name);
        
        $this->assertNull($data[1]['community']);
        $this->assertNull($data[1]['discipline']);
        $this->assertNull($data[1]['arbor_role']);
    }
}
