import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(
        private readonly _userService: UserService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(environment.apiUrl) && this._userService.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${this._userService.getdataSession().token}`
                }
            });
        }
        return next.handle(req);
    }

}
