

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

// Sometimes API wraps response in { data: ... }, so we type it like this
type ApiData<T> = { data: T };

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  // base API url from environment config
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Fetch all categories from backend
  all(): Observable<Category[]> {
    return this.http
    // API might return either plain array OR object with { data: array }
      .get<Category[] | { data: Category[] }>(`${this.base}/categories`)
      // normalize the response → always return an array
      .pipe(map((res: any) => Array.isArray(res) ? res : res.data));
  }

  // Just an alias for all() – maybe used in components for readability
  getAll(): Observable<Category[]> {
    return this.all();
  }
}
