import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  URL = environment.apiUrl  + 'functions';

  constructor(private http: HttpClient) {
  }

  getFunctions(): any {
    return this.http.get(`${this.URL}/get`);
  }
}
