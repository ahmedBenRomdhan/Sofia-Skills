import { TestBed } from '@angular/core/testing';

import { SkillsEvalService } from './skills-eval.service';

describe('SkillsEvalService', () => {
  let service: SkillsEvalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsEvalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
