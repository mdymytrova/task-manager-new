import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ITask } from '../interfaces';
import * as fromApp from '../../store/app.reducer';
import { selectTaskSuccess } from '../store/tasks.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() public taskList: ITask[];

  public selectedTaskId: string;
  private storeSubscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  public ngOnInit() {
    this.storeSubscription = this.store.select('tasks').subscribe(tasks => {
      this.selectedTaskId = tasks.selectedTask?.id;
    });
  }

  public ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  public onTaskSelection(task: ITask) {
    if (this.selectedTaskId === task.id) {
      this.store.dispatch(selectTaskSuccess({ task: null }));
      this.router.navigate(['/tasks']);
    } else {
      this.store.dispatch(selectTaskSuccess({ task }));
      this.router.navigate(['/tasks', task.id]);
    }
  }
}
