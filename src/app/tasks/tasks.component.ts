import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { ITask, TaskEvent } from './interfaces';
import { HeaderPage } from './enums';

import { TasksEventService } from '../services/tasks-event.service';
import { PageSelectionEventService } from '../services/page-selection-event.service';
import { TasksDataService } from '../services/tasks-data.service';


@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnChanges, OnDestroy {
    public selectedPage: HeaderPage;
    public taskList: ITask[];
    private pageSelectionSubscription: Subscription;
    private taskEventSubscription: Subscription;

    constructor(private tasksDataService: TasksDataService, private tasksEventService: TasksEventService, private pageSelectionEventService: PageSelectionEventService) {}

    public ngOnChanges(changes: SimpleChanges): void { }

    public ngOnInit(): void {
        this.pageSelectionSubscription = this.pageSelectionEventService.onPageSelect.subscribe(this.pageSelectionEventHander);
        this.taskEventSubscription = this.tasksEventService.onTaskListUpdate.subscribe(this.taskEventHandler);
        this.taskList = this.tasksDataService.getTasks();
    }

    public ngOnDestroy() {
        this.pageSelectionSubscription.unsubscribe();
        this.taskEventSubscription.unsubscribe()
    }

    private pageSelectionEventHander = (page: HeaderPage) => {
        this.selectedPage = page;
    }

    private taskEventHandler = (event: TaskEvent<ITask> | TaskEvent<ITask[]>) => {
        this.taskList = this.tasksDataService.getTasks();
    }
}