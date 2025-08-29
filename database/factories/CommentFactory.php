<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory for generating fake Comment data.
 * Used in seeding and tests.
 */

class CommentFactory extends Factory
{

    protected $model = Comment::class;

    /**
     * Default state for a comment:
     * - user_id: pick a random user, or create one if none exist
     * - post_id: pick a random post, or create one if none exist
     * - body: some fake sentence text
     */
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'post_id' => Post::inRandomOrder()->value('id') ?? Post::factory(),
            'body' => fake()->sentence(12),
        ];
    }
}
