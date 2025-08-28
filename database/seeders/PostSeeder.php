<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;


class PostSeeder extends Seeder {
    public function run(): void {
        $users = User::all();
        $categories = Category::all();

        Post::factory(10)->create()->each(function (Post $post) use ($categories) {
            $post->categories()->sync(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );
        });

        // Several posts from a specific user
        $demo = User::where('email', 'demo@example.com')->first();
        if ($demo) {
            Post::factory(3)->create(['user_id' => $demo->id])->each(function (Post $post) use ($categories) {
                $post->categories()->sync($categories->random(2)->pluck('id')->toArray());
            });
        }
    }
}
