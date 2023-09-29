import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StrengthImprovementComponent } from './strength-improvement.component';

describe('StrengthImprovementComponent', () => {
  let component: StrengthImprovementComponent;
  let fixture: ComponentFixture<StrengthImprovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrengthImprovementComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthImprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
