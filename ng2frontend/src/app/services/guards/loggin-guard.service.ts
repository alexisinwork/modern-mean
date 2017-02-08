// Guards used for checking if angular 2 can activate route or not
// Guards should always return true or false
// Here you will see how to create async guards to protect your routes
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { EmitterService } from '../emitter.service';
import { UsersService } from '../users.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  result: boolean;

  constructor(private auth: AuthService, private router: Router, private emitter: EmitterService,
    private users: UsersService) {}
  // This is only one method that checks if route should be started or not
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.isLoggedIn()
      .map((user) => {
        const result = user !== 0 ? true : false;
        if (!result) {
          // Emit about changes
          this.emitter.emitChangeEvent({
            text: 'You are not logged into app',
            classs: 'warning'
          });
          // Navigate to login page
          this.router.navigate(['login']);
        }
        this.users.setLocalUser(user);
        // Another emitting
        this.emitter.emitUserSetEvent(true);
        return result;
      }, (err) => {
        this.emitter.emitChangeEvent({
          text: `You have error: ${err.status}`
        });
        return false;
      });
  }
}
