import { NgModule } from '@angular/core';

import { TypeIconPipe } from './type-icon.pipe';
import { TypeBorderPipe } from './type-border';
import { TaskStatusPipe } from './task-status.pipe';
import { PriorityIconPipe } from './priority-icon.pipe';
import { TypeIconClassPipe } from './type-icon-class.pipe';
import { PriorityIconClassPipe } from './priority-icon-class.pipe';

@NgModule({
  declarations: [
    TypeIconPipe,
    TypeIconClassPipe,
    TypeBorderPipe,
    TaskStatusPipe,
    PriorityIconPipe,
    PriorityIconClassPipe
  ],
  imports: [],
  exports: [
    TypeIconPipe,
    TypeIconClassPipe,
    TypeBorderPipe,
    TaskStatusPipe,
    PriorityIconPipe,
    PriorityIconClassPipe
  ]
})
export class PipesModule { }
