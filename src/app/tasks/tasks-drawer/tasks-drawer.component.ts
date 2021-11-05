import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ITask } from '../interfaces';
import * as fromApp from '../../store/app.reducer';
import { loadTasksRequest } from '../store/tasks.actions';
import { ErrorAlert } from '../../modal/error-alert/error-alert.component';
import { getLoadError } from '../store/tasks.selector';

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
    private errorSubscription: Subscription;

    constructor(private store: Store<fromApp.AppState>, private dialog: MatDialog) {}

    public ngOnInit(): void {
        this.store.dispatch(loadTasksRequest());
        this.storeSubscription = this.store.select('tasks').subscribe((tasksStore) => {
            this.taskList = tasksStore.tasks;
        });
        this.errorSubscription = this.store.select(getLoadError).subscribe(errorMessage => {
            if (errorMessage) {
              this.dialog.open(ErrorAlert, { data: errorMessage });
            }
          });
    }

    public ngOnDestroy() {
        this.storeSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    }

}