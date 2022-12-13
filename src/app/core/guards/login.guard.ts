import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private readonly _router: Router,
        private readonly _usuarioLogado: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._usuarioLogado.isAuthenticated()) {
            this._router.navigate(['/dashboard']);
            return false;
        }
        return true;
    }
    
}
