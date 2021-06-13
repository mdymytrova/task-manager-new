import { ITask } from '../../tasks/interfaces';
import { Priority, Status, TaskType } from '../../tasks/enums';

export const TASK_LIST: ITask[] = [
    {
        id: 'TIS-1',
        assignee: null,
        createdOn: new Date(2021, 1, 14),
        priority: Priority.TRIVIAL,
        summary: 'Incorrect positioning',
        description: 'Save button is too low.',
        labels: [],
        status: Status.IN_DEVELOPMENT,
        type: TaskType.BUG
    },
    {
        id: 'TIS-2',
        createdOn: new Date(2021, 3, 12),
        priority: Priority.BLOCKER,
        summary: 'Server error',
        description: 'An error occurs on save button click.',
        labels: [],
        status: Status.NEW,
        type: TaskType.BUG
    },
    {
        id: 'TIS-3',
        createdOn: new Date(2021, 3, 10),
        priority: Priority.MAJOR,
        summary: 'Add new field',
        description: 'Add email field.',
        labels: [],
        status: Status.READY_FOR_TESTING,
        type: TaskType.TODO
    }
];