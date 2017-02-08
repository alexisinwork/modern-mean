/* tslint:disable:no-unused-variable */
import {APP_BASE_HREF} from '@angular/common';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { EmitterService, UsersService } from '../../services';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from '../../app.routing';

import { HeaderComponent, TitleComponent, TodoComponent, TodoDetailsComponent,
  LoginComponent, ProfileComponent, NotFoundComponent } from '../../components';

const emitterStub = {
  getUserSetEmitter() {
    return;
  }
};

const usersStub = {
  user: {},
  getAllUsers() {
    return [];
  },
  getLocalUser() {
    return this.user;
  },
  setLocalUser(user) {
    this.user = user;
  }
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let el: HTMLElement;

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
        FormsModule,
        HttpModule,
        routing
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        EmitterService,
        UsersService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigation bar', () => {
    de = fixture.debugElement.query(By.css('.navbar'));
    el = de.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should have no profile if no user', () => {
    de = fixture.debugElement.query(By.css('.profile'));
    expect(de).toBeFalsy();
  });

  it('should have profile if user exist', () => {
    usersStub.setLocalUser({ username: 'alex' });
    component.user = usersStub.getLocalUser();
    expect(component.user.username).toEqual('alex');
  });
});
