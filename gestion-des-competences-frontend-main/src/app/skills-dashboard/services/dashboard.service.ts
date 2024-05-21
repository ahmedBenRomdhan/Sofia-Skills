import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  URL = environment.apiUrl  + 'skillsEval';

  constructor(private http: HttpClient) {
  }

  getDashboardEvaluation(): any {
    return this.http.get(`${this.URL}/get-by-skills`);
  }

  applyFilter(skills: any, minLevel: any, users: any, departments: any, functions: any, categories: any,pertinent: any, state: any): any {
    const params = {skills, minLevel, users, departments, functions, categories, pertinent, state};

    return this.http.get(`${this.URL}/filter`, {
        params: params
      }
    );
  }

  downloadExcel(skills: any, minLevel: any, users: any, departments: any, functions: any, categories: any,pertinent: any, state: any): any {
    const params = {skills, minLevel, users, departments, functions, categories, pertinent, state};

    return this.http.get(`${this.URL}/filter`, {
        responseType: "blob",  
        params: params
      }
    );
  }
}
