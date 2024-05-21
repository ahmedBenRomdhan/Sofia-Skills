import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {SkillsEvalService} from '../services/skills-eval.service';

@Component({
  selector: 'app-edit-skill-evaluation',
  templateUrl: './edit-skill-evaluation.component.html',
  styleUrls: ['./edit-skill-evaluation.component.scss']
})
export class EditSkillEvaluationComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  msgs: any;
  currentRate = 0;
  status: string[] = ['Not Evaluated', 'Evaluated', 'Valid' ];
  maxStar = 4;
  name: any;

  constructor(private fb: FormBuilder, private router: Router,
              public dialogRef: MatDialogRef<EditSkillEvaluationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private skillEvalService: SkillsEvalService,
              config: NgbRatingConfig) {
    config.max = 4;
  }

  ngOnInit(): void {
    this.name = this.data.Skill.name
    this.form = this.fb.group({
      evaluationEvidence: [this.data.evaluationEvidence, Validators.compose([Validators.required])],
      status: [this.data.status],
    });
    this.currentRate = this.data.level;
  }

  onRate($event: number): void {
    this.currentRate = $event;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newSkillEval = {
        id: this.data.id,
        level: this.currentRate,
        evaluationEvidence: this.form.value.evaluationEvidence,
        status: this.form.value.status,
        evaluatorId: localStorage.getItem('id')
      };
      this.skillEvalService.updateSkillEval(newSkillEval).subscribe(result => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
    } else {
      this.validateOnSubmit(this.form);
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'All fields are required'}];
    }
  }

  cancel(): void {
    this.ngOnInit();
    this.dialogRef.close()
  }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
    this.dialogRef.close()
  }

  validateOnSubmit(form: any): void {
    Object.keys(form.controls).map(x => form.controls[x].markAsTouched({onlySelf: true}));
  }
}
