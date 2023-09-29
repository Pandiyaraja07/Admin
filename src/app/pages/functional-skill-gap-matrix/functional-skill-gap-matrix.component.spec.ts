import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalSkillGapMatrixComponent } from './functional-skill-gap-matrix.component';

describe('FunctionalSkillGapMatrixComponent', () => {
  let component: FunctionalSkillGapMatrixComponent;
  let fixture: ComponentFixture<FunctionalSkillGapMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalSkillGapMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalSkillGapMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
