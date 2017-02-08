/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { routing } from '../../app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent, TitleComponent, TodoComponent, TodoDetailsComponent,
  LoginComponent, ProfileComponent, NotFoundComponent } from '../../components';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

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
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
      ],
      imports: [
        routing,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create not found component', () => {
    expect(component).toBeTruthy();
  });
});
