/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoServiceService } from './todo-service.service';
// Do not forget always use stubs
const todoServiceServiceStub = {
  getTodos(username) {
    if (username === 'alex') {
      return 'Error - No such user!';
    } else {
      return { text: 'one' };
    }
  },

  addTodo(username, action) {
    if (username && action) {
      return { text: 'todo' };
    } else {
      return { error: 'Invalid Data' };
    }
  },

  updateTodo(username, action) {
    if (username && action) {
      return { text: 'todo' };
    } else {
      return { error: 'Invalid Data' };
    }
  },

  deleteTodo(username) {
    if (username === 'alex') {
      return 'Error - No such user!';
    } else {
      return 'Deleted';
    }
  },

  findTodo(username, id) {
    if (username === 'alex') {
      return 'Error - No such user!';
    } else {
      return { id: id, text: 'text' };
    }
  }
};

describe('TodoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // Here you provide what should be used as a service
        { provide: TodoServiceService, useValue: todoServiceServiceStub }
      ]
    });
  });

  it('should exist', inject([TodoServiceService], (service: TodoServiceService) => {
    expect(service).toBeTruthy();
  }));

  it('should have needed functions', inject([TodoServiceService], (service: TodoServiceService) => {
    expect(typeof service.getTodos).toEqual('function');
    expect(typeof service.addTodo).toEqual('function');
    expect(typeof service.updateTodo).toEqual('function');
    expect(typeof service.deleteTodo).toEqual('function');
    expect(typeof service.findTodo).toEqual('function');
  }));

  it('should have correct getTodos', inject([TodoServiceService], (service: TodoServiceService) => {
    expect(service.getTodos('alex')).toEqual('Error - No such user!');
    expect(service.getTodos('user')).toEqual({ text: 'one' });
  }));

  it('should have correct addTodo', inject([TodoServiceService], (service: TodoServiceService) => {
    expect(service.addTodo('', '')).toEqual({ error: 'Invalid Data' });
    expect(service.addTodo('alex', '')).toEqual({ error: 'Invalid Data' });
    expect(service.addTodo('', 'pass')).toEqual({ error: 'Invalid Data' });
    expect(service.addTodo('alex', 'pass')).toEqual({ text: 'todo' });
  }));

  it('should have correct updateTodo', inject([TodoServiceService], (service: TodoServiceService) => {
    expect(service.updateTodo('', '')).toEqual({ error: 'Invalid Data' });
    expect(service.updateTodo('alex', '')).toEqual({ error: 'Invalid Data' });
    expect(service.updateTodo('', 'pass')).toEqual({ error: 'Invalid Data' });
    expect(service.updateTodo('alex', 'pass')).toEqual({ text: 'todo' });
  }));

  it('should have correct deleteTodo', inject([TodoServiceService], (service: TodoServiceService) => {
    expect(service.deleteTodo('alex')).toEqual('Error - No such user!');
    expect(service.deleteTodo('user')).toEqual('Deleted');
  }));

  it('should have correct findTodo', inject([TodoServiceService], (service: TodoServiceService) => {
    expect(service.findTodo('alex', 1)).toEqual('Error - No such user!');
    expect(service.findTodo('user', 1)).toEqual({ id: 1, text: 'text' });
  }));
});
