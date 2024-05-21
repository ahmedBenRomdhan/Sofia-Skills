import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-skill-evaluation-details',
  templateUrl: './skill-evaluation-details.component.html',
  styleUrls: ['./skill-evaluation-details.component.scss']
})
export class SkillEvaluationDetailsComponent implements OnInit {
  maxStar = 4;
  evaluator: any;
  evaluationDate: any;

  constructor(public dialogRef: MatDialogRef<SkillEvaluationDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public skillEvaluation: any) {
  }

  ngOnInit(): void {
    if (this.skillEvaluation.status !== 'Not Evaluated' && this.skillEvaluation.evaluator) {
      this.evaluator = this.skillEvaluation.evaluator.firstName + ' ' + this.skillEvaluation.evaluator.lastName;
      this.evaluationDate = this.skillEvaluation.updatedAt;
    } else {
      this.evaluationDate = '';
      this.evaluator = '';
    }

  }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
}
