import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { TaskEventType } from '../enums';
import { ITask, TaskEvent } from '../interfaces';

import { TasksEventService } from '../../services/tasks-event.service';
import { TasksDataService } from '../../services/tasks-data.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnChanges, OnDestroy {
  public task: ITask;
  public mode: string = 'embedded';
  private taskEventSubscription: Subscription;

  constructor(private tasksEventService: TasksEventService, private tasksDataService: TasksDataService, private route: ActivatedRoute, private router: Router) { }

  public ngOnChanges(changes): void { }

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
    this.tasksDataService.updateTasks(TaskEventType.DELETE, this.task);
    this.router.navigate(['/tasks']);
  }

  private taskEventHandler = (event: TaskEvent<ITask> | TaskEvent<ITask[]>) => {
    if (event.eventType === TaskEventType.UPDATE) {
      this.tasksDataService.getTaskById(this.task.id).subscribe(task => {
        this.task = task;
      });
    }
  }
}
