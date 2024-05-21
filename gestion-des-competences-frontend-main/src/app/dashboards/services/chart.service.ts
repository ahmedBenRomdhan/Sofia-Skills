import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  URL = environment.apiUrl  + 'skillsEval';

  constructor(private http: HttpClient) {
  }

  getHistogramChartValues(): Observable<any> {
    return this.http.get(`${this.URL}/report`);
  }

  getReportingAccordingTime() : Observable <any> {
    return this.http.get(`${this.URL}/reportTime`);
  }

  getReportingRadar() : Observable <any> {
    return this.http.get(`${this.URL}/reportRadar`);
  }

  applyFilter(skills: any, userId: any, department: any, cat: any, pertinent: any, fun: any): Observable<any> {
    const params = {skills, userId, department, cat, pertinent, fun};
    return this.http.get(`${this.URL}/report`, {params});
  }

  applyFilterTime(skills: any, userId: any, DepartmentId: any, CategoryId: any, pertinent: any, FunctionId: any): Observable<any> {
    const params = {skills, userId, DepartmentId, CategoryId, pertinent, FunctionId};
    return this.http.get(`${this.URL}/reportTime`, {params});
  }

  applyFilterRadar(skills: any, userId: any, DepartmentId: any, CategoryId: any, pertinent: any, FunctionId: any, yearId: any): Observable<any> {
    const params = {skills, userId, DepartmentId, CategoryId, pertinent, FunctionId, yearId};
    return this.http.get(`${this.URL}/reportRadar`, {params});
  }
}
