import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';

import { TaskEventType } from '../enums';
import { ITask, TaskEvent } from '../interfaces';

import { TasksEventService } from '../../services/tasks-event.service';
import { TasksDataService } from '../../services/tasks-data.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnChanges {
  public task: ITask;
  public mode: string = 'embedded';
  constructor(private tasksEventService: TasksEventService, private tasksDataService: TasksDataService, private route: ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    this.tasksEventService.onTaskListUpdate.subscribe(this.taskEventHandler);
    this.route.params
      .subscribe((params: Params) => {
        this.task = this.tasksDataService.getTaskById(params.id);
      });

    this.mode = this.route.snapshot.data['mode'];
  }

  public ngOnChanges(changes): void { }

  public deleteTask() {
    this.router.navigate(['/tasks']);
    this.tasksDataService.updateTasks(TaskEventType.DELETE, this.task);
    this.tasksEventService.onTaskListUpdate.emit({
      eventType: TaskEventType.DELETE
    });
  }

  public navigateBack() {
    this.router.navigateByUrl(`/tasks/${this.task.id}`);
    // this.router.navigate(['/tasks']);
  }

  private taskEventHandler = (taskEvent: TaskEvent<ITask>) => {
    this.task = this.tasksDataService.getTaskById(this.task.id);
  }
}
