import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TodoService, EmitterService, UsersService } from '../../services';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnDestroy {
  sub;
  currentAction;
  error: string;
  isActionLoading: boolean;
  isActionUpdated: boolean;
  isActionDeleted: boolean;
  currentCompleteness: string;
  username;


  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router,
              private emitter: EmitterService, private usersService: UsersService) {
    this.isActionLoading = true;
    this.sub = this.route.params.subscribe(params => {
      this.username = params;
      const currentUser = this.usersService.getLocalUser().username;
      if (this.username['user'] !== currentUser) {
        this.router.navigate(['/home']);
      }
      this.todoService.findTodo(this.username.user, +params['id'])
        .subscribe((action) => {
          this.currentAction = action;
          const info = { text: `Your todo ${this.currentAction.text} - successfully loaded!`, classs: 'info' };
          this.emitter.emitChangeEvent(info);
          this.currentCompleteness = action.isCompleted ? 'Done' : 'Not done';
          this.isActionLoading = false;
        }, (err) => {
          this.error = err;
          this.isActionLoading = false;
        }, () => {
          console.log('Todo finded!');
        });
    });
  }

  addComment(comment) {
    this.currentAction.description = comment;
    this.isActionUpdated = true;
    this.todoService.updateTodo(this.username.user, this.currentAction)
      .subscribe((todo) => {
        console.log(todo);
        const info = { text: `Your comment for todo ${this.currentAction.text} - successfully changed!`, classs: 'warning' };
        this.emitter.emitChangeEvent(info);
        this.currentCompleteness = this.currentAction.isCompleted ? 'Done' : 'Not done';
        this.isActionUpdated = false;
      }, (err) => {
        this.error = err;
        this.isActionUpdated = false;
      }, () => {
        console.log('Todo updated');
      });

  }

  changeToDone() {
    this.currentAction.isCompleted = true;
    this.isActionUpdated = true;
    this.todoService.updateTodo(this.username.user, this.currentAction)
      .subscribe(() => {
        const info = { text: `You complete your todo ${this.currentAction.text}!`, classs: 'success' };
        this.emitter.emitChangeEvent(info);
        this.currentCompleteness = this.currentAction.isCompleted ? 'Done' : 'Not done';
        this.isActionUpdated = false;
        this.router.navigate([`${this.username.user}/todos`]);
      }, (err) => {
        this.error = err;
        this.isActionUpdated = false;
      }, () => {
        console.log('Todo updated');
      });
  }

  deleteAction() {
    this.isActionDeleted = true;
    this.todoService.deleteTodo(this.username.user, this.currentAction)
      .subscribe(() => {
        const info = { text: `Your todo ${this.currentAction.text} - successfully deleted!`, classs: 'danger' };
        this.emitter.emitChangeEvent(info);
        this.isActionDeleted = false;
        this.router.navigate([`${this.username.user}/todos`]);
      }, (err) => {
        this.error = err;
        this.isActionDeleted = false;
      }, () => {
        console.log('Todo deleted');
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
