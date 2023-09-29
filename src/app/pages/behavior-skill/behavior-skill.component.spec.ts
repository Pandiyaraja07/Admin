import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BehaviorSkillComponent } from "./behavior-skill.component";

describe("EmpBehaviorSkillComponent", () => {
  let component: BehaviorSkillComponent;
  let fixture: ComponentFixture<BehaviorSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BehaviorSkillComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviorSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
