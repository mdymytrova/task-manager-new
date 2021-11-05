import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromTasks from '../tasks/store/tasks.reducer';

export interface AppState {
    auth: fromAuth.IAuthState,
    tasks: fromTasks.ITasksState
};

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    tasks: fromTasks.tasksReducer
};