import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITask } from '../tasks/interfaces';
@Injectable({providedIn: 'root'})
export class TasksDataService {
    private url = 'https://md-task-manager-default-rtdb.firebaseio.com/tasks';

    constructor(private http: HttpClient) {}

    public getTasks() {
        return this.http.get<ITask[]>(`${this.url}.json`);
    }

    public getTaskById(id: string): Observable<ITask> {
        return this.http.get<ITask>(`${this.url}/${id}.json`);
    }

    public createTask(task: ITask) {
        return this.http.post(`${this.url}.json`, task);
    }

    public updateTask(task: ITask) {
        return this.http.put(`${this.url}/${task.id}.json`, task);
    }

    public deleteTask(id: string) {
        return this.http.delete(`${this.url}/${id}.json`);
    }
}