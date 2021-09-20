import { PipeTransform, Pipe } from '@angular/core';
import { Status } from '../tasks/enums';

@Pipe({ name: 'taskStatus' })
export class TaskStatusPipe implements PipeTransform {
    public transform(value: Status): string {
        const values = {
            [Status.ACCEPTED]: 'Accepted',
            [Status.CODE_REVIEW]: 'Code review',
            [Status.IN_DEVELOPMENT]: 'In development',
            [Status.IN_TEST]: 'In Test',
            [Status.NEW]: 'New',
            [Status.PENDING]: 'Pending',
            [Status.READY_FOR_DEVELOPMENT]: 'Ready for development',
            [Status.READY_FOR_REVIEW]: 'Ready for review',
            [Status.READY_FOR_TESTING]: 'Ready for testing',
            [Status.REJECTED]: 'Rejected'
        }
        return values[value] || values[Status.NEW];
    }
}