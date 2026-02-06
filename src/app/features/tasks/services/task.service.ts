import {Injectable, signal} from '@angular/core';
import {Task} from "../models/task.model";

@Injectable({
  providedIn: 'root',
})

/**
 * In-memory task store used in place of a backend API
 */
export class TaskService {
  private _tasks = signal<Task[]>([
    { id: 1, name: 'Wake up at 6 am', completed: true },
    { id: 2, name: 'Walk the dog', completed: true },
    { id: 3, name: 'Work 8 hours', completed: false },
    { id: 4, name: 'Go to gym', completed: false },
  ]);
  tasks = this._tasks.asReadonly();

  //variable for id creation
  private nextId : number = 5;

  addTask(name: string): void {
    const task: Task = {
      id: this.nextId++,
      name: name,
      completed: false,
    }
    this._tasks.update(tasks => [...tasks, task]);
  }

  deleteTask(id: number): void {
    this._tasks.update(tasks => tasks.filter(t => t.id !== id));
  }

  clearAll(): void {
    this._tasks.set([]);
  }

  toggleCompletion(id: number): void {
    this._tasks.update(tasks =>
        tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        )
    );
  }
}