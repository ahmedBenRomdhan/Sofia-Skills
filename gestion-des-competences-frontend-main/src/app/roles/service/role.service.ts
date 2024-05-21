import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Role} from '../models/Role';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  URL = environment.apiUrl  + 'roles';
  constructor(private http: HttpClient) { }
  getRoles(): Observable<any>{
    return this.http.get(`${this.URL}`);
  }

  updateRole(role: Role): Observable<any>{
    return this.http.put(`${this.URL}`, role);
  }
  deleteRole(id: string): Observable<any>{
    return this.http.delete(`${this.URL}/${id}`);
  }
}
