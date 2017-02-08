// Login page to authenticate credentials and give access to app
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, EmitterService, UsersService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  email: string;
  lastName: string;
  firstName: string;
  error: string;
  isCheckingLogin = false;
  isLoggingOut = false;
  isRegistaringUser = false;
  isRegistrationClicked = false;

  constructor(private auth: AuthService, private emitter: EmitterService, private router: Router,
    private users: UsersService) {

  }
  // Check if username/password exist if no show error
  login(username, password) {
    this.error = !username || !password ? 'Provide not empty name and password' : '';
    if (!this.error) {
      this.isCheckingLogin = true;
      this.auth.login(this.username, this.password)
        .subscribe((user) => {
          this.isCheckingLogin = false;
          this.emitter.emitChangeEvent({
            text: 'You successfully login',
            classs: 'success'
          });
          this.users.setLocalUser(user);
          this.emitter.emitUserSetEvent(true);
          this.router.navigate(['/home']);
        }, (err) => {
          this.isCheckingLogin = false;
          this.emitter.emitChangeEvent({
            text: `You have error: ${err._body}`,
            classs: 'danger'
          });
        });
    } else {
      this.emitter.emitChangeEvent({ text: this.error, classs: 'danger' });
    }
  }

  logout() {
    this.username = '';
    this.password = '';
    this.isLoggingOut = true;
    this.auth.logout()
      .subscribe((res) => {
        this.emitter.emitChangeEvent({ text: res.text, classs: 'success' });
        this.isLoggingOut = false;
        this.router.navigate(['login']);
      }, (err) => {
        this.isLoggingOut = false;
        this.emitter.emitChangeEvent({ text: `You have error ${err._body}`, classs: 'danger' });
      });
  }
  // Needed to open/close registration form
  showRegistrationForm() {
    this.isRegistrationClicked = true;
  }

  register() {
    const userToAdd = {
      email: this.email,
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      role: 'user',
      todos: []
    };
    this.isRegistaringUser = true;
    this.auth.register(userToAdd)
      .subscribe((user) => {
        this.isRegistaringUser = false;
        if (!user) {
          this.emitter.emitChangeEvent({ text: `User with this email/username - existed!`, classs: 'danger' });
        } else {
          this.emitter.emitChangeEvent({ text: `User ${user.username} - added!`, classs: 'success' });
          this.login(user.username, user.password);
        }
      }, (err) => {
        this.isRegistaringUser = false;
        this.emitter.emitChangeEvent({ text: err.status, classs: 'danger' });
      });
  }

}
