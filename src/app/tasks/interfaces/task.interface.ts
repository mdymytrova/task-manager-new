import { Priority, Status, TaskType } from '../enums';

export interface ITaskBasic {
    id: string;
    createdOn: Date;
    summary: string;
    description: string;
    status: Status;
    type: TaskType;
    priority: Priority;
    catalogId?: string;
}
export interface ITask extends ITaskBasic {
    reporter?: string;
    assignee?: string;
    labels?: string[];
}