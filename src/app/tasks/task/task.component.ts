import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { CardComponent } from '../../shared/card/card.component';

import { TasksService } from '../tasks.service';

import { type Task } from './task.model';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [DatePipe, CardComponent],
    templateUrl: './task.component.html',
    styleUrl: './task.component.css',
})
export class TaskComponent {
    task = input.required<Task>();

    private tasksService = inject(TasksService);
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);

    onComplete() {
        this.tasksService.removeTask(this.task().id);
        this.router.navigate(['./'], {
            relativeTo: this.activatedRoute,
            onSameUrlNavigation: 'reload',
            queryParamsHandling: 'preserve',
        });
    }
}
