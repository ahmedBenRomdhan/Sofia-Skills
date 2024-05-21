import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../departments/services/department.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FunctionService} from "../services/function.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public form: FormGroup = Object.create(null);
  public msgs: any;
  departments: any;
  constructor(private fb: FormBuilder, private departmentService: DepartmentService,
              private router: Router,
              private functionService: FunctionService,
              public dialogRef: MatDialogRef<AddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {
  }


  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      department: [null, Validators.compose([Validators.required])],
    });
    this.departmentService.getActivatedDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newFunction = {
        name: this.form.value.name,
        DepartmentId: this.form.value.department.id,
      };
      this.functionService.createFunction(newFunction).subscribe(data => {
        this.closeDialog(data.success);
      }, er => {
        this.msgs = [{severity: 'error', summary: 'Error', detail: er}];

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

  validateOnSubmit(form: any): void {
    Object.keys(form.controls).map(x => form.controls[x].markAsTouched({onlySelf: true}));
  }

}
