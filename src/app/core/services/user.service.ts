
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ILoginResult } from '../interfaces/login-result';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    protected static instance: UserService;

    public change: Subject<any> = new Subject();

    constructor() {
        UserService.instance = this;
    }

    private static dataSession: ILoginResult | any;

    public static observer: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public static get(): UserService {
        return UserService.instance;
    }

    isAuthenticated() {
        if (!UserService.dataSession) {
            this.loadDataSession();
        }
        return UserService.dataSession && !!UserService.dataSession.token
            && (new Date(UserService.dataSession.expiresIn) > new Date()) && !!UserService.dataSession.user;
    }

    setdataSession(dataSession: ILoginResult) {
        UserService.dataSession = dataSession;
        sessionStorage.setItem('session-information', JSON.stringify(UserService.dataSession));
        UserService.observer.next(UserService.dataSession);
    }

    private loadDataSession() {
        const dados = sessionStorage.getItem('session-information');
        if (dados) {
            UserService.dataSession = JSON.parse(dados);
        }
    }

    getdataSession(): ILoginResult | any {
        if (this.isAuthenticated()) {
            return UserService.dataSession;
        } else {
            this.logout();
        }
    }

    logout() {
        sessionStorage.removeItem('session-information');
        UserService.dataSession = null;
    }

}
