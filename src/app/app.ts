import { Component } from '@angular/core';
import { Header } from './layout/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Header, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
