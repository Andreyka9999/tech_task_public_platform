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
            'created_at'  => $this->created_at?->toIso8601String(),
            'updated_at'  => $this->updated_at?->toIso8601String(),
            'author'      => [
                'id'   => $this->author->id,
                'name' => $this->author->name,
            ],
            'categories'  => CategoryResource::collection($this->whenLoaded('categories')),
            'comments_count' => $this->comments()->count(),
            'comments'    => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
