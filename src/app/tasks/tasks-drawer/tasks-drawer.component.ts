import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { ITask, TaskEvent } from '../interfaces';

import { TasksEventService } from '../../services/tasks-event.service';
import { TasksDataService } from '../../services/tasks-data.service';


@Component({
    selector: 'app-tasks-drawer',
    templateUrl: './tasks-drawer.component.html',
    styleUrls: ['./tasks-drawer.component.scss']
})
export class TasksDrawerComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatSidenav;

    public taskList: ITask[];
    private taskEventSubscription: Subscription;
    public previewOpen = false;

    constructor(private tasksDataService: TasksDataService, private tasksEventService: TasksEventService) {}

    public ngOnInit(): void {
        this.taskEventSubscription = this.tasksEventService.onTaskListUpdate.subscribe(this.taskEventHandler);
        this.setTasks();
    }

    public ngOnDestroy() {
        this.taskEventSubscription.unsubscribe()
    }

    private taskEventHandler = (event: TaskEvent<ITask> | TaskEvent<ITask[]>) => {
        this.setTasks();
    }

    private setTasks() {
        this.tasksDataService.getTasks().subscribe((tasks) => {
            this.taskList = tasks;
        });
    }
}