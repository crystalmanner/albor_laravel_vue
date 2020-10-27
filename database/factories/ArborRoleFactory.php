<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ArborRole;
use Faker\Generator as Faker;

$factory->define(ArborRole::class, function (Faker $faker) {
    return [
        'name' => $faker->word
    ];
});
