<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory for generating fake Post data.
 * Helpful for seeding the database or running tests.
 */
class PostFactory extends Factory
{

    /**
     * Default state for a post:
     * - user_id: always create a new fake user (UserFactory)
     * - title: fake sentence with ~6 words
     * - content: few fake paragraphs joined into one string
     */
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(6),
            'content' => fake()->paragraphs(3, true),
        ];
    }
}
