import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';



@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  public errorMsg: string | undefined;
  public successMsg: string | undefined;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      ]
    });
  }

  onSubmit(): void {
    this.errorMsg = '';
    this.successMsg = '';
    const email = this.form.value.email;
    this.authService.resetPassword(email).subscribe(res => {
      this.successMsg = res.success;
    }, err => {
        this.errorMsg = err;
    });
  }
}
