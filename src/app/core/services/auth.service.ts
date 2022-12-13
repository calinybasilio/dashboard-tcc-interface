import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAuthenticateBody } from '../interfaces/authenticate-body-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _BASE_URL = `${environment.apiUrl}`;

  constructor(
    private _httpClient: HttpClient
  ) { }

  public login(payload: IAuthenticateBody): Observable<any> {
    return this._httpClient.post(
      this._BASE_URL + `/authenticate`,
      payload
    );
  }

}