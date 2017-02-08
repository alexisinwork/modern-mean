/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersService } from './users.service';

const userServiceServiceStub = {
  user: {},
  userReady: false,

  setLocalUser(user) {
    this.user = user;
    this.userReady = true;
  },

  getLocalUser() {
    return this.user;
  },

  changeUser(user) {
    if (!user) {
      return { 'error': 'Invalid Data' };
    } else {
      if (user.email === 'email') {
        return { error: 'User with this email exist!' };
      } else {
        return { email: user.email };
      }
    }
  },

  getAllUsers() {
    return [{ username: 'alex' }, { username: 'user' }];
  }
};

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UsersService, useValue: userServiceServiceStub }
      ]
    });
  });

  it('should exist', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  it('should have needed functions', inject([UsersService], (service: UsersService) => {
    expect(typeof service.setLocalUser).toEqual('function');
    expect(typeof service.getLocalUser).toEqual('function');
    expect(typeof service.changeUser).toEqual('function');
    expect(typeof service.getAllUsers).toEqual('function');
  }));

  it('should have needed setLocalUser', inject([UsersService], (service: UsersService) => {
    service.setLocalUser({ username: 'alex' });
    expect(service.user).toEqual({ username: 'alex' });
    expect(service.userReady).toBeTruthy();
  }));

  it('should have needed getLocalUser', inject([UsersService], (service: UsersService) => {
    service.setLocalUser({ username: 'alex' });
    expect(service.getLocalUser()).toEqual({ username: 'alex' });
  }));

  it('should have needed changeUser', inject([UsersService], (service: UsersService) => {
    expect(service.changeUser()).toEqual({ 'error': 'Invalid Data' });
    expect(service.changeUser({ email: 'email' })).toEqual({ error: 'User with this email exist!' });
    expect(service.changeUser({ email: 'email2' })).toEqual({ email: 'email2' });
  }));

  it('should have needed getAllUsers', inject([UsersService], (service: UsersService) => {
    expect(service.getAllUsers()).toEqual([{ username: 'alex' }, { username: 'user' }]);
  }));
});
