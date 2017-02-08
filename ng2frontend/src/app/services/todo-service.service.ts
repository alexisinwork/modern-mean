import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TodoService {

  constructor(private http: Http) {

  }

  getTodos(username) {
    return this.http.get(`/api/${username}/todos`)
      .map((response) => response.json());
  }

  addTodo(username, action) {
    return this.http.post(`/api/${username}/todo`, action)
      .map((response) => response.json());
  }

  updateTodo(username, action) {
    return this.http.put(`/api/${username}/todo/${action.id}`, action)
      .map((response) => response.json());
  }

  deleteTodo(username, action) {
    return this.http.delete(`/api/${username}/todo/${action.id}`)
      .map((response) => response.json());
  }

  findTodo(username, id) {
    return this.http.get(`/api/${username}/todo/${id}`)
      .map((response) => response.json());
  }

}
