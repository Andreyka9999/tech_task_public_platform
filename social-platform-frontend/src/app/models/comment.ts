/**
 * Purpose: Data model for comments on posts.
 * Note: users can only delete their own comments (per requirements).
 */

import { User } from './user';

export interface Comment {
  id: number;             // unique id of the comment
  body: string;           // comment text
  created_at?: string;    // when the comment was created (ISO date string)
  post_id: number;        // id of the post this comment belongs to

  author?: User;          // author info (id + name from API)
}
