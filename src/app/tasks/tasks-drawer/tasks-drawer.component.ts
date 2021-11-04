import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';

import { ITask } from '../interfaces';

import * as fromApp from '../../store/app.reducer';
import { loadTasksRequest } from '../store/tasks.actions';

@Component({
    selector: 'app-tasks-drawer',
    templateUrl: './tasks-drawer.component.html',
    styleUrls: ['./tasks-drawer.component.scss']
})
export class TasksDrawerComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatSidenav;

    public taskList: ITask[];
    public previewOpen = false;
    private storeSubscription: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    public ngOnInit(): void {
        this.store.dispatch(loadTasksRequest());
        this.storeSubscription = this.store.select('tasks').pipe(map(tasksState => tasksState.tasks)).subscribe((tasks) => {
            this.taskList = tasks;
        });
    }

    public ngOnDestroy() {
        this.storeSubscription.unsubscribe();
    }

}