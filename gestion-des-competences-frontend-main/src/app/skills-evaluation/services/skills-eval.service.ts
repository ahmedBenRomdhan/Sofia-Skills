import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SkillsEvalService {
  URL = environment.apiUrl  + 'skillsEval';
  constructor(private http: HttpClient) {
  }

  createSkillEval(skillEval: any): Observable<any> {
    return this.http.post(`${this.URL}`, skillEval);
  }

  getSkillEvaluationsByUser(userId: any): Observable<any> {
    return this.http.get(`${this.URL}/get-by-user-id/${userId}`);
  }

  getUsersWithSkillEval(): Observable<any> {
    return this.http.get(environment.apiUrl  +'users/skillEval');
  }

  validateSkillEvaluations(ids: any): Observable<any> {
    return this.http.patch(`${this.URL}/validate-eval`, ids);
  }

  updateSkillEval(skillEval: any): Observable<any> {
    return this.http.put(`${this.URL}`, skillEval);
  }

  updateSkillAffect(skillEval: any): Observable<any> {
    return this.http.put(`${this.URL}/affected`, skillEval);
  }
}
