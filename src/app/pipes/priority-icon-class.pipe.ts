import { PipeTransform, Pipe } from '@angular/core';
import { Priority } from '../tasks/enums';

@Pipe({ name: 'priorityIconClass' })
export class PriorityIconClassPipe implements PipeTransform {
    public transform(priority: Priority): string {
        const classes = {
            [Priority.CRITICAL]: 'critical',
            [Priority.BLOCKER]: 'blocker',
            [Priority.MAJOR]: 'major',
            [Priority.MINOR]: 'minor',
            [Priority.TRIVIAL]: 'trivial'
        }
          return `material-icons-outlined task-list-item__priority--${classes[priority]}`;
    }
}