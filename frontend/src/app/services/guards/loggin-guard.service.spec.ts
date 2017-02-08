/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogginGuardService } from './loggin-guard.service';
import { UserService } from '../users.service';

const userServiceStub = {
  canActivate(result) {
    return result;
  }
};

describe('LogginGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceStub }
      ]
    });
  });

  it('should exist', inject([LogginGuardService], (service: LogginGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should have canActivate method', inject([LogginGuardService], (service: LogginGuardService) => {
    expect(typeof service.canActivate).toEqual('function');
  }));

  it('should return true/false', inject([LogginGuardService], (service: LogginGuardService) => {
    expect(service.canActivate(true)).toBeTruthy();
    expect(service.canActivate(false)).toBeFalsy();
  }));
});
