<?php
/**
 * Checking that the Fresh Coaching Api is installed and works with Arbor
 */

namespace Tests\Feature\ModuleIntegrations;

use App\User;
use Laravel\Passport\Passport;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use FreshinUp\FreshBusForms\Models\User\User as BUSUser;

class FreshCoachingApiTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testFreshCoachingApiIsInstalled()
    {
        $user = factory(User::class)->create();
        Passport::actingAs($user);
        $response = $this
            ->json('GET', '/api/users')
            ->assertStatus(200)
            ->json('data');

        $this->assertArrayHasKey('coach_uuid', $response[0]);
    }
}
