import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ITask, TaskEvent } from '../tasks/interfaces';

@Injectable({providedIn: 'root'})
export class TasksEventService {
    public onTaskSelect = new Subject<TaskEvent<ITask>>();
    public onTaskListUpdate = new Subject<TaskEvent<ITask[]>>();
}