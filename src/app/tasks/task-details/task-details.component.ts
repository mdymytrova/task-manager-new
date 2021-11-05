import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ITask } from '../interfaces';
import { ErrorAlert } from '../../modal/error-alert/error-alert.component';
import * as fromApp from '../../store/app.reducer';
import { deleteTaskRequest, resetError } from '../store/tasks.actions';
import { getDeleteActionError } from '../store/tasks.selector';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  public task: ITask;
  public mode: string = 'embedded';
  private storeSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private store: Store<fromApp.AppState>) { }

  public ngOnInit(): void {
    this.store.dispatch(resetError());
    this.storeSubscription = this.store.select('tasks').subscribe(tasks => {
      this.task = tasks.selectedTask;
    });
    this.errorSubscription = this.store.select(getDeleteActionError).subscribe(errorMessage => {
      if (errorMessage) {
        this.dialog.open(ErrorAlert, { data: errorMessage });
      }
    });
    this.mode = this.route.snapshot.data['mode'];
  }

  public ngOnDestroy() {
    this.storeSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  public deleteTask() {
    this.store.dispatch(resetError());
    this.store.dispatch(deleteTaskRequest({id: this.task.id}));
  }

}
