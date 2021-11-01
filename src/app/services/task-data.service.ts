import { Injectable } from '@angular/core';

import { Priority, Status, TaskType } from '../tasks/enums';

interface ITaskDataService {
    getPriorities: () => Priority[];
    getTypes: () => TaskType[];
    getStatuses: () => Status[];
}

@Injectable({providedIn: 'root'})
export class TaskDataService implements ITaskDataService {
    constructor() {}

    public getPriorities() {
        return [
            Priority.BLOCKER,
            Priority.CRITICAL,
            Priority.MAJOR,
            Priority.MINOR,
            Priority.TRIVIAL
        ];
    }

    public getTypes() {
        return [
            TaskType.BUG,
            TaskType.TODO
        ];
    }

    public getStatuses() {
        return [
            Status.NEW,
            Status.ACCEPTED,
            Status.CODE_REVIEW,
            Status.IN_DEVELOPMENT,
            Status.IN_TEST,
            Status.PENDING,
            Status.READY_FOR_DEVELOPMENT,
            Status.READY_FOR_REVIEW,
            Status.READY_FOR_TESTING,
            Status.REJECTED
        ];
    }
}