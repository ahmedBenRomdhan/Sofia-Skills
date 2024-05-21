import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillEvaluationDetailsComponent } from './skill-evaluation-details.component';

describe('SkillEvaluationDetailsComponent', () => {
  let component: SkillEvaluationDetailsComponent;
  let fixture: ComponentFixture<SkillEvaluationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillEvaluationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillEvaluationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
