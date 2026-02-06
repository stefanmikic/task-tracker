import { Component, signal } from '@angular/core';
import {TaskListComponent} from "./features/tasks/components/task-list/task-list.component";

@Component({
  selector: 'app-root',
  imports: [TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = signal('Task-Tracker');
}
