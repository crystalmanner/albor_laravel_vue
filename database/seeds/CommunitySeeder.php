<?php

namespace App\Database\Seeds;

use Illuminate\Database\Seeder;
use App\Models\Community;

class CommunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $communities = [
            'Arbor Terrace at Cascade',
            'Arbor Terrace at Citrus Park',
            'Arbor Terrace at Crabapple',
            'Arbor Terrace at Hamilton Mill',
            'Arbor Terrace at Hamilton Mill IL',
            'Arbor Terrace at Kingwood Town Center',
            'Arbor Terrace Fairfax',
            'Arbor Terrace Fulton',
            'Arbor Terrace Lakeway',
            'Arbor Terrace Morris Plains',
            'Arbor Terrace Mountainside',
            'Arbor Terrace Mt Laurel',
            'Arbor Terrace Naperville',
            'Arbor Terrace of Asheville',
            'Arbor Terrace of Athens',
            'Arbor Terrace of Burnt Hickory',
            'Arbor Terrace of Decatur',
            'Arbor Terrace of East Cobb',
            'Arbor Terrace of Herndon',
            'Arbor Terrace of Johns Creek',
            'Arbor Terrace of Knoxville',
            'Arbor Terrace of Middletown',
            'Arbor Terrace Ortega',
            'Arbor Terrace Peachtree City',
            'Arbor Terrace Ponte Vedra',
            'Arbor Terrace Roseland',
            'Arbor Terrace San Jose',
            'Arbor Terrace Senior Living',
            'Arbor Terrace Shrewsbury',
            'Arbor Terrace Sudley Manor',
            'Arbor Terrace Teaneck',
            'Arbor Terrace Waugh Chapel',
            'Arbor Terrace Willistown',
            'Barrington Terrace of Fort Myers',
            'Barrington Terrace of Naples',
            'Eden Terrace of Spartanburg',
            'Renaissance on Peachtree',
            'Solana East Cobb',
            'Summit of Uptown',
            'The Arbor at BridgeMill',
            'The Arbor Company',
            'The Gardens at Eastside',
            'The Lakeside at Amelia ',
            'The Preserve at Palm Aire',
            'The Vantage at City View'
        ];

        foreach ($communities as $community) {
            Community::firstOrCreate([
                'name' => $community
            ]);
        }
    }
}
