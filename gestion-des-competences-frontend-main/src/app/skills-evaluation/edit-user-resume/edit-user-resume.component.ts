import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ResumeService} from '../services/resume.service';
import 'rxjs/Rx' ;

@Component({
  selector: 'app-edit-user-resume',
  templateUrl: './edit-user-resume.component.html',
  styleUrls: ['./edit-user-resume.component.scss']
})
export class EditUserResumeComponent implements OnInit {

  public form: FormGroup = Object.create(null);
  public msgs: any;
  public currentDate = new Date();
  engResumeFileName: string | undefined;
  frResumeFileName: string | undefined;
  engResumeFile = null;
  connectedUserRole: any;
  frResumeFile = null;

  private fileTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  constructor(private fb: FormBuilder,
              private router: Router, public dialogRef: MatDialogRef<EditUserResumeComponent>,
              private resumeService: ResumeService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.connectedUserRole = localStorage.getItem('role');
  }

  availableDate = this.data.availableDate ? new Date(this.data.availableDate) : '';
  sofiaStartWorkDate = this.data.sofiaStartWorkDate ? new Date(this.data.sofiaStartWorkDate) : '';

  ngOnInit(): void {
    this.form = this.fb.group({
      experienceYears: [this.data.experienceYears?this.data.experienceYears:0],
      availableDate: [this.availableDate?this.availableDate:new Date()],
      sofiaStartWorkDate: [this.sofiaStartWorkDate?this.sofiaStartWorkDate:new Date()],
      pertinentSkill: [this.data.pertinentSkill?this.data.pertinentSkill:' '],
    });
    this.engResumeFileName = this.data.engResumeFileName?this.data.engResumeFileName:null ;
    this.frResumeFileName = this.data.frResumeFileName? this.data.frResumeFileName:null;
  }

   onSubmit(): void {
    this.resumeService.updateEngResume(this.data.id, this.engResumeFile).subscribe(() => {
      this.resumeService.updateFrResume(this.form.value, this.data.id, this.frResumeFile).subscribe(results => {
        if (results) {
          this.closeDialog(results);
        }
      });
    });
  }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }

  resetForm(): void {
    this.ngOnInit();
  }

  onUploadEngFile($event: Event): void {
    // @ts-ignore
    this.engResumeFile = $event.target.files[0];
    // @ts-ignore
    if (this.fileTypes.includes(this.engResumeFile.type)) {
      // @ts-ignore
      if (this.engResumeFile) {
        // @ts-ignore
        this.engResumeFileName = this.engResumeFile.name;
      }
    } else {
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'Only word file accepted'}];
    }
  }

  onUploadFrFile($event: Event): void {
    // @ts-ignore
    this.frResumeFile = $event.target.files[0];
    // @ts-ignore
    if (this.fileTypes.includes(this.frResumeFile.type)) {
      // @ts-ignore
      if (this.frResumeFile) {
        // @ts-ignore
        this.frResumeFileName = this.frResumeFile.name;
      }
    } else {
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'Only word file accepted'}];
    }
  }

}
