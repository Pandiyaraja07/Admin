import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalSkillComponent } from './additional-skill.component';

describe('EmpAdditionalSkillComponent', () => {
  let component: AdditionalSkillComponent;
  let fixture: ComponentFixture<AdditionalSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalSkillComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
