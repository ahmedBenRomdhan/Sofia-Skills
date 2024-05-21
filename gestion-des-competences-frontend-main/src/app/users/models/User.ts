import {Role} from '../../roles/models/Role';

export class User {
  id?: string;
  email?: string  ;
  firstName?: string;
  lastName?: string;
  RoleId?: string;
  Role?: Role;
  company?: any;
  DepartmentId?: string;
  Department?: any;
  FunctionId?: string;
  Function?: any;
 constructor() {
   this.Role = new Role();
 }

}
