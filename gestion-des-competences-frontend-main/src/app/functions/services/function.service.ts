import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  URL = environment.apiUrl  +'functions';
  constructor(private http: HttpClient) { }
  createFunction(data: any): Observable<any> {
    return this.http.post(`${this.URL}/add`, data);
  }
  getFunctions(): Observable<any>{
    return this.http.get(`${this.URL}/get`);
  }
  getFunctionsIncludeDepartments(): Observable<any>{
    return this.http.get(`${this.URL}/getIncludeDep`);
  }
  updateFunction(data: any): Observable<any>{
    return this.http.put(`${this.URL}/update`, data);
  }
  uploadFunctions(file: any): Observable<any>{
    const formData = new FormData();

    formData.append('file', file);
    return this.http.post(`${this.URL}/upload-file`, formData);
  }
  deleteFunction(id: string): Observable<any>{
    return this.http.delete(`${this.URL}/delete/${id}`);
  }
  postFile(data: FormData): Observable<any>{
    return this.http.post(`${this.URL}/importFile`, data)
 }
}
