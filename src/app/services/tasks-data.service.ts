import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; 

import { TaskEventType } from '../tasks/enums';
import { ITask } from '../tasks/interfaces';
import { TasksEventService } from './tasks-event.service';

interface ITasksDataService {
    getTasks: () => Observable<ITask[]>;
    getTaskById: (id: string) => Observable<ITask>;
    updateTasks: (eventType: TaskEventType, updatedTask: ITask) => void;
}

@Injectable()
export class TasksDataService implements ITasksDataService {
    private url = 'https://md-task-manager-default-rtdb.firebaseio.com/tasks';

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

    public updateTasks(eventType: TaskEventType, updatedTask: ITask) {
        const taskListUpdates = {
            [TaskEventType.CREATE]: () => this.createTask(updatedTask),
            [TaskEventType.UPDATE]: () => this.updateTask(updatedTask),
            [TaskEventType.DELETE]: () => this.deleteTask(updatedTask)
        }
        return taskListUpdates[eventType]();
    }

    public createTask(task?: ITask) {
        return this.http.post(`${this.url}.json`, task)
            .pipe(catchError((errorResponse) => {
                return throwError(errorResponse?.error?.error || 'An error occured.');
            }));
    }

    private updateTask(task: ITask) {
        return this.http.put(`${this.url}/${task.id}.json`, task)
            .pipe(catchError((errorResponse) => {
                return throwError(errorResponse?.error?.error || 'An error occured.');
            }));
    }

    private deleteTask(task: ITask) {
        return this.http.delete(`${this.url}/${task.id}.json`)
            .pipe(catchError((errorResponse) => {
                return throwError(errorResponse?.error?.error || 'An error occured.');
            }));
    }
}