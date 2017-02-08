import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TodoService, EmitterService, UsersService } from '../../services';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  action: {
    id: number,
    text: string,
    isCompleted: boolean,
    description: string
  };
  id: number;
  text: string;
  existingIds: Array<any>;

  actions;
  isActionsLoading: boolean;
  isActionSaved: boolean;

  error: string;
  isActionUpdated: boolean;
  isActionDeleted: boolean;
  currentCompleteness: string;

  username;

  constructor(private todoService: TodoService, private emitter: EmitterService,
    private router: Router, private route: ActivatedRoute, private usersService: UsersService) {
    this.id = 0;
    this.action = { id: this.id, text: '', isCompleted: false, description: '' };
    this.route.params.subscribe((val) => {
      const currentUser = this.usersService.getLocalUser().username;
      if (val['user'] !== currentUser) {
        this.router.navigate(['/home']);
      }
      this.username = val;
      this.getTodos();
    });
  }

  getTodos() {
    this.isActionsLoading = true;
    this.todoService.getTodos(this.username.user)
      .subscribe((actions) => {
        this.actions = actions;
        this.isActionsLoading = false;
      }, (err) => {
        this.error = err;
        this.isActionsLoading = false;
      }, () => {
        console.log('Todos loaded');
      });
  }

  addAction() {
    if (this.text) {
      // Take the biggest to prevent similar ids
      this.actions.forEach((val) => {
        this.id = val.id > this.id ? val.id + 1 : this.id;
      });
      this.action = { id: ++this.id, text: this.text, isCompleted: false, description: 'Here will be your description' };
      this.isActionSaved = false;
      this.todoService.addTodo(this.username.user, this.action)
        .subscribe(() => {
          const info = { text: `Your todo ${this.action.text} - successfully added!`, classs: 'success' };
          this.emitter.emitChangeEvent(info);
          this.isActionSaved = false;
          this.getTodos();
        }, (err) => {
          this.error = err;
          this.isActionSaved = false;
        }, () => {
          console.log('Todo added');
        });
    }
    this.text = '';
  }

  onCheckChanged(action) {
    this.isActionUpdated = true;
    this.todoService.updateTodo(this.username.user, action)
      .subscribe((actionNew) => {
        const info = { text: `Your todo ${this.action.text} - successfully changed!`, classs: 'warning' };
        this.emitter.emitChangeEvent(info);
        this.currentCompleteness = this.action.isCompleted ? 'Done' : 'Not done';
        this.isActionUpdated = false;
        this.getTodos();
      }, (err) => {
        this.error = err;
        this.isActionUpdated = false;
      }, () => {
        console.log('Todo updated');
      });
  }

  deleteAction(action) {
    this.isActionDeleted = true;
    this.todoService.deleteTodo(this.username.user, action)
      .subscribe(() => {
        const info = { text: `Your todo ${this.action.text} - successfully added!`, classs: 'danger' };
        this.emitter.emitChangeEvent(info);
        this.isActionDeleted = false;
        this.getTodos();
      }, (err) => {
        this.error = err;
        this.isActionDeleted = false;
      }, () => {
        console.log('Todo deleted');
      });
  }

  onEnter(e) {
    if (e.code === 'Enter') {
      this.addAction();
    }
  }

  navigate(id) {
    const user = this.username.user;
    this.router.navigate([`${user}/todo/${id}`]);
  }

}
