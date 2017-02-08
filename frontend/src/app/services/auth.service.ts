// Angular 2 uses Observables for async operations
// Injectable give class ability to be injected in module and use in all components
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// Decorate our class with Injectable
@Injectable()
export class AuthService {
  // In constructor we inject http service
  constructor(private http: Http) {

  }
  // After sending a request we map result for easier subscribing later on
  isLoggedIn() {
    return this.http.get('/api/loggedin').map((res) => res.json());
  }

  login(name, password) {
    return this.http.post('/api/login', { username: name, password: password })
      .map((res) => res.json());
  }

  logout() {
    return this.http.get('/api/logout')
      .map((res) => res.json());
  }

  register(user) {
    return this.http.post('/api/register', user)
      .map((res) => res.json());
  }

}
