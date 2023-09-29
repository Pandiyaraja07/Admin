import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobChatComponent } from './add-job-chat.component';

describe('AddJobChatComponent', () => {
  let component: AddJobChatComponent;
  let fixture: ComponentFixture<AddJobChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
