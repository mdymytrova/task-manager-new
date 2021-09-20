import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
        return this.authService.userSignIn.pipe(
            take(1),
            map(user => {
                return !!user || this.router.createUrlTree(['/signin'])
            })
        );
    }
}