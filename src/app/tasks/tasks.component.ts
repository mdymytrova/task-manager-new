import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

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
        this.taskList = this.tasksDataService.getTasks();
        if (this.route.firstChild) {
            this.route.firstChild.params
                .subscribe((params: Params) => {
                    this.previewOpen = !!params.id;
            });
        }
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