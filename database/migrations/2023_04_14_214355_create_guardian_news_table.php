<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGuardianNewsTable extends Migration
{
    public function up()
    {
        Schema::create('guardian_news', function (Blueprint $table) {
            $table->id();
            $table->string('article_id');
            $table->string('section_id');
            $table->string('section_name');
            $table->string('web_publication_date');
            $table->string('web_title');
            $table->string('web_url', 2048);
            $table->string('api_url', 2048);
            $table->boolean('is_hosted');
            $table->string('pillar_id')->nullable();
            $table->string('pillar_name')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('guardian_news');
    }
}
