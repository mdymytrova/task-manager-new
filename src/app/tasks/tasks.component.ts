import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
export class TasksComponent implements OnInit, OnChanges {
    public selectedPage: HeaderPage;
    public taskList: ITask[];

    constructor(private tasksDataService: TasksDataService, private tasksEventService: TasksEventService, private pageSelectionEventService: PageSelectionEventService) {
        this.pageSelectionEventService.onPageSelect.subscribe(this.pageSelectionEventHander);
    }

    public ngOnInit(): void {
        this.taskList = this.tasksDataService.getTasks();
        this.tasksEventService.onTaskListUpdate.subscribe(this.taskEventHandler);
    }

    public ngOnChanges(changes: SimpleChanges): void { }

    private pageSelectionEventHander = (page: HeaderPage) => {
        this.selectedPage = page;
    }

    private taskEventHandler = (taskEvent: TaskEvent<ITask>) => {
        this.taskList = this.tasksDataService.getTasks();
    }
}