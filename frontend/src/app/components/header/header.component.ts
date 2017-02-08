// Header component needed to login from every place of app
// Show username and profile icon
import { Component, OnInit } from '@angular/core';

import { UsersService, EmitterService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user;
  subscription: any;

  constructor(private users: UsersService, private emitter: EmitterService) {

  }
  // We will get local user to show his name in header
  ngOnInit() {
    this.subscription = this.emitter.getUserSetEmitter()
      .subscribe(() => {
        this.user = this.users.getLocalUser();
      });
  }

}
