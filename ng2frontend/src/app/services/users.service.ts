import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  user;
  userReady;

  constructor(private http: Http) {

  }

  setLocalUser(user) {
    this.user = user;
    this.userReady = true;
  }

  getLocalUser() {
    return this.user;
  }

  changeUser(user) {
    return this.http.put(`/api/${user.username}`, user).map(res => res.json());
  }

  getAllUsers() {
    return this.http.get('/api/users').map(res => res.json());
  }

}
