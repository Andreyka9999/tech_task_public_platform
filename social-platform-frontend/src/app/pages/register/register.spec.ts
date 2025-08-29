import { ComponentFixture, TestBed } from '@angular/core/testing';
import RegisterComponent from './register';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Connect the standalone component via imports
      imports: [RegisterComponent],
    }).compileComponents();

    // create a test instance of the component
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();      // run initial change detection so template is ready
  });

  it('should create', () => {
    // basic smoke test, check that component is created
    expect(component).toBeTruthy();
  });
});
