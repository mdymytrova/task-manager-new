import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import { authAutoLogin } from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task-manager';

  constructor(private store: Store<fromApp.AppState>, @Inject(PLATFORM_ID) private platformId) {}

  public ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(authAutoLogin());
    }
  }

}
