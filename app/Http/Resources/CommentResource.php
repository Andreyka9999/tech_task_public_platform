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

        /**
        * This defines how a single Comment model
        * is turned into JSON for the API response.
        */

        return [
            'id'         => $this->id,
            // we keep both "content" and "body" for flexibility,
            // because sometimes frontend might expect "body"
            'content'    => $this->body,
            'body'       => $this->body,
            'post_id'    => $this->post_id,
            // format date in ISO string so frontend can parse easily
            'created_at' => $this->created_at?->toISOString(),
            // include author info (only id + name, no sensitive data)
            'author'     => [
                'id'   => $this->author->id,
                'name' => $this->author->name,
            ],
        ];
    }
}
