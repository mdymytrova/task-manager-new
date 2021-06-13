import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ITask } from '../../interfaces';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit, OnChanges {
  @Input() public task: ITask;
  @Input() public selectedTaskId: string;
  
  public isSelected;

  constructor() { }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedTaskId && !changes.selectedTaskId.firstChange) {
      this.isSelected = this.task.id === this.selectedTaskId;
    }
   }

  public ngOnInit(): void { 
    this.isSelected = this.task.id === this.selectedTaskId;
  }
}
