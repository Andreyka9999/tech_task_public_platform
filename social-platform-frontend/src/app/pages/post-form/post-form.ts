

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/post.service';
import { CategoriesService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form.html',
  styleUrls: ['./post-form.css'],
})
export default class PostFormComponent {
  // using Angular's inject() instead of constructor DI, looks cleaner
  private fb = inject(FormBuilder);
  private postsApi = inject(PostsService);
  private catsApi = inject(CategoriesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // main reactive form with 3 fields
  form = this.fb.group({
    title: ['', Validators.required],     // title is mandatory
    content: ['', Validators.required],   // content is also mandatory
    // FormControl<number[]>
    categories: this.fb.control<number[]>([]),  // will hold selected category IDs
  });

  categories: Category[] = [];            // loaded from backend (for checkboxes)
  loading = false;                        // used to show spinner / disable button
  id?: number;                            // if set → we’re editing an existing post

  error: string | null = null;            // simple error holder to show in template


  ngOnInit() {
    // load all available categories when component starts
    this.catsApi.all().subscribe({ next: (cats) => (this.categories = cats) });

    // check if we have "id" param → edit mode
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.id = id;
      this.loading = true;
      // fetch existing post data and prefill the form
      this.postsApi.getOne(id).subscribe({
        next: (p: Post) => {
          this.form.patchValue({
            title: p.title,
            content: p.content,
            // only keep category IDs, not full objects
            categories: (p.categories || []).map((c) => c.id),
          });
          this.loading = false;
        },
        error: () => (this.loading = false),      // stop loading if request fails
      });
    }
  }

  /** Adds/removes category IDs in the categories control (number[] array) */
  toggleCat(catId: number, checked: boolean) {
    const ctrl = this.form.controls.categories;
    const current = ctrl.value ?? [];

    if (checked) {
      // only push if not already in the list
      if (!current.includes(catId)) {
        ctrl.setValue([...current, catId]);
      }
    } else {
      // remove the id if unchecked
      ctrl.setValue(current.filter((x) => x !== catId));
    }
    ctrl.updateValueAndValidity({ onlySelf: true });
  }

  submit() {
    // block if form is invalid or already saving
    if (this.form.invalid || this.loading) return;
    this.loading = true;
    this.error = null; 

    // build a clean payload (only fields we need)
    const payload = this.form.value as { title: string; content: string; categories: number[] };

    // decide whether to create a new post or update existing one
    const req = this.id
      ? this.postsApi.update(this.id, payload)
      : this.postsApi.create(payload);

    // subscribe to handle success / error
    req.subscribe({
      next: () => {
        this.loading = false;
        // redirect back to homepage after success
        this.router.navigateByUrl('/');
      },
      error: (e) => {
        
        this.loading = false;
        // show backend message if exists, otherwise fallback to generic text
        this.error =
          e?.error?.message ||
          (e?.error?.errors ? JSON.stringify(e.error.errors) : 'Save failed');

      },
    });
  }
}
