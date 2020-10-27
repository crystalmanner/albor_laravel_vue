<?php

namespace App\Console\Commands;

use App\Database\Seeds\DatabaseSeeder;
use App\Database\Seeds\DatabaseTestSeeder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Console\Input\InputOption;

class Seed extends Command
{
    protected $name = 'arbor:seed';
    protected $description = 'arbor Seed the Database';

    public function handle()
    {
        try {
            DB::connection()->getPdo();
        } catch (\Exception $e) {
            $this->error('Could not connect to the database, please check your configuration:' . "\n" . $e);

            return;
        }

        if ($this->option('refresh')) {
            $this->call('migrate:refresh', [
                '--force' => $this->option('force')
            ]);
            $this->call('passport:install', [
                '--force' => $this->option('force')
            ]);
        }

        $this->call('fresh-bus:seed', [
            '--quickstart' =>  $this->option('quickstart')
        ]);

        $this->call('db:seed', [
            '--class' => DatabaseSeeder::class,
            '--force' => $this->option('force')
        ]);

        if ($this->option('quickstart')) {
            $this->call('db:seed', [
                '--class' => DatabaseTestSeeder::class,
                '--force' => $this->option('force')
            ]);
        }
    }

    /*
    **
    * Get the console command options.
    *
    * @return array
    */
    protected function getOptions()
    {
        return [
            [
                'quickstart',
                null,
                InputOption::VALUE_NONE,
                'Load sample users, companies, teams, inventory, etc. Helpful for local dev and staging environments'
            ],
            [
                'refresh',
                null,
                InputOption::VALUE_NONE,
                'Wipe out existing data and reseed.'
            ],
            [
                'force',
                null,
                InputOption::VALUE_NONE,
                'Force the database change without requesting user interaction / acceptance'
            ]
        ];
    }
}
