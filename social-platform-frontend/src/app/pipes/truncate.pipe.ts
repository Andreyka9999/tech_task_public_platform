import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',     // we can use this pipe in templates like {{ text | truncate }}
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  // value = original string
  // limit = max length before cutting (default 140 chars)
  // trail = what to append if text was cut (default is "…")

  transform(value: string | null | undefined, limit = 140, trail = '…'): string {
    if (!value) return '';    // if nothing passed, just return empty string
    // if text is longer than limit; cut it and add "…"
    return value.length > limit ? value.slice(0, limit) + trail : value;
  }
}
