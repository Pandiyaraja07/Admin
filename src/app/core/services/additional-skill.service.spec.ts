import { TestBed } from '@angular/core/testing';

import { AdditionalSkillService } from './additional-skill.service';

describe('AdditionalSkillService', () => {
  let service: AdditionalSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
