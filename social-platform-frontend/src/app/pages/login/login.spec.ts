/**
 * Purpose: Basic unit test for LoginComponent.
 * Note: right now we only check if the component is created.
 */


import { ComponentFixture, TestBed } from '@angular/core/testing';
import LoginComponent from './login';

// Test block for LoginComponent
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    // setup Angular test module with our component
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();

    // create component instance
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();      // trigger initial data binding
  });

  it('should create', () => {
    // simple check: component is initialized
    expect(component).toBeTruthy();
  });
});
