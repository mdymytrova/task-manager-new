import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TaskListComponent } from './task-list.component';
import { TypeBorderPipe } from '../../pipes/type-border';
import { TypeIconPipe } from '../../pipes/type-icon.pipe';
import { TypeIconClassPipe } from '../../pipes/type-icon-class.pipe';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { PriorityIconPipe } from '../../pipes/priority-icon.pipe';
import { PriorityIconClassPipe } from '../../pipes/priority-icon-class.pipe';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State, Store } from '@ngrx/store';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockStore: MockStore<State<any>>;
  const initialState = { tasks: {selectedTask: {}} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        TaskListComponent,
        TypeBorderPipe,
        TypeIconPipe,
        TypeIconClassPipe,
        TypeBorderPipe,
        TaskStatusPipe,
        PriorityIconPipe,
        PriorityIconClassPipe
      ],
      providers: [provideMockStore({initialState})]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    mockStore = TestBed.inject(Store) as MockStore<State<any>>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
