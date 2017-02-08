// Real entry point of application with injecting ll dependencies and bootstrapping angular 2 application
// Import all necessary modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Import routes
import { routing } from './app.routing';
// Import App entry point
import { AppComponent } from './app.component';
// One place for importing all services
import { TodoService, EmitterService, AuthService, LoggedInGuard, UsersService } from './services';
// One place for importing components
import { TodoComponent, TodoDetailsComponent, LoginComponent, HeaderComponent,
  ProfileComponent, TitleComponent, NotFoundComponent } from './components';
// Main module
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoDetailsComponent,
    LoginComponent,
    HeaderComponent,
    ProfileComponent,
    TitleComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    TodoService,
    EmitterService,
    AuthService,
    UsersService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent] // Bootstrap with App component
})
export class AppModule { }
