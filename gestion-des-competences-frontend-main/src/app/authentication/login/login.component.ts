import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {TokenService} from '../../shared/services/token.service';
import {ActivatedRoute} from '@angular/router';

import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  public error = '';
  public email = null;
  public password = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService,
              private tokenService: TokenService, private activatedRoute: ActivatedRoute, private location: Location) {
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params) {
          this.email = params?.email;
          this.password = params?.password;
          this.location.replaceState('/login');
        }
      });


    this.form = this.fb.group({
      email: [this.email, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      password: [this.password, Validators.compose([Validators.required])]
    });
  }

  onSubmit(): void {
    const signInCredentials = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.login(signInCredentials).subscribe(result => {
      this.tokenService.saveToken(result.token);
      localStorage.setItem('firstName', result.firstName);
      localStorage.setItem('lastName', result.lastName);
      localStorage.setItem('function', result.function);
      localStorage.setItem('department', result.department);
      localStorage.setItem('departmentId', result.departmentId);
      localStorage.setItem('company', result.company);
      localStorage.setItem('role', result.role);
      localStorage.setItem('email', result.email);
      localStorage.setItem('id', result.id);
      this.router.navigate(['/users/profile']);
    }, er => {
     this.error = er;
    });
  }
}
