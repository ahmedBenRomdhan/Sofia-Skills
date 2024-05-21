import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSkillEvaluationComponent } from './edit-skill-evaluation.component';

describe('EditSkillEvaluationComponent', () => {
  let component: EditSkillEvaluationComponent;
  let fixture: ComponentFixture<EditSkillEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSkillEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSkillEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
