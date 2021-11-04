import { createReducer, on, Store } from '@ngrx/store';
import { ITask } from '../interfaces';
import { createTaskFailure, createTaskRequest, createTaskSuccess, deleteTaskFailure, deleteTaskRequest, deleteTaskSuccess, loadTaskRequest, loadTasksRequest, loadTasksSuccess, loadTaskSuccess, modalOpen, resetError, selectTaskRequest, selectTaskSuccess, updateTaskFailure, updateTaskRequest, updateTaskSuccess } from './tasks.actions';

export interface ITasksState {
    tasks: ITask[];
    isLoading: boolean;
    selectedTask: ITask;
    error: string;
    modalOpen: boolean;
};

export const initialState: ITasksState = {
    tasks: [],
    isLoading: false,
    selectedTask: null,
    error: null,
    modalOpen: false
};

export const tasksReducer = createReducer(
    initialState,
    on(loadTasksRequest, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(loadTasksSuccess, (state, {tasks}) => {
        return {
            ...state,
            isLoading: false,
            tasks: tasks
        };
    }),
    on(loadTaskRequest, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(loadTaskSuccess, (state, {task}) => {
        return {
            ...state,
            isLoading: false,
            selectedTask: task
        };
    }),
    on(createTaskRequest, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(createTaskSuccess, (state, {task}) => {
        return {
            ...state,
            isLoading: false,
            modalOpen: false,
            tasks: [...state.tasks, task]
        };
    }),
    on(createTaskFailure, (state, {errorMessage}) => {
        return {
            ...state,
            isLoading: false,
            error: errorMessage
        };
    }),
    on(updateTaskRequest, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(updateTaskSuccess, (state, {task}) => {
        return {
            ...state,
            isLoading: false,
            modalOpen: false,
            selectedTask: state.selectedTask.id === task.id ? task : state.selectedTask,
            tasks: state.tasks.map(stateTask => {
                return task.id === stateTask.id ? task : stateTask;
            })
        };
    }),
    on(updateTaskFailure, (state, {errorMessage}) => {
        return {
            ...state,
            isLoading: false,
            error: errorMessage
        };
    }),
    on(deleteTaskRequest, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(deleteTaskSuccess, (state, {id}) => {
        return {
            ...state,
            isLoading: false,
            tasks: state.tasks.filter(task => task.id != id),
            selectedTask: null
        };
    }),
    on(deleteTaskFailure, (state, {errorMessage}) => {
        return {
            ...state,
            isLoading: false,
            error: errorMessage
        };
    }),
    on(selectTaskRequest, (state) => {
        return {
            ...state
        };
    }),
    on(selectTaskSuccess, (state, {task}) => {
        return {
            ...state,
            selectedTask: task
        };
    }),
    on(modalOpen, (state) => {
        return {
            ...state,
            modalOpen: true
        };
    }),
    on(resetError, (state) => {
        return {
            ...state,
            error: null
        };
    })
);