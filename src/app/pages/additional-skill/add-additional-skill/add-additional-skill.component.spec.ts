import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdditionalSkillComponent } from './add-additional-skill.component';

describe('AddAdditionalSkillComponent', () => {
  let component: AddAdditionalSkillComponent;
  let fixture: ComponentFixture<AddAdditionalSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdditionalSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdditionalSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
