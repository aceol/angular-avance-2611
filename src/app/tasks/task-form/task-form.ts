import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forbiddenWordValidator } from '../../core/validators/forbidden-word.validator';
import { UniqueTitleValidator } from '../../core/validators/unique-title.validator';
import { TasksStateService } from '../tasks.state.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  readonly #fb = inject(NonNullableFormBuilder);
  readonly #uniqueTitleValidator = inject(UniqueTitleValidator);
  readonly #tasksState = inject(TasksStateService);
  readonly taskSaved = output<void>();
  protected readonly isAdding = this.#tasksState.isAdding;
  protected readonly addError = this.#tasksState.addError;

  protected readonly taskForm = this.#fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(5)], // sync
      [this.#uniqueTitleValidator.validate.bind(this.#uniqueTitleValidator)], //async
    ],
    description: ['', [forbiddenWordValidator('procrastination')]],
    status: ['TODO'] as ['TODO' | 'IN_PROGRESS' | 'DONE'],
  });

  protected saveTask(): void {
    if (this.taskForm.pending || this.taskForm.invalid) return;
    this.#tasksState.addTask(this.taskForm.getRawValue() as Omit<Task, 'id'>).subscribe(() => {
      this.taskSaved.emit();
    });
  }
}
