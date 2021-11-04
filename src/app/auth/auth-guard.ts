import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => authState.user),
            map(user => {
                return !!user || this.router.createUrlTree(['/signin'])
            })
        );
    }
}