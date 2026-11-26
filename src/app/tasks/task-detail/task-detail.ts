import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../core/models/task.model';

@Component({
  imports: [RouterLink],
  selector: 'app-task-detail',
  styleUrl: './task-detail.scss',
  templateUrl: './task-detail.html',
})
export class TaskDetail {
  task = input.required<Task>();
  id = input.required<number>();

  // protected readonly task = toSignal(
  //   this.#route.data.pipe(map((data) => data['task'] as Task | undefined)),
  // );
}
