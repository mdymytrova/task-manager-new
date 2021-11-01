import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { ITask, TaskEvent } from '../interfaces';
import { HeaderPage } from '../enums';

import { TasksEventService } from '../../services/tasks-event.service';
import { PageSelectionEventService } from '../../services/page-selection-event.service';
import { TasksDataService } from '../../services/tasks-data.service';


@Component({
    selector: 'app-tasks-drawer',
    templateUrl: './tasks-drawer.component.html',
    styleUrls: ['./tasks-drawer.component.scss']
})
export class TasksDrawerComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('drawer') drawer: MatSidenav;

    public selectedPage: HeaderPage;
    public taskList: ITask[];
    private pageSelectionSubscription: Subscription;
    private taskEventSubscription: Subscription;
    public previewOpen = false;

    constructor(private route: ActivatedRoute, private tasksDataService: TasksDataService, private tasksEventService: TasksEventService, private pageSelectionEventService: PageSelectionEventService) {}

    public ngOnChanges(changes: SimpleChanges): void { }

    public ngOnInit(): void {
        this.pageSelectionSubscription = this.pageSelectionEventService.onPageSelect.subscribe(this.pageSelectionEventHander);
        this.taskEventSubscription = this.tasksEventService.onTaskListUpdate.subscribe(this.taskEventHandler);
        this.setTasks();
    }

    public ngOnDestroy() {
        this.pageSelectionSubscription.unsubscribe();
        this.taskEventSubscription.unsubscribe()
    }

    private pageSelectionEventHander = (page: HeaderPage) => {
        this.selectedPage = page;
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