import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/data/models/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent {
  @Input() todo!: Todo;
}
