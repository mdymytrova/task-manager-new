import { Injectable } from '@angular/core';

import { TASK_LIST } from '../assets/mocks';
import { TaskEventType } from '../tasks/enums';
import { ITask } from '../tasks/interfaces';


interface ITasksDataService {
    getTasks: () => ITask[];
    getTasksLength: () => number;
    getTaskById: (id: string) => ITask;
    updateTasks: (eventType: TaskEventType, updatedTask: ITask) => ITask[];
}

@Injectable()
export class TasksDataService implements ITasksDataService {
    private tasks: ITask[] = TASK_LIST;

    constructor() {}

    public getTasks(): ITask[] {
        return this.tasks;
    }

    public getTasksLength(): number {
        return this.tasks.length;
    }

    public getTaskById(id: string): ITask {
        return this.tasks.find((task: ITask) => task.id === id);
    }

    public updateTasks(eventType: TaskEventType, updatedTask: ITask): ITask[] {
        this.updateTaskList(eventType, updatedTask);
        return this.tasks;
    }

    private updateTaskList(eventType: TaskEventType, updatedTask: ITask) {
        const taskListUpdates = {
            [TaskEventType.CREATE]: () => this.tasks.push(updatedTask),
            [TaskEventType.UPDATE]: () => {
                const existingTaskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
                this.tasks[existingTaskIndex] = updatedTask;
            },
            [TaskEventType.DELETE]: () => this.tasks = this.tasks.filter(task => task.id !== updatedTask.id)
        }
        taskListUpdates[eventType]();
    }
}