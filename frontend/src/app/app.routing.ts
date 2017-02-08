// Routing file for Angular 2 App
import { Routes, RouterModule } from '@angular/router';
// One place for importing all components
import { TodoComponent, TodoDetailsComponent, LoginComponent, ProfileComponent,
  TitleComponent, NotFoundComponent } from './components';
// One place for all services
import { LoggedInGuard } from './services';
// All routes with path, component and guard protection
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: TitleComponent, canActivate: [LoggedInGuard] },
  { path: ':user/todos', component: TodoComponent, canActivate: [LoggedInGuard] },
  { path: ':user/todo/:id', component: TodoDetailsComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:user', component: ProfileComponent, canActivate: [LoggedInGuard] },
  { path: '**', component: NotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);
