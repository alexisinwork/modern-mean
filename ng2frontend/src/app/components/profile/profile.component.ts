// Profile page showing you all your user info and ability to see other users info
import { Component, OnInit } from '@angular/core';

import { UsersService, EmitterService } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  subscription: any;
  user;
  users;
  error;
  newUser;
  email; password; firstName; lastName;

  isEmailChanging = false;
  isPassChanging = false;
  isNameChanging = false;
  isSurnameChanging = false;
  isSendingRequest = false;
  isSuccess = false;

  constructor(private usersService: UsersService) {
    this.getAllUsers();
  }

  changeEmail(fieldName, field) {
    if (this.isEmailChanging) {
      const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/;
      if (field && !field.match(emailRegExp)) {
        this.isSuccess = false;
        this.error = 'This doesn\'t look like real email or empty';
      } else {
        this.updateUser(fieldName, field);
        this.email = '';
      }
    }
    this.isEmailChanging = !this.isEmailChanging;
  }

  changePass(fieldName, field) {
    if (this.isPassChanging) {
      if (field && field.length < 6) {
        this.isSuccess = false;
        this.error = 'Password should have 6 or more symbols';
      } else {
        this.updateUser(fieldName, field);
        this.email = '';
      }
    }
    this.isPassChanging = !this.isPassChanging;
  }

  changeName(fieldName, field) {
    if (this.isNameChanging) {
      this.updateUser(fieldName, field);
      this.firstName = '';
    }
    this.isNameChanging = !this.isNameChanging;
  }

  changeSurname(fieldName, field) {
    if (this.isSurnameChanging) {
      this.updateUser(fieldName, field);
      this.lastName = '';
    }
    this.isSurnameChanging = !this.isSurnameChanging;
  }

  changeRole(fieldName, field) {
    this.updateUser(fieldName, field);
  }

  updateUser(fieldName, field) {
    if (field && fieldName) {
      this.newUser = this.user;
      this.newUser.changedField = {
        [fieldName]: field
      };
      this.isSendingRequest = true;
      this.usersService.changeUser(this.newUser).subscribe((user) => {
        if (user.error) {
          this.isSuccess = false;
          this.error = 'User with this email exist!';
          this.isSendingRequest = false;
        } else {
          this.error = false;
          this.isSuccess = true;
          this.user = user.user;
          this.isSendingRequest = false;
          const self = this;
          setTimeout(() => { self.isSuccess = false; }, 3000);
        }
      });
    } else {
      this.error = `Your ${fieldName} field is empty`;
    }
  }

  ngOnInit() {
    this.user = this.usersService.getLocalUser();
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
    });
  }

}
