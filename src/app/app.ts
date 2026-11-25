import { Component, inject } from '@angular/core';
import { Header } from './layout/header/header';
import { Login } from './core/auth/login/login';
import { AuthStore } from './core/auth/auth.store';
import { TaskList } from './tasks/task-list/task-list';

@Component({
  imports: [Header, Login, TaskList],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  readonly #authStore = inject(AuthStore);
  protected readonly isLoggedIn = this.#authStore.isLoggedIn;
}
