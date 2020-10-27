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

class UserStatusesTest extends TestCase
{
    use WithoutMiddleware, RefreshDatabase, WithFaker;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetList()
    {
        $this->seed(NotifierSeed::class);
        $user = factory(User::class)->create([
            'company_id' => 1,
            'level' => 1
        ]);
        Passport::actingAs($user);

        foreach (UserStatusEnum::toKeyedArray() as $userStatus) {
            UserStatus::firstOrCreate([
                'id' => $userStatus['value'],
                'name' => $userStatus['label']
            ]);
        }

        $data = $this
            ->json(
                'GET',
                'api/userstatuses'
            )->assertStatus(200)
            ->assertJsonStructure([
                'data' => [],
            ])
            ->json('data');

        foreach ($data as $value) {
            $this->assertFalse($value['id'] == UserStatusEnum::INACTIVE);
        }
    }
}
