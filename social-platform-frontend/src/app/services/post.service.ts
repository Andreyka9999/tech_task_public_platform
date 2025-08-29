import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../models/post';

// API usually wraps responses inside { data: ... }
type ApiData<T> = { data: T };

@Injectable({ providedIn: 'root' })
export class PostsService {
  // base URL for all requests
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get list of posts (with optional filters: search text or category)
  list(filters?: { search?: string; category?: string | number }): Observable<Post[]> {
    let params = new HttpParams();
    if (filters?.search) params = params.set('search', String(filters.search));
    if (filters?.category) params = params.set('category', String(filters.category));

    return this.http
      .get<ApiData<Post[]>>(`${this.base}/posts`, { params })
      // unwrap the API response so we only return the array of posts
      .pipe(map((res) => res.data));
  }

  // Just a shortcut for list() – can be used for clarity in components
  getAll(filters?: { search?: string; category?: string | number }): Observable<Post[]> {
    return this.list(filters);
  }

  // Fetch single post by id
  getOne(id: number): Observable<Post> {
    return this.http
      .get<ApiData<Post>>(`${this.base}/posts/${id}`)
      .pipe(map((res) => res.data));
  }

  // Create a new post with title/content/categories
  create(payload: { title: string; content: string; categories: number[] }): Observable<Post> {
    return this.http
      .post<ApiData<Post>>(`${this.base}/posts`, payload)
      .pipe(map((res) => res.data));
  }

  // Update existing post by id (can update one or several fields)
  update(id: number, payload: { title?: string; content?: string; categories?: number[] }): Observable<Post> {
    return this.http
      .put<ApiData<Post>>(`${this.base}/posts/${id}`, payload)
      .pipe(map((res) => res.data));
  }

  // Delete post by id
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/posts/${id}`);
  }
}
