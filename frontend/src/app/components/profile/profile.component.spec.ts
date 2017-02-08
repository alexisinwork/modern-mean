/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject , fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { EmitterService, UsersService } from '../../services';

import { routing } from '../../app.routing';

import { HeaderComponent, TitleComponent, TodoComponent, TodoDetailsComponent,
  LoginComponent, ProfileComponent, NotFoundComponent } from '../../components';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        TitleComponent,
        TodoComponent,
        TodoDetailsComponent,
        LoginComponent,
        ProfileComponent,
        NotFoundComponent
      ],
      imports: [
        HttpModule,
        FormsModule,
        routing
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        {
          provide: Http,
          useFactory: (mockBackend, options) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        EmitterService,
        UsersService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Profile component', () => {
    expect(component).toBeTruthy();
  });

  it('should get all users', fakeAsync(inject([UsersService, MockBackend], (usersService, mockBackend) => {
    const mockResponse = [{ id: 0, username: 'alex' }, { id: 1, username: 'user' }];
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });
    usersService.getAllUsers();
    tick();
    expect(component.users).toBe(mockResponse.data);
  })));

  it('should update user', fakeAsync(inject([UsersService, MockBackend], (usersService, mockBackend) => {
    const mockResponse;
    let fieldName = 'alex2@gmail.com';
    mockResponse = { user: { email: fieldName } };

    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    component.user = { email: 'alex@gmail.com' };
    component.updateUser('email', fieldName);
    tick(10000);    // 10s just to prevent timer error
    expect(component.error).toBeFalsy();
    expect(component.user).toEqual({ email: 'alex2@gmail.com' });

    fieldName = 'alex@gmail.com';
    mockResponse = { error: 'User with this email exist!' };
    component.updateUser('email', fieldName);
    tick(10000);    // 10s just to prevent timer error
    expect(component.error).toEqual('User with this email exist!');

    fieldName = '';
    mockResponse = { error: 'Your email field is empty' };
    component.updateUser('email', fieldName);
    tick(10000);    // 10s just to prevent timer error
    expect(component.error).toEqual('Your email field is empty');
  })));
});
