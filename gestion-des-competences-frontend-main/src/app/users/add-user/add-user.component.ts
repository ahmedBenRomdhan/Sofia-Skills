import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {RoleService} from '../../roles/service/role.service';
import {FunctionService} from "../../functions/services/function.service";
import {DepartmentService} from "../../departments/services/department.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  public functions: any;
  public departments: any;
  public companies: any;
  public roles: any;
  public msgs: any;
  panelOpenState = false;

  constructor(private fb: FormBuilder, private userService: UserService,
              private router: Router,
              private functionService: FunctionService,
              private departmentService: DepartmentService,
              private roleService: RoleService,
              private _location: Location) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      department: ['', Validators.compose([Validators.required])],
      company: ['', Validators.compose([Validators.required])],
      function: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
    });
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
    
    this.departmentService.getActivatedDepartments().subscribe(departments => {
      this.departments = departments;
    });
    this.companies = [{
      id: 1,
      value: 'SofiaTech'
    }, {
      id: 2,
      value: 'Sofia Europa'
    }];
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newUser = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        RoleId: this.form.value.role,
        company: this.form.value.company,
        DepartmentId: this.form.value.department,
        FunctionId: this.form.value.function,
      };
      this.userService.createUser(newUser).subscribe(data => {
        this.router.navigate(['/users']);
      }, er => {
        this.msgs = [{severity: 'error', summary: 'Error', detail: er}];
      });
    } else {
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'All fields are required'}];
      this.validateOnSubmit(this.form);
    }
  }

  validateOnSubmit(form: any): void {
    Object.keys(form.controls).map(x => form.controls[x].markAsTouched({onlySelf: true}));
  }

  cancel(): void {
    //this.ngOnInit();
    this._location.back();
  }

  searchFunctions(event: any){
    this.functionService.getFunctions().subscribe(functions => {
      this.functions = functions.filter((fun: any) => fun.DepartmentId === event.value).filter((itemF: any)=>  itemF.enabled);
    });
  }
}
