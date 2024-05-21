import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  URL = environment.apiUrl  + 'users';

  constructor(private http: HttpClient) {
  }

  updateFrResume(data: any, userId: string, file: any): Observable<any> {
    const formData = new FormData();

    formData.append('files', file);
    formData.append('experienceYears', data.experienceYears);
    formData.append('availableDate', data.availableDate);
    formData.append('sofiaStartWorkDate', data.sofiaStartWorkDate);
    formData.append('pertinentSkill', data.pertinentSkill);
    formData.append('id', userId);
    
    return this.http.put(`${this.URL}/update-fr-resume`, formData);
  }

  updateEngResume(userId: string, file: any): Observable<any> {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('id', userId);
    return this.http.put(`${this.URL}/update-eng-resume`, formData);
  }

  downloadFile(pathFile: any): Observable<any> {
    const params = {pathFile};
    return this.http.get(`${this.URL}/download`, {params, responseType: 'blob'});
  }
}
