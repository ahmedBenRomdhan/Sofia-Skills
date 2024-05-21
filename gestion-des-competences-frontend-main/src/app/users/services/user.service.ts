import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/User';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL =  environment.apiUrl  +'users';

  constructor(private http: HttpClient) {
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.URL}`, user);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.URL}`);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.URL}/byId/${id}`);
  }

  getUsersFullnames(): Observable<any> {
    return this.http.get(`${this.URL}/get-fullnames`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.URL}`, user);
  }

  uploadUsers(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('files', file[0]);
    // formData.append('files', file[1]);
    return this.http.post(`${this.URL}/upload-file`, formData);
  }

  disableUsers(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/disable/${id}`);
  }

  deleteUsers(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/delete/${id}`);
  }

  sendEmail(data: any) : Observable <any> {
    return this.http.post(`${this.URL}/send-submit-evaluations`, data);
  }

  postFile(data: FormData): Observable<any>{
     return this.http.post(`${this.URL}/importFile`, data)
  }

}
