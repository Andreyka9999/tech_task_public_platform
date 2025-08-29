<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /*
     * Controller for blog posts.
     * Handles: listing, showing one post, creating, updating and deleting.
     * Notes from task:
       - Only logged-in users can create posts
       - Only author can update/delete (checked with PostPolicy)
       - Posts belong to user, and have many categories + comments
     */

    public function index(Request $request){
    
        // Base query with relationships preloaded.
        $q = Post::query()
            ->with(['author', 'categories'])
            ->withCount('comments');

        // Optional text search in title or content
        if ($search = $request->query('search')) {
            $q->where(function ($sub) use ($search) {

                $sub->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
                    
            });
        }

        // Filter by category (id)
        if ($categoryId = $request->query('category')) {

            $q->whereHas('categories', fn ($c) => $c->where('categories.id', $categoryId));

        }

        // Recent from above
        $posts = $q->latest()->get();

        return PostResource::collection($posts);
    }

    public function show(Post $post){
    
        // Load relations so frontend has author + categories + comments
        // Comments are ordered by newest
        $post->load([
            'author',
            'categories',
            'comments' => fn ($q) => $q->with('author')->latest(),
        ])->loadCount('comments');

        return new PostResource($post);
    }

    public function store(StorePostRequest $request){
    
        // StorePostRequest already checks title/content length and category ids
        $data = $request->validated(); // title, content, categories: array<int>

        // Always take user_id from current token (never from client)
        $post = Post::create([
            'user_id' => $request->user()->id,
            'title'   => $data['title'],
            'content' => $data['content'],
        ]);

        // Category binding. Sync categories (many-to-many). Only IDs from request.
        $post->categories()->sync($data['categories'] ?? []);

        // Reload relations so response has everything
        $post->load(['author', 'categories'])->loadCount('comments');

        // Return 201 (created) with formatted resource
        return (new PostResource($post))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdatePostRequest $request, Post $post){
    
        // Policy check: only author can update
        $this->authorize('update', $post);

        $data = $request->validated(); // may contain title, content, categories

        // Update only fields that were sent
        if (array_key_exists('title', $data)) {
            $post->title = $data['title'];
        }
        if (array_key_exists('content', $data)) {
            $post->content = $data['content'];
        }
        $post->save();

        // Sync categories if present
        if (array_key_exists('categories', $data)) {
            $post->categories()->sync($data['categories'] ?? []);
        }

        // Return updated post with relations
        $post->load(['author', 'categories'])->loadCount('comments');

        return new PostResource($post);
    }

    public function destroy(Post $post){
    
        // Policy check: only author can delete
        $this->authorize('delete', $post);
        $post->delete();

        // 204 = success but no response body
        return response()->noContent();
    }
}
