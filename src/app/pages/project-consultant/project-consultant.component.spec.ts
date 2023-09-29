import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectConsultantComponent } from './project-consultant.component';

describe('ProjectConsultantComponent', () => {
  let component: ProjectConsultantComponent;
  let fixture: ComponentFixture<ProjectConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectConsultantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
