<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'content'    => $this->body,
            'body'       => $this->body,
            'post_id'    => $this->post_id,
            'created_at' => $this->created_at?->toISOString(),
            'author'     => [
                'id'   => $this->author->id,
                'name' => $this->author->name,
            ],
        ];
    }
}
