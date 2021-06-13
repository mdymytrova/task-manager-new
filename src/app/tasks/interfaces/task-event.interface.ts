import { TaskEventType } from '../enums';

export interface TaskEvent<T> {
    payload?: T,
    eventType: TaskEventType
};