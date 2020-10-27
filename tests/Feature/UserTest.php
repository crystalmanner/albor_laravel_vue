<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function testHasCompanyBranch()
    {
        $coach = factory(User::class)->create();

        $trainees = factory(User::class, 3)->create([
            'coach_uuid' => $coach->uuid
        ]);

        $this->assertEquals($coach->trainees->count(), 3);
        $this->assertEquals($trainees[0]->coach->id, $coach->id);
    }
}
