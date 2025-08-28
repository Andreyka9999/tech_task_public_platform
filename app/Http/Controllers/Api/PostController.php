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
    public function index(Request $request){
    
        $q = Post::query()
            ->with(['author', 'categories'])
            ->withCount('comments');

        // Search by title and content
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
    
        $post->load([
            'author',
            'categories',
            'comments' => fn ($q) => $q->with('author')->latest(),
        ])->loadCount('comments');

        return new PostResource($post);
    }

    public function store(StorePostRequest $request){
    
        $data = $request->validated(); // title, content, categories: array<int>

        $post = Post::create([
            'user_id' => $request->user()->id,
            'title'   => $data['title'],
            'content' => $data['content'],
        ]);

        // Category binding
        $post->categories()->sync($data['categories'] ?? []);

        $post->load(['author', 'categories'])->loadCount('comments');

        return (new PostResource($post))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdatePostRequest $request, Post $post){
    
        $this->authorize('update', $post);

        $data = $request->validated(); // may contain title, content, categories

        if (array_key_exists('title', $data)) {
            $post->title = $data['title'];
        }
        if (array_key_exists('content', $data)) {
            $post->content = $data['content'];
        }
        $post->save();

        if (array_key_exists('categories', $data)) {
            $post->categories()->sync($data['categories'] ?? []);
        }

        $post->load(['author', 'categories'])->loadCount('comments');

        return new PostResource($post);
    }

    public function destroy(Post $post){
    
        $this->authorize('delete', $post);
        $post->delete();

        return response()->noContent();
    }
}
