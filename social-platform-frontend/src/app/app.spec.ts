import { TestBed } from '@angular/core/testing';
import App from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // since App is a standalone component we just import it directly
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    // simple smoke test, just check that the root App component is created
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    // render the component template and check if it shows the default title text
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();    // run change detection so template is updated
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, social-platform-frontend');
  });
});
