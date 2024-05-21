import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsEvaluationTableComponent } from './skills-evaluation-table.component';

describe('SkillsEvaluationTableComponent', () => {
  let component: SkillsEvaluationTableComponent;
  let fixture: ComponentFixture<SkillsEvaluationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsEvaluationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsEvaluationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
