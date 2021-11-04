import { createAction, props } from '@ngrx/store';
import { ITask } from '../interfaces';

// get
export const loadTasksRequest = createAction('[Tasks] Load tasks start');
export const loadTasksSuccess = createAction('[Tasks] Load tasks success', props<{tasks: ITask[]}>());
export const loadTasksFailure = createAction('[Tasks] Load tasks falure');

// get by id
export const loadTaskRequest = createAction('[Tasks] Load task start', props<{id: string}>());
export const loadTaskSuccess = createAction('[Tasks] Load task success', props<{task: ITask}>());
export const loadTaskFailure = createAction('[Tasks] Load task falure');

// create
export const createTaskRequest = createAction('[Tasks] Create task start', props<{task: ITask}>());
export const createTaskSuccess = createAction('[Tasks] Create task success', props<{task: ITask}>());
export const createTaskFailure = createAction('[Tasks] Create task falure', props<{errorMessage: string}>());

// update
export const updateTaskRequest = createAction('[Tasks] Update task start', props<{task: ITask}>());
export const updateTaskSuccess = createAction('[Tasks] Update task success', props<{task: ITask}>());
export const updateTaskFailure = createAction('[Tasks] Update task falure', props<{errorMessage: string}>());

// delete
export const deleteTaskRequest = createAction('[Tasks] Delete task start', props<{id: string}>());
export const deleteTaskSuccess = createAction('[Tasks] Delete task success', props<{id: string}>());
export const deleteTaskFailure = createAction('[Tasks] Delete task falure', props<{errorMessage: string}>());

// select
export const selectTaskRequest = createAction('[Tasks] Select task start', props<{task: ITask}>());
export const selectTaskSuccess = createAction('[Tasks] Select task success', props<{task: ITask}>());

export const modalOpen = createAction('[Tasks] Modal open');
export const resetError = createAction('[Tasks] Reset error');
