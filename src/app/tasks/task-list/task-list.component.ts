import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ITask } from '../interfaces';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() public taskList: ITask[];

  public selectedTaskId: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.selectedTaskId = this.route.firstChild?.snapshot?.params?.id;
  }

  public onTaskSelection(taskId) {
    if (this.selectedTaskId === taskId) {
      this.selectedTaskId = null;
      this.router.navigate(['/tasks']);
    } else {
      this.selectedTaskId = taskId;
      this.router.navigate(['/tasks', taskId]);
    }
  }
}
