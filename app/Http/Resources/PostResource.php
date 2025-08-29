<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'content'     => $this->content,
            // Dates are converted to ISO 8601 string → easier to handle in JS
            'created_at'  => $this->created_at?->toIso8601String(),
            'updated_at'  => $this->updated_at?->toIso8601String(),
            // Only expose safe author data (no password, no sensitive stuff)
            'author'      => [
                'id'   => $this->author->id,
                'name' => $this->author->name,
            ],
            // Categories: return as array of {id, name, slug} via CategoryResource
            'categories'  => CategoryResource::collection($this->whenLoaded('categories')),
            // Quick count of comments → for showing numbers in feed
            'comments_count' => $this->comments()->count(),
            // If comments are already loaded (e.g. on post detail page),
            // return them with author info via CommentResource
            'comments'    => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
