import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionState, SessionStateService } from './state/session-store';
import { isBrowser } from './utils/utils.methods';
import { SpinnerComponent } from './ui/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public isBrowser = isBrowser();

  public readonly sessionStore: SessionState =
    inject(SessionStateService).session();

  constructor(private router: Router) {}
}
