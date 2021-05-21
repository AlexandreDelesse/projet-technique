<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->date('birthdate')->nullable();
            $table->string('phone')->nullable();
            $table->foreignId('bloodgroup_id')->nullable()->constrained()->onCascade('set null');
            $table->unsignedInteger('type')->default(0);
            $table->string('gender')->nullable();
            $table->string('avatar')->nullable();
            $table->string('email')->unique();
            $table->foreignId('adress_id')->nullable()->constrained()->onCascade('set null');
            $table->boolean('receive_emails')->default(1);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->json('google_calendar_token')->nullable();
            $table->boolean('google_calendar_api_activated')->default(false);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
