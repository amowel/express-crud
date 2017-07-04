import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

@Injectable()
export class AuthService {
  public  token: string;
  constructor(private http: Http) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.token = user && user.token;
  }

  public login(email: string, password: string) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    console.log(email);
    return this.http.post(environment.apiUrl + 'login', JSON.stringify({ email , password }), options )
      .map((response) => {
        console.log(response);
        const token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          console.log(token);
          localStorage.setItem('user', JSON.stringify(response.json()));
          return true;
        }

        return false
      });

  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('user');
  }

}
