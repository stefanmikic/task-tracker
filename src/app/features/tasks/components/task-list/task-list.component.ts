import { Component, ChangeDetectionStrategy, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);
  private readonly fb = inject(FormBuilder);

  readonly tasks: Signal<Task[]> = this.taskService.tasks;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(64)]],
  });

  addTask(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.taskService.addTask(this.form.controls.name.value);
    this.form.reset({ name: '' });
  }


  clearAll(): void {
    this.taskService.clearAll();
  }

  get nameCtrl() {
    return this.form.controls.name;
  }

  get showNameErrors(): boolean {
    const c = this.nameCtrl;
    return c.invalid && (c.dirty || c.touched);
  }

  trackById(_index: number, task: Task): number {
    return task.id;
  }
}
