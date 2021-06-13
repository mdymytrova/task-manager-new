import { Component } from '@angular/core';
import { HeaderPage, TaskEventType } from './tasks/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-manager';

  constructor() {}

}
