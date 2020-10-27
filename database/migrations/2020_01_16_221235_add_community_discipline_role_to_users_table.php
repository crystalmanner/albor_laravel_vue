<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCommunityDisciplineRoleToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('community_id')->nullable()->index();
            $table->integer('discipline_id')->nullable()->index();
            $table->integer('arbor_role_id')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('community_id');
            $table->dropColumn('discipline_id');
            $table->dropColumn('arbor_role_id');
        });
    }
}
