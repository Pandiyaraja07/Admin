import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobChatComponent } from './job-chat.component';

describe('EmpJobChatComponent', () => {
  let component: JobChatComponent;
  let fixture: ComponentFixture<JobChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobChatComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
