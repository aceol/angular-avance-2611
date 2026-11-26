import { Component, inject, OnInit, output, Signal, signal } from '@angular/core';
import { UniqueTitleValidator } from '../../core/validators/unique-title.validator';
import { TasksStateService } from '../tasks.state.service';
import { Task } from '../../core/models/task.model';
import {
  form,
  FormField,
  minLength,
  required,
  validate,
  validateAsync,
} from '@angular/forms/signals';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-form',
  imports: [FormField],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  readonly #uniqueTitleValidator = inject(UniqueTitleValidator);
  readonly #tasksState = inject(TasksStateService);
  readonly taskSaved = output<void>();
  protected readonly isAdding = this.#tasksState.isAdding;
  protected readonly addError = this.#tasksState.addError;

  protected readonly taskModel = signal<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'TODO',
  });

  private buildTitleResource = (titleSignal: Signal<string | undefined>) => {
    return rxResource({
      params: () => titleSignal(),
      stream: ({ params: title }) => this.#uniqueTitleValidator.validate({ value: title } as any),
    });
  };

  protected readonly taskForm = form(this.taskModel, (path) => {
    required(path!.title, { message: 'Le titre est requis' });
    minLength(path!.title, 5, { message: 'Le titre doit faire au moins 5 caractères' });
    validate(path!.description, ({ value }) => {
      const description = value().toLowerCase();
      if (description.includes('procrastination')) {
        return {
          kind: 'forbiddenWord',
          message: 'Le mot "procrastination" est interdit.',
        };
      }

      return null;
    });
    validateAsync(path!.title, {
      params: ({ value }) => value(),
      factory: this.buildTitleResource,
      onError: () => null,
      onSuccess: (result) => {
        if (result && result['uniqueTitle']) {
          return {
            kind: 'uniqueTitle',
            message: 'Titre en doublon',
          };
        }
        return null;
      },
    });
  });

  // protected readonly taskForm = this.#fb.group({
  //   title: [
  //     '',
  //     [Validators.required, Validators.minLength(5)], // sync
  //     [this.#uniqueTitleValidator.validate.bind(this.#uniqueTitleValidator)], //async
  //   ],
  //   description: ['', [forbiddenWordValidator('procrastination')]],
  //   status: ['TODO'] as ['TODO' | 'IN_PROGRESS' | 'DONE'],
  // });

  protected saveTask(): void {
    if (this.taskForm().pending() || this.taskForm().invalid()) return;
    this.#tasksState.addTask(this.taskModel() as Omit<Task, 'id'>).subscribe(() => {
      this.taskSaved.emit();
    });
  }
}
