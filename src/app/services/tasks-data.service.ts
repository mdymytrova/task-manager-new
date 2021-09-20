import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

import { TaskEventType } from '../tasks/enums';
import { ITask } from '../tasks/interfaces';
import { TasksEventService } from './tasks-event.service';

interface ITasksDataService {
    getTasks: () => Observable<ITask[]>;
    getTaskById: (id: string) => Observable<ITask>;
    updateTasks: (eventType: TaskEventType, updatedTask: ITask) => void;
    getTasksNumber: () => number;
}

@Injectable()
export class TasksDataService implements ITasksDataService {
    private url = 'https://md-task-manager-default-rtdb.firebaseio.com/tasks';
    private tasksNumber = 1;

    constructor(private http: HttpClient, private tasksEventService: TasksEventService) {}

    public getTasks(): Observable<ITask[]> {
        return this.http.get<ITask[]>(`${this.url}.json`).pipe(map(responseData => {
            const tasks = [];
            for (const key in responseData) {
                tasks.push({
                    ...responseData[key],
                    id: key
                });
            }
            if (tasks.length) {
                this.tasksNumber = tasks.length + 1;
            }
            return tasks;
        }));
    }

    public getTaskById(id: string): Observable<ITask> {
        return this.http.get<ITask>(`${this.url}/${id}.json`).pipe(map((task: ITask) => {
            return {
                ...task, 
                id: id
            };
        }));
    }

    public getTasksNumber() {
        return this.tasksNumber;
    }

    public updateTasks(eventType: TaskEventType, updatedTask: ITask) {
        const taskListUpdates = {
            [TaskEventType.CREATE]: () => this.createTask(updatedTask),
            [TaskEventType.UPDATE]: () => this.updateTask(updatedTask),
            [TaskEventType.DELETE]: () => this.deleteTask(updatedTask)
        }
        taskListUpdates[eventType]();
    }

    private createTask(task: ITask) {
        this.http.post(`${this.url}.json`, task)
            .subscribe(response => {
                this.tasksEventService.onTaskListUpdate.next({
                    eventType: TaskEventType.CREATE
                });
                this.tasksNumber++;
            });
    }

    private updateTask(task: ITask) {
        this.http.put(`${this.url}/${task.id}.json`, task)
            .subscribe(response => {
                this.tasksEventService.onTaskListUpdate.next({
                    eventType: TaskEventType.UPDATE
                });
            });
    }

    private deleteTask(task: ITask) {
        this.http.delete(`${this.url}/${task.id}.json`)
            .subscribe(response => {
                this.tasksEventService.onTaskListUpdate.next({
                    eventType: TaskEventType.DELETE
                });
                this.tasksNumber--;
            });
    }
}