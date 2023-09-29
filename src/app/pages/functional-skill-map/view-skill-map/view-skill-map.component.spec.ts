import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSkillMapComponent } from './view-skill-map.component';

describe('ViewSkillMapComponent', () => {
  let component: ViewSkillMapComponent;
  let fixture: ComponentFixture<ViewSkillMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSkillMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSkillMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
