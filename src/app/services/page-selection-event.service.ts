import { EventEmitter, Injectable } from "@angular/core";
import { HeaderPage } from "../tasks/enums";

@Injectable()
export class PageSelectionEventService {
  public onPageSelect = new EventEmitter<HeaderPage>();
  public onCreate = new EventEmitter<HeaderPage>();
  public afterCreate = new EventEmitter();
}