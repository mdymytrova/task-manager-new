import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HeaderPage } from "../tasks/enums";

@Injectable()
export class PageSelectionEventService {
  public onPageSelect = new Subject<HeaderPage>();
  public onCreate = new Subject<HeaderPage>();
  public afterCreate = new Subject();
}