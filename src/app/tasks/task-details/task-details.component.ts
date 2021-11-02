import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { TaskEventType } from '../enums';
import { ITask, TaskEvent } from '../interfaces';

import { TasksEventService } from '../../services/tasks-event.service';
import { TasksDataService } from '../../services/tasks-data.service';
import { ErrorAlert } from '../../modal/error-alert/error-alert.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  public task: ITask;
  public mode: string = 'embedded';
  private taskEventSubscription: Subscription;

  constructor(private tasksEventService: TasksEventService, private tasksDataService: TasksDataService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.taskEventSubscription = this.tasksEventService.onTaskListUpdate.subscribe(this.taskEventHandler);
    this.route.params
      .subscribe(() => {
        this.task = this.route.snapshot.data['task'];
      });
    
    this.mode = this.route.snapshot.data['mode'];
  }

  public ngOnDestroy() {
    this.taskEventSubscription.unsubscribe();
  }

  public deleteTask() {
    this.tasksDataService.updateTasks(TaskEventType.DELETE, this.task).subscribe(response => {
      this.tasksEventService.onTaskListUpdate.next({
        eventType: TaskEventType.DELETE
      });
      this.router.navigate(['/tasks']);
    }, error => {
      this.dialog.open(ErrorAlert, { data: error });
    });
  }

  private taskEventHandler = (event: TaskEvent<ITask> | TaskEvent<ITask[]>) => {
    if (event.eventType === TaskEventType.UPDATE) {
      this.tasksDataService.getTaskById(this.task.id).subscribe(task => {
        this.task = task;
      });
    }
  }
}
