import { PipeTransform, Pipe } from '@angular/core';
import { TaskType } from '../tasks/enums';

@Pipe({ name: 'typeIconClass' })
export class TypeIconClassPipe implements PipeTransform {
    public transform(value: TaskType): string {
        const classes = {
            [TaskType.BUG]: 'bug',
            [TaskType.TODO]: 'todo'
          };
        return `material-icons task-list-item__type--${classes[value]}`;
    }
}