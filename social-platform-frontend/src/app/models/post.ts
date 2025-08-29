/**
 * Purpose: Data model for posts in the Social Publishing Platform.
 * Notes:
   - Post belongs to one user (author).
   - Post can have many categories (many-to-many).
   - Post can have many comments.
   - Backend returns `comments_count` for quick display in feed.
 */

import { User } from './user';
import { Category } from './category';
import { Comment as AppComment } from './comment';

export interface Post {
  id: number;                 // unique id of the post
  title: string;              // post title (required)
  content: string;            // main text content (required)
  created_at?: string;        // when post was created
  updated_at?: string;        // when post was last updated

  author?: User;              // post author (comes from API)
  categories?: Category[];    // related categories (many-to-many)

  comments?: AppComment[];    // list of comments
  comments_count?: number;    // number of comments (for feed preview)
}
