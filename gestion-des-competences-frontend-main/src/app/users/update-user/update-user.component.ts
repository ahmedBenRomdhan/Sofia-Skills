import {Component, Input, OnChanges, OnInit, Output, EventEmitter, Inject, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/User';
import {UserService} from '../services/user.service';
import {RoleService} from '../../roles/service/role.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FunctionService} from '../../functions/services/function.service';
import {DepartmentService} from '../../departments/services/department.service';

export const companies = [{
  id: 1,
  value: 'SofiaTech'
}, {
  id: 2,
  value: 'Sofia Europa'
}];

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})

export class UpdateUserComponent implements OnInit {


  public form: FormGroup = Object.create(null);
  public functions: any;
  public departments: any;
  public companies = companies;
  public roles: any;
  public msgs: any;

  constructor(private fb: FormBuilder, private userService: UserService,
              private roleService: RoleService,
              private functionService: FunctionService,
              private departmentService: DepartmentService,
              public dialogRef: MatDialogRef<UpdateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User) {
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
    this.functionService.getFunctions().subscribe(functions => {
      this.functions =  functions.filter((itemF: any)=>  itemF.enabled).filter((fun: any) => fun.DepartmentId === user.Department.id);

    });
    this.departmentService.getAllDepartments().subscribe(departments => {
      this.departments =  departments.filter((itemD: any)=>  itemD.enabled);
    });
  }

  ngOnInit(): void {
    const userCompany = companies.find(elt => elt.value === this.user.company);
    this.form = this.fb.group({
      email: [this.user.email, Validators.compose([Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      firstName: [this.user.firstName, Validators.compose([Validators.required])],
      lastName: [this.user.lastName, Validators.compose([Validators.required])],
      department: [this.user.Department.enabled ? this.user.Department : null , Validators.compose([Validators.required])],
      company: [userCompany, Validators.compose([Validators.required])],
      function: [this.user.Function.enabled ? this.user.Function : null, Validators.compose([Validators.required])],
      role: [this.user.Role, Validators.compose([Validators.required])],
    });

  }


  validateOnSubmit(form: any): void {
    Object.keys(form.controls).map(x => form.controls[x].markAsTouched({onlySelf: true}));
  }

  onSubmit(): void {
    if (this.form.valid) {
      const userEdited = {
        id: this.user.id,
        email: this.form.value.email,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        RoleId: this.form.value.role.id,
        company: this.form.value.company.value,
        FunctionId: this.form.value.function.id,
        DepartmentId: this.form.value.department.id,
      };
      this.userService.updateUser(userEdited).subscribe(data => {
        this.closeDialog(data.message);
      }, err => {
        this.msgs = [{severity: 'error', summary: 'Error', detail: err}];
      });
    } else {
      this.validateOnSubmit(this.form);
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'All fields are required'}];
    }
  }

  resetForm(): void {
    this.ngOnInit();
  }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }

  searchFunctions(event: any){
    
    this.functionService.getFunctions().subscribe(functions => {
      this.functions = functions.filter((fun: any) => fun.DepartmentId === event.value.id).filter((itemF: any)=>  itemF.enabled);
    });
  }
}
