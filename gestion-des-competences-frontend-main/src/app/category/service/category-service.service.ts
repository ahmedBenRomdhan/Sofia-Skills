import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Category} from "../models/Category";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  URL = environment.apiUrl  +'categories';
  constructor(private http: HttpClient) { }
  createCategory(category: Category): Observable<any> {
    return this.http.post(`${this.URL}/addCat`, category);
  }
  getCategories(): Observable<any>{
    return this.http.get(`${this.URL}/getCat`);
  }
  getEnabledCategories(): Observable<any>{
    return this.http.get(`${this.URL}/getEnabledCat`);
  }
  updateCategory(category: Category): Observable<any>{
    return this.http.put(`${this.URL}/updateCat`, category);
  }
  deleteCategory(id: string): Observable<any>{
    return this.http.delete(`${this.URL}/${id}`);
  }
  uploadCategories(file: any): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.URL}/upload-file`, formData);
  }

  postFile(data: FormData): Observable<any>{
    return this.http.post(`${this.URL}/importFile`, data)
 }

}
