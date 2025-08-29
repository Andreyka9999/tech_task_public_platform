import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="flex items-center justify-center py-6">
      <div class="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-transparent"></div>
    </div>
  `
})
export default class SpinnerComponent {}
