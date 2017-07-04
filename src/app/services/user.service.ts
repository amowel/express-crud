import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service'
@Injectable()
export class UserService {
  private url = environment.apiUrl;
  users: User[] = [];
  constructor(private http: Http, private  auth: AuthService) {
  }
  getUsers() {

    const headers = new Headers({'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});
    console.log(options);
    console.log('Bearer ' + this.auth.token);
    return this.http.get(this.url + 'users/', options)
      .map(response => response.json());
  }

  addUser(user: User) {

    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.url + 'users/', JSON.stringify(user), options)
      .map((response) => {
        response.json();
        console.log(response.json());
      });
  }

  editUser(user: User) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});
    return this.http.put(this.url + 'users/' + user._id, JSON.stringify(user), options)
      .map((response) => {
        response.json();
        console.log(response.json());
      })
  }

  deleteUser(user: User) {
    console.log(user);
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});
    return this.http.delete(this.url + 'users/' + user._id, options)
      .map((response) => {
        response.json();
        console.log(response.json());
      })
  }

  getUsersByPosition(from: number, to: number) {
    if(!this.auth.token)
      this.auth.token = JSON.parse(localStorage.getItem('user')).token;
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.url + `users/${from}-${to}`, options)
      .map(response => {
        return response.json()
      });
  }

  getUsersCount() {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.url + 'users/count', options)
      .map(response => {
          response.json();
          console.log(response.json());
        }
      );
  }

  getSearched(value) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.token});
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.url + 'users/search?value=' + value, options)
      .map(response => response.json())
  }
}
