import { Component, OnInit } from '@angular/core';
import { EmitterService, UsersService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  title = 'Todo List';
  subscription: any;
  userSub: any;
  user;
  isHome = false;
  elemClass = 'alert-info';
  infoTodo: { text: string, classs: string };

  constructor(private emitter: EmitterService, private users: UsersService,
              private route: ActivatedRoute, private router: Router) {
    this.infoTodo = { text: 'Here you will receive different information alerts', classs: 'info' };
    this.isHome = this.router.url === '/home';
  }

  ngOnInit() {
    this.subscription = this.emitter.getChangeEmitter()
      .subscribe((info) => {
        this.infoTodo = info;
        this.elemClass = this.infoTodo.classs === 'warning' ? 'alert-warning'
          : this.infoTodo.classs === 'info' ? 'alert-info'
          : this.infoTodo.classs === 'danger' ? 'alert-danger' : 'alert-success';
      });
    this.user = this.users.getLocalUser();
  }

  navigateToPage(page) {
    if (page === 'profile') {
      this.router.navigate(['profile', this.user.username]);
    } else {
      this.router.navigate([this.user.username, 'todos']);
    }
  }
}
