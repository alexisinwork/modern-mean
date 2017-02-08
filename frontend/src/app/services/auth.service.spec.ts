/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
// Always try to use Stub - mock on service in Unit tests
const authServiceStub = {
  isLoggedIn: function (user) {
    return user;
  },

  login(name, password) {
    if (!name && !password) {
      return { error: 'error' };
    } else {
      return { username: 'nice' };
    }
  },

  logout() {
    return { text: 'You are now logged out' };
  },

  register(user) {
    if (user.email === 'email') {
      return null;
    } else {
      return { email: user.email };
    }
  }
};

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        // Here you provide what should be used as a service
        { provide: AuthService, useValue: authServiceStub }
      ]
    });
  });

  it('should exist', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should have function', inject([AuthService], (service: AuthService) => {
    expect(typeof service.isLoggedIn).toEqual('function');
    expect(typeof service.login).toEqual('function');
    expect(typeof service.logout).toEqual('function');
    expect(typeof service.register).toEqual('function');
  }));

  it('should have proper isLoggedIn', inject([AuthService], (service: AuthService) => {
    expect(service.isLoggedIn({ username: 'mail' })).toEqual({ username: 'mail' });
  }));

  it('should have proper login', inject([AuthService], (service: AuthService) => {
    expect(service.login()).toEqual({ error: 'error' });
    expect(service.login('alex', 'pass')).toEqual({ username: 'nice' });
  }));

  it('should have proper logout', inject([AuthService], (service: AuthService) => {
    expect(service.logout()).toEqual({ text: 'You are now logged out' });
  }));

  it('should have proper register', inject([AuthService], (service: AuthService) => {
    expect(service.register({ email: 'email' })).toEqual(null);
    expect(service.register({ email: 'email2' })).toEqual({ email: 'email2' });
  }));
});
