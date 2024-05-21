import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RoleService} from "../../roles/service/role.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Role} from "../../roles/models/Role";
import {DepartmentService} from "../services/department.service";

@Component({
  selector: 'app-edit-dapartment',
  templateUrl: './edit-dapartment.component.html',
  styleUrls: ['./edit-dapartment.component.scss']
})
export class EditDapartmentComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  msgs: any;
  constructor(private fb: FormBuilder, private router: Router,
              private departmentService: DepartmentService, public dialogRef: MatDialogRef<EditDapartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Role) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      description: [this.data.description],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const departmentUpdated = {
        id : this.data.id,
        name: this.form.value.name,
        description: this.form.value.description,
      };
      this.departmentService.updateDepartment(departmentUpdated).subscribe(data => {
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
