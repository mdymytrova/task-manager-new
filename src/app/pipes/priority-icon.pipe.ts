import { PipeTransform, Pipe } from '@angular/core';
import { Priority } from '../tasks/enums';

@Pipe({ name: 'priorityIcon' })
export class PriorityIconPipe implements PipeTransform {
    public transform(value: TaskType): string {
        const icons = {
            [Priority.CRITICAL]: 'bookmark',
            [Priority.BLOCKER]: 'do_not_disturb_on',
            [Priority.MAJOR]: 'priority_high',
            [Priority.MINOR]: 'low_priority',
            [Priority.TRIVIAL]: 'circle_outline'
        }
        return icons[value] || icons[Priority.MINOR];
    }
}