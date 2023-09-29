import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillMapComponent } from './add-skill-map.component';

describe('AddSkillMapComponent', () => {
  let component: AddSkillMapComponent;
  let fixture: ComponentFixture<AddSkillMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSkillMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
