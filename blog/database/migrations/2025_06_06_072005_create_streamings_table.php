<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('streamings', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('video_id')->constrained('videos');
            $table->integer('watch_time')->default(0); // in seconds
            $table->timestamp('last_watched_at');
            $table->timestamps();

            $table->primary(['user_id', 'video_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('streamings');
    }
};
