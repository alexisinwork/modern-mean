/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EmitterService, UsersService, AuthService } from '../../services';
import { routing } from '../../app.routing';

import { HeaderComponent, TitleComponent, TodoComponent, TodoDetailsComponent,
  LoginComponent, ProfileComponent, NotFoundComponent } from '../../components';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
        EmitterService,
        AuthService,
        UsersService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have working login', () => {
    component.login('', '');
    expect(component.error).toEqual('Provide not empty name and password');
    component.login('alex', 'password');
    expect(component.error).toEqual('');
  });

  it('should have working logout', () => {
    component.username = 'alex';
    component.password = 'password';
    component.logout();
    expect(component.username).toEqual('');
    expect(component.password).toEqual('');
  });

  it('should have working show registration', () => {
    component.showRegistrationForm();
    expect(component.isRegistrationClicked).toBeTruthy();
  });

  it('should have working show registration', () => {
    component.showRegistrationForm();
    expect(component.isRegistrationClicked).toBeTruthy();
  });
});
