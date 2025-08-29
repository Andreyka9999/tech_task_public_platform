import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment as AppComment } from '../models/comment';

// API sometimes wraps response in { data: ... }
type ApiData<T> = { data: T };

@Injectable({ providedIn: 'root' })
export class CommentsService {
  // base API URL from environment settings
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Create a new comment for a specific post
  // postId: which post the comment belongs to
  // payload:  { body: "text of the comment" }
  create(postId: number, payload: { body: string }): Observable<AppComment> {
    return this.http
      .post<ApiData<AppComment>>(`${this.base}/posts/${postId}/comments`, payload)
      .pipe(map((res) => res.data));
  }

  // unwrap { data: ... } to just the comment object
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/comments/${id}`);
  }
}
