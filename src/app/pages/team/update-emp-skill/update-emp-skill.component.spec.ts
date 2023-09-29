import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmpSkillComponent } from './update-emp-skill.component';

describe('UpdateEmpSkillComponent', () => {
  let component: UpdateEmpSkillComponent;
  let fixture: ComponentFixture<UpdateEmpSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmpSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmpSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
