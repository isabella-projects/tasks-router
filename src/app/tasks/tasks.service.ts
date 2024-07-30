import { Injectable, signal } from '@angular/core';

import { type Task, type NewTaskData } from './task/task.model';

import { TASKS } from './tasks';

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    private tasks = signal<Task[]>(TASKS);

    allTasks = this.tasks.asReadonly();

    constructor() {
        const tasks = localStorage.getItem('tasks');

        if (tasks) {
            this.tasks.set(JSON.parse(tasks));
        }
    }

    addTask(taskData: NewTaskData, userId: string) {
        this.tasks.update((prevTasks) => [
            {
                id: new Date().getTime().toString(),
                userId: userId,
                title: taskData.title,
                summary: taskData.summary,
                dueDate: taskData.date,
            },
            ...prevTasks,
        ]);
        this.saveTasks();
    }

    removeTask(id: string) {
        this.tasks.update((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        );
        this.saveTasks();
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks()));
    }
}
