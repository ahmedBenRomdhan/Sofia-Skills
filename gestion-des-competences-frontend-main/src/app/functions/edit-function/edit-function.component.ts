import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FunctionService} from '../services/function.service';
import {DepartmentService} from '../../departments/services/department.service';

@Component({
  selector: 'app-edit-function',
  templateUrl: './edit-function.component.html',
  styleUrls: ['./edit-function.component.scss']
})
export class EditFunctionComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  msgs: any;
  departments: any;
  constructor(private fb: FormBuilder, private router: Router,
              private departmentService: DepartmentService,
              private functionService: FunctionService,
              public dialogRef: MatDialogRef<EditFunctionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      department: [this.data.Department, Validators.compose([Validators.required])],
    });
    this.departmentService.getActivatedDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newFct = {
        id : this.data.id,
        name: this.form.value.name,
        DepartmentId: this.form.value.department.id,
      };
      this.functionService.updateFunction(newFct).subscribe(data => {
        this.closeDialog(data.success);
      });
    }else {
      this.validateOnSubmit(this.form);
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'All fields are required'}];
    }
  }
  cancel(): void{
    this.ngOnInit();
    this.dialogRef.close()
  }
  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
  validateOnSubmit(form: any): void {
    Object.keys(form.controls).map(x => form.controls[x].markAsTouched({ onlySelf: true }));
  }

}
