import { Component, inject, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';

import { TasksStateService } from '../tasks.state.service';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  imports: [TaskForm],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
  readonly #tasksState = inject(TasksStateService);

  protected readonly tasksTodo = this.#tasksState.tasksTodo;
  protected readonly tasksInProgress = this.#tasksState.tasksInProgress;
  protected readonly tasksDone = this.#tasksState.tasksDone;
  protected readonly totalTasks = this.#tasksState.totalTasks;

  ngOnInit() {
    this.#tasksState.fetchAll();
  }

  // Signal pour gérer la visibilité du formulaire
  protected readonly isFormVisible = signal(false);

  protected closeForm(): void {
    this.isFormVisible.set(false);
  }
}
