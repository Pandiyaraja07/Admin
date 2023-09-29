import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalSkillMapComponent } from './functional-skill-map.component';

describe('FunctionalSkillMapComponent', () => {
  let component: FunctionalSkillMapComponent;
  let fixture: ComponentFixture<FunctionalSkillMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalSkillMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalSkillMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
