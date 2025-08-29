/**
 * Purpose: Show one post and let users add/delete comments.
 * Notes:
   - Loads post by route param (:id).
   - Only logged-in users can add comments.
   - Users can delete only their own comments.
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PostsService } from '../../services/post.service';
import { CommentsService } from '../../services/comments.service';
import { AuthService } from '../../services/auth.service';

import { Post } from '../../models/post';
import { Comment as AppComment } from '../../models/comment';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-detail.html',
  styleUrls: ['./post-detail.css'],
})
export default class PostDetailComponent {
  // services for data + route info + auth
  private postsApi = inject(PostsService);
  private commentsApi = inject(CommentsService);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);

  // state for template
  post?: Post;
  loading = false;
  commentText = '';
  error: string | null = null;

  // current user and auth flag exposed to template
  get me() { return this.auth.currentUser; }
  get isAuth() {
    // support both boolean property and function (depends on AuthService impl)
    return typeof (this.auth as any).isAuthenticated === 'function'
      ? (this.auth as any).isAuthenticated()
      : (this.auth as any).isAuthenticated;
  }

  ngOnInit() {
    // read post id from route and load post
    this.route.paramMap.subscribe((p) => {
      const id = Number(p.get('id'));
      if (id) this.load(id);
    });
  }

  /** Load one post from API */
  load(id: number) {
    this.loading = true;
    this.postsApi.getOne(id).subscribe({
      next: (p: Post) => { this.post = p; this.loading = false; },
      error: () => { this.loading = false; }    // stop spinner even on error
    });
  }

  /** Add new comment (only if text not empty) */
  addComment() {
    const text = this.commentText.trim();
    if (!this.post || !text) return;

    this.commentsApi.create(this.post.id, { body: text }).subscribe({
      next: (c: AppComment) => {
        // optimistic UI: prepend new comment and update counter
        const existing = this.post!.comments ?? [];
        this.post!.comments = [c, ...existing];
        this.post!.comments_count = (this.post!.comments_count ?? 0) + 1;
        this.commentText = '';
      },
      error: (e: any) => this.error = e?.error?.message || 'Failed to add comment'
    });
  }

  /** Check if current user can delete this comment */
  canDelete(c: AppComment) {
    return !!(this.me && c.author?.id === this.me.id);
  }

  deleteComment(c: AppComment) {
    if (!confirm('Delete comment?')) return;
    this.commentsApi.delete(c.id).subscribe({
      next: () => {
        if (!this.post?.comments) return;
        // remove from list and decrease counter safely
        this.post.comments = this.post.comments.filter((x: AppComment) => x.id !== c.id);
        this.post.comments_count = Math.max(0, (this.post.comments_count ?? 1) - 1);
      }
    });
  }
}
