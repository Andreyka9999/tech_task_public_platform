<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // only return the fields that frontend really needs
            'id'   => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,      // useful for URLs/filters in frontend
        ];  
    }
}
