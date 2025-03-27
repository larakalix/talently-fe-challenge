import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/tasks/task.service';
import { SessionStateService } from '../../state/session-store';
import { TaskStateService } from '../../state/tasks-store';

@Component({
  selector: 'app-tasks',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  private sessionStore = inject(SessionStateService);
  private taskStore = inject(TaskStateService);

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        console.log('Fetched tasks:', response.data);
        const { setTasks } = this.taskStore.getState();
        setTasks(response.data);
      },
      error: (err) => console.error('Error fetching tasks:', err),
    });
  }

  logout(): void {
    const { setSession } = this.sessionStore.getState();

    setSession(null);
    this.router.navigate(['/auth/login']);
  }
}
