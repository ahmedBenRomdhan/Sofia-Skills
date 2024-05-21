import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "../../shared/services/token.service";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  URL = environment.apiUrl  + 'skills';

  constructor(private http: HttpClient) {
  }

  getSkills(): Observable<any> {
    return this.http.get(`${this.URL}/get`);
  }
  getAllSkills(): Observable<any> {
    return this.http.get(`${this.URL}/gets`);
  }

  getSkillsNames(): Observable<any> {
    return this.http.get(`${this.URL}/get-names`);
  }

  getSkillsByIds(skills: any): Observable<any> {
    return this.http.get(`${this.URL}/get-by-ids/${skills}`);
  }

  getSkillsByIdsCategory(categories: any): Observable<any> {
    return this.http.get(`${this.URL}/category/${categories}`);
  }

  getSkillsByIdsCategoryAndSkills(skills: any, categories:any): Observable<any> {
    const params = {skills, categories}
    return this.http.get(`${this.URL}/both/`,{
      params
    });
  }
}
