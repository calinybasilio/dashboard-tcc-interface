import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(
        private readonly _router: Router,
        private readonly _userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._userService.isAuthenticated()) {
            return true;
        }
        this._router.navigate(['/login']);
        return false;
    }
}