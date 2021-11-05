import { createReducer, on, Store } from '@ngrx/store';
import { ITask } from '../interfaces';
import { createTaskFailure, createTaskRequest, createTaskSuccess, deleteTaskFailure, deleteTaskRequest, deleteTaskSuccess, loadTaskFailure, loadTaskRequest, loadTasksFailure, loadTasksRequest, loadTasksSuccess, loadTaskSuccess, modalOpen, resetError, selectTaskRequest, selectTaskSuccess, updateTaskFailure, updateTaskRequest, updateTaskSuccess } from './tasks.actions';

export interface ITasksState {
    tasks: ITask[];
    isLoading: boolean;
    selectedTask: ITask;
    errorLoad: string;
    errorCreateUpdate: string;
    errorDelete: string;
    modalOpen: boolean;
};

export const initialState: ITasksState = {
    tasks: [],
    isLoading: false,
    selectedTask: null,
    errorLoad: null,
    errorCreateUpdate: null,
    errorDelete: null,
    modalOpen: false
};

export const tasksReducer = createReducer(
    initialState,
    on(loadTasksRequest, (state) => {
        return {
            ...state,
            tasks: [],
            errorLoad: null,
            isLoading: true
        };
    }),
    on(loadTasksSuccess, (state, {tasks}) => {
        return {
            ...state,
            errorLoad: null,
            isLoading: false,
            tasks: tasks
        };
    }),
    on(loadTasksFailure, (state, {errorMessage}) => {
        return {
            ...state,
            isLoading: false,
            errorLoad: errorMessage
        };
    }),
    on(loadTaskRequest, (state) => {
        return {
            ...state,
            selectedTask: null,
            errorLoad: null,
            isLoading: true
        };
    }),
    on(loadTaskSuccess, (state, {task}) => {
        return {
            ...state,
            isLoading: false,
            errorLoad: null,
            selectedTask: task
        };
    }),
    on(loadTaskFailure, (state, {errorMessage}) => {
        return {
            ...state,
            isLoading: false,
            errorLoad: errorMessage
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
            errorCreateUpdate: errorMessage
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
            errorCreateUpdate: errorMessage
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
            errorDelete: errorMessage
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
            errorCreateUpdate: null,
            errorDelete: null,
            errorLoad: null
        };
    })
);