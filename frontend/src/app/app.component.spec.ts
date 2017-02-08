/* tslint:disable:no-unused-variable */
// You need APP_BASE_HREF and TestBed for proper testing
import {APP_BASE_HREF} from '@angular/common';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent, TitleComponent, TodoComponent, TodoDetailsComponent,
  LoginComponent, ProfileComponent, NotFoundComponent } from './components';
import { TodoService, EmitterService, AuthService, LoggedInGuard, UsersService } from './services';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
// Setup component first time before each test case
describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        TitleComponent,
        TodoComponent,
        TodoDetailsComponent,
        LoginComponent,
        ProfileComponent,
        NotFoundComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        TodoService,
        EmitterService,
        AuthService,
        LoggedInGuard,
        UsersService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    // Create our component
    const fixture = TestBed.createComponent(AppComponent);
    // Grab instance of component
    const app = fixture.debugElement.componentInstance;
    // Check if component really created
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    // with detectChanges we update view after changes
    fixture.detectChanges();
    // nativeElement is our rendered component DOM structure
    const compiled = fixture.debugElement.nativeElement;
    // App header rendered correctly
    expect(compiled.querySelector('.navbar')).toBeTruthy();
    expect(compiled.querySelector('title')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  }));
});
