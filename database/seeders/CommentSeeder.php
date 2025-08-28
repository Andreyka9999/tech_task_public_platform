<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        
        Post::all()->each(function (Post $post) use ($users) {
            Comment::factory()->count(2)->create([
                'post_id' => $post->id,
                'user_id' => $users->random()->id,
            ]);
        });
    }
}
