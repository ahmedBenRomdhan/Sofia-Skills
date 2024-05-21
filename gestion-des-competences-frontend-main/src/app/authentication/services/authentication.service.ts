import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TokenService} from "../../shared/services/token.service";
import {environment} from "../../../environments/environment";

export interface SignInDTO {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  URL = environment.secureApiURL;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  login(user: SignInDTO): Observable<any> {
    return this.http.post(`${this.URL}/signin`, user);
  }

  resetPassword(userEmail: string): Observable<any> {
    const data = {
      email: userEmail
    };
    return this.http.put(`${this.URL}/resetPwd`, data);
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
 }
}
