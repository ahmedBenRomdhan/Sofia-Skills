import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../roles/service/role.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DepartmentService} from "../services/department.service";

@Component({
  selector: 'app-add-dapartment',
  templateUrl: './add-dapartment.component.html',
  styleUrls: ['./add-dapartment.component.scss']
})
export class AddDapartmentComponent implements OnInit {

  public form: FormGroup = Object.create(null);
  public msgs: any;

  constructor(private fb: FormBuilder, private departmentService: DepartmentService,
              private router: Router, public dialogRef: MatDialogRef<AddDapartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {
  }


  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      description: [null],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newDepartment = {
        name: this.form.value.name,
        description: this.form.value.description,
      };
      this.departmentService.createDepartment(newDepartment).subscribe(data => {
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
