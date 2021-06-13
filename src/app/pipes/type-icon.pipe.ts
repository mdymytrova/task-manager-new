import { PipeTransform, Pipe } from '@angular/core';
import { TaskType } from '../tasks/enums';

@Pipe({ name: 'typeIcon' })
export class TypeIconPipe implements PipeTransform {
    public transform(value: TaskType): string {
        const icons = {
            [TaskType.BUG]: 'indeterminate_check_box',
            [TaskType.TODO]: 'task'
        }
        return icons[value] || icons[TaskType.BUG];
    }
}