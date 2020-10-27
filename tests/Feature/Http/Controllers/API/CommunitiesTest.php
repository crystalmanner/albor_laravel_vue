<?php

namespace Tests\Feature\Http\Controllers\API;

use App\User;
use Tests\TestCase;
use App\Models\Community;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;

class CommunitiesTest extends TestCase
{
    use WithoutMiddleware, RefreshDatabase, WithFaker;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetList()
    {
        $user = factory(User::class)->create();
        Passport::actingAs($user);

        factory(Community::class, 5)->create();

        $data = $this
            ->json(
                'GET',
                'api/communities'
            )->assertStatus(200)
            ->assertJsonStructure([
                'data' => [],
            ])
            ->json('data');

        $this->assertEquals(count($data), 5);
    }

    public function testGetFilteredList()
    {
        $user = factory(User::class)->create();
        Passport::actingAs($user);
        
        factory(Community::class)->create([
            'name' => 'factory-name-test'
        ]);
        factory(Community::class, 5)->create();

        $data = $this
            ->json(
                'GET',
                'api/communities?filter[name]=factory-name-test'
            )->assertStatus(200)
            ->assertJsonStructure([
                'data' => [],
            ])
            ->json('data');

        $this->assertEquals(1, count($data));
        $this->assertEquals('factory-name-test', $data[0]['name']);
    }
}
