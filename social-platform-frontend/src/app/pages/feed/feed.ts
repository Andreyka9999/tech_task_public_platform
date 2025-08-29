/**
 * Purpose: Component for the main feed (list of posts).
 * Notes:
   - Loads posts from backend API with search + category filter.
   - Also loads categories (they are seeded on backend).
   - Uses query params so filters can be shared/bookmarked.
 */


import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../../services/post.service';
import { CategoriesService } from '../../services/category.service';

import { Post } from '../../models/post';
import { Category } from '../../models/category';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './feed.html',
  styleUrls: ['./feed.css'],
})

/** Main feed component */
export default class FeedComponent {
  private postsApi = inject(PostsService);
  private catsApi = inject(CategoriesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // data for template
  posts: Post[] = [];
  categories: Category[] = [];
  loading = false;
  search = '';                // text filter
  categoryId: string = '';    // category filter

  ngOnInit() {
    // watch query params in URL (for search + category)
    this.route.queryParamMap.subscribe(params => {
      this.search = params.get('search') ?? '';
      this.categoryId = params.get('category') ?? '';
      this.load();            // reload posts when filters change
    });
    this.loadCategories();
  }

  /** Load posts from API with current filters */
  load() {
    this.loading = true;
    this.postsApi.list({
      search: this.search || undefined,
      category: this.categoryId || undefined,
    }).subscribe({
      next: (data: Post[]) => { 
        this.posts = data;      // update UI with posts
        this.loading = false;   // stop spinner on error too
      },
      error: () => { this.loading = false; },
    });
  }

  /** Load all categories (read-only, from backend seed) */
  loadCategories() {
    this.catsApi.all().subscribe({
      next: (cats: Category[]) => this.categories = cats 
    });
  }

  /** Apply filters by updating query params (keeps URL in sync) */
  applyFilters() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.search || null,
        category: this.categoryId || null,
      },
      queryParamsHandling: 'merge'    // keep other params in URL
    });
  }

}
