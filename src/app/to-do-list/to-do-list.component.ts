import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ToDoService} from "../to-do.service";
import {CommonModule} from "@angular/common";
import {MatExpansionModule} from '@angular/material/expansion';
import {ITodo} from "../todo.interface";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';



@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MatExpansionModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit {
  public date!: string | null;
  public searchText: string;
  public newTodoText: string;
  public todos: ITodo[];
  public panelOpenState: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: ToDoService
  ) {
    this.todos = [];
    this.searchText = '';
    this.newTodoText = '';
    this.panelOpenState = true;
  }

  public ngOnInit(): void {
    this.date = this.route.snapshot.paramMap.get('date');
    this.todos = this.todoService.getTodos(this.date as string);
  }

  public filteredTodos(): ITodo[] {
    return this.todos.filter((todo: ITodo) => todo.text.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  public addTodo(): void {
    if (this.newTodoText.trim() !== '') {
      const newTodo: ITodo = {
        text: this.newTodoText.trim(),
        completed: false,
      };
      this.todoService.addTodo(this.date as string, newTodo);
      this.newTodoText = '';
      this.todos = this.todoService.getTodos(this.date as string);
    }
  }
  public deleteTodo(index: number): void {
    this.todoService.deleteTodo(this.date as string, index);
    this.todos = this.todoService.getTodos(this.date as string);
  }

  public toggleTodoStatus(index: number): void {
    this.todoService.toggleTodoStatus(this.date as string, index);
    this.todos = this.todoService.getTodos(this.date as string);
  }

  public editTodo(index: number, todo: ITodo): void {
    this.todoService.editTodo(this.date as string, index, todo);
  }

  public goBack(): void {
    this.router.navigate([''])
  }
}
