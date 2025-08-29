import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsService } from '../../services/post.service';
import { Post } from '../../models/post';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export default class ProfileComponent {
  // Injecting services without constructor (Angular v14+ feature)
  private postsApi = inject(PostsService);
  private route = inject(ActivatedRoute);
  auth = inject(AuthService);

  posts: Post[] = [];       // list of posts that belong to the user
  userId?: number;          // current profile user id (from route)
  loading = false;          // show spinner / "Loading..." state

  ngOnInit() {
    // Every time route params change (e.g. visiting another user profile),
    // we grab the "id" from the URL and load that user's posts
    this.route.paramMap.subscribe(p => {
      this.userId = Number(p.get('id') || 0);
      this.load();
    });
  }

  // Checks if the opened profile belongs to the logged-in user
  get isOwner(): boolean {
    return !!this.userId && this.auth.currentUser?.id === this.userId;
  }

  load() {
    if (!this.userId) return;
    this.loading = true;
    // If there is no user filter in the API, we will filter it on the client side.
    this.postsApi.list({}).subscribe({
      next: (data) => {
        this.posts = data.filter(p => p.author?.id === this.userId);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onDelete(id: number) {
    // Simple browser confirm before deleting a post
    if (!confirm('Delete this post?')) return;
    this.postsApi.delete(id).subscribe({
      next: () => this.posts = this.posts.filter(p => p.id !== id),
      error: (e) => alert(e?.error?.message || 'Delete failed')
    });
  }
}
