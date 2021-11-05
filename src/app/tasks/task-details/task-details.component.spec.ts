import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TaskDetailsComponent } from './task-details.component';
import { TasksEventService } from '../../services/tasks-event.service';
import { TasksDataService } from '../../services/tasks-data.service';
import { MaterialModule } from '../../material/material.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State, Store } from '@ngrx/store';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let mockStore: MockStore;
  const initialState = { tasks: {selectedTask: {}} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, MaterialModule ],
      declarations: [ TaskDetailsComponent, TaskStatusPipe ],
      providers: [ TasksEventService, TasksDataService, provideMockStore({ initialState }) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    mockStore = TestBed.inject(Store) as MockStore<any>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
