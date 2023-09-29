import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalSkillComponent } from './technical-skill.component';

describe('EmpTechnicalSkillComponent', () => {
  let component: TechnicalSkillComponent;
  let fixture: ComponentFixture<TechnicalSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnicalSkillComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
