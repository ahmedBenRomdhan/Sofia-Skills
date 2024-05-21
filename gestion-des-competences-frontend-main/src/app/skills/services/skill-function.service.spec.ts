import { TestBed } from '@angular/core/testing';

import { SkillFunctionService } from './skill-function.service';

describe('SkillFunctionService', () => {
  let service: SkillFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
