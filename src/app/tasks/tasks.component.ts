import { Component, inject, input } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterLink,
    RouterStateSnapshot,
} from '@angular/router';

import { TaskComponent } from './task/task.component';

import { TasksService } from './tasks.service';
import { Task, TaskOrder } from './task/task.model';

@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [TaskComponent, RouterLink],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
})
export class TasksComponent {
    userTasks = input.required<Task[]>();
    userId = input.required<string>();
    order = input<TaskOrder>();
}

// Resolver function to get all user tasks - cleaner way
export const resolveUserTasks: ResolveFn<Task[]> = (
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot,
) => {
    const order = activatedRoute.queryParams['order'];
    const tasksService = inject(TasksService);
    const tasks = tasksService
        .allTasks()
        .filter(
            (task) => task.userId === activatedRoute.paramMap.get('userId'),
        );

    if (order && order === 'asc') {
        tasks.sort((a, b) => (a.id > b.id ? 1 : -1));
    } else {
        tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
    }

    return tasks.length ? tasks : [];
};
