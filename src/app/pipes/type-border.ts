import { PipeTransform, Pipe } from '@angular/core';
import { Priority, TaskType } from '../tasks/enums';

@Pipe({ name: 'typeBorder' })
export class TypeBorderPipe implements PipeTransform {
    public transform(value: Priority): string {
        const classes = {
            [TaskType.BUG]: 'bug',
            [TaskType.TODO]: 'todo',
            default: 'unset'
        };
        return `task-list-item__wrapper task-list-item__wrapper--${classes[value] || classes.default}`;
    }
}