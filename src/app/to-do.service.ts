import { Injectable } from '@angular/core';
import {ITodo, ITodoList} from "./todo.interface";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private todos: ITodoList[] = JSON.parse(localStorage.getItem('todos') || '[]');
  constructor() {
  }

  public getTodos(date: string): ITodo[] {
    const todoList: ITodoList | undefined = this.todos.find((list: ITodoList) => list.date === date);
    return todoList ? todoList.todo : [];
  }

  public addTodo(date: string, todo: ITodo): void {
    let todoList: ITodoList | undefined = this.todos.find((list: ITodoList) => list.date === date);
    if (!todoList) {
      todoList = {date, todo: []};
      this.todos.push(todoList);
    }
    todoList.todo.push(todo);
    this.saveTodos();
  }

  public editTodo(date: string, index: number, todo: ITodo): void {
    const todoList: ITodoList | undefined = this.todos.find((list: ITodoList) => list.date === date);
    if (todoList) {
      todoList.todo[index] = todo;
      this.saveTodos();
    }
  }

  public toggleTodoStatus(date: string, index: number): void {
    const todoList: ITodoList | undefined  = this.todos.find((list: ITodoList) => list.date === date);
    if (todoList) {
      todoList.todo[index].completed = !todoList.todo[index].completed;
      this.saveTodos();
    }
  }

  public deleteTodo(date: string, index: number): void {
    const todoList: ITodoList | undefined  = this.todos.find((list: ITodoList) => list.date === date);
    if (todoList) {
      todoList.todo.splice(index, 1);
      this.saveTodos();
    }
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}


