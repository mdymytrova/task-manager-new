import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TaskListItemComponent } from './task-list-item.component';
import { TasksEventService } from '../../../services/tasks-event.service';
import { TypeBorderPipe } from '../../../pipes/type-border';
import { PriorityIconClassPipe } from '../../../pipes/priority-icon-class.pipe';
import { TypeIconPipe } from '../../../pipes/type-icon.pipe';
import { TypeIconClassPipe } from '../../../pipes/type-icon-class.pipe';
import { TaskStatusPipe } from '../../../pipes/task-status.pipe';
import { PriorityIconPipe } from '../../../pipes/priority-icon.pipe';
import { Priority, Status, TaskType } from '../../enums';

describe('TaskListItemComponent', () => {
  let component: TaskListItemComponent;
  let fixture: ComponentFixture<TaskListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        TaskListItemComponent,
        TypeBorderPipe,
        TypeIconPipe,
        TypeIconClassPipe,
        TypeBorderPipe,
        TaskStatusPipe,
        PriorityIconPipe,
        PriorityIconClassPipe
      ],
      providers: [ TasksEventService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListItemComponent);
    component = fixture.componentInstance;
    component.task = {
      id: '1',
      createdOn: new Date(),
      summary: '',
      description: '',
      status: Status.NEW,
      type: TaskType.BUG,
      priority: Priority.MINOR
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
