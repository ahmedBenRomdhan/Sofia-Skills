import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SkillFunctionService {

  URL = environment.apiUrl  +'functionSkill';
  constructor(private http: HttpClient) { }
  createSkillFun(skill: any): Observable<any> {
    return this.http.post(`${this.URL}/add`, skill);
  }

  getAllSkillFun() : Observable<any>{
    return this.http.get(`${this.URL}/get`);
  }

  updateSkillFun(data: any) : Observable<any>{
    return this.http.put(`${this.URL}/put`, data);
  }

  deleteSkillFun(data: any) : Observable<any> {
    return this.http.put(`${this.URL}/delete`, data);
  }
}