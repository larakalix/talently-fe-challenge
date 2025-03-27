import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskGuard } from './task.guard';
import { TaskGridComponent } from './task-grid/task-grid.component';

const routes: Routes = [
  { path: '', component: TaskGridComponent, canActivate: [TaskGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
