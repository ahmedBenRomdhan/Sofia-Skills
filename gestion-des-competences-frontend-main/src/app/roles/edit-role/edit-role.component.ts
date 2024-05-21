import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Role} from '../models/Role';
import {RoleService} from '../service/role.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  msgs: any;
  connectedUserRole: any;
  constructor(private fb: FormBuilder, private router: Router,
              private roleService: RoleService, public dialogRef: MatDialogRef<EditRoleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Role) { }
  ngOnInit(): void {
    this.connectedUserRole = localStorage.getItem('role');
    this.form = this.fb.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      description: [this.data.description],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
    const newRole = {
      id : this.data.id,
      name: this.form.value.name.toUpperCase(),
      description: this.form.value.description,
    };
    this.roleService.updateRole(newRole).subscribe(data => {
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
