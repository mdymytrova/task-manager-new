import { PipeTransform, Pipe } from '@angular/core';
import { Priority, TaskType } from '../tasks/enums';

@Pipe({ name: 'typeBorder' })
export class TypeBorderPipe implements PipeTransform {
    public transform(value: Priority): string {
        const classes = {
            [TaskType.BUG]: () => this.getClass('bug'),
            [TaskType.TODO]: () => this.getClass('todo'),
            default: () => this.getClass('unset')
        }
        return (classes[value] || classes.default)();
    }

    private getClass(className) {
        return `task-list-item__wrapper task-list-item__wrapper--${className}`;
    }
}