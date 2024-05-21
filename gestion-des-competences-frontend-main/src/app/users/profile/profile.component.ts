import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: any;
  loading = true;
  user = new User();
  firstName: any;
  lastName: any;
  function: any;
  department: any;
  company: any;
  role: any;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.function = localStorage.getItem('function');
    this.department = localStorage.getItem('department');
    this.company = localStorage.getItem('company');
    this.role = localStorage.getItem('role');
    this.loading = true;
  }

}
