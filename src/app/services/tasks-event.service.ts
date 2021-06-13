import { EventEmitter, Injectable } from '@angular/core';
import { ITask, TaskEvent } from '../tasks/interfaces';

@Injectable()
export class TasksEventService {
    public onTaskSelect = new EventEmitter<TaskEvent<ITask>>();
    public onTaskListUpdate = new EventEmitter<TaskEvent<ITask[]>>();
}