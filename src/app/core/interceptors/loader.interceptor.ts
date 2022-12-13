import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoaderService } from '../shared/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(private readonly _loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loaderService.show();
        return next.handle(req).pipe(finalize(() => this._loaderService.hide()));
    }

}
