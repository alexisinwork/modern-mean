/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EmitterService, UsersService, AuthService } from '../../services';
import { routing } from '../../app.routing';

import { HeaderComponent, TitleComponent, TodoComponent, TodoDetailsComponent,
  LoginComponent, ProfileComponent, NotFoundComponent } from '../../components';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

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
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
