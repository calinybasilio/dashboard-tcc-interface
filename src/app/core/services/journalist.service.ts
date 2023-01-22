import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ELocalities } from "../enums/localities.enum";
import { IJournalist } from "../interfaces/journalist-interface";
import { UtilsService } from "./utils.service";

@Injectable({
  providedIn: "root",
})
export class JournalistService {
  private readonly _BASE_URL = `${environment.apiUrl}/journalist`;

  constructor(
    private _httpClient: HttpClient,
    private _utilService: UtilsService
  ) {}

  listJournalists(localityId: ELocalities): Observable<any> {
    const url = this._BASE_URL;
    let params = new HttpParams();
    params = params.set("localityId", localityId || "");
    let options: any = this._utilService.prepareHeaders();
    options.params = params;

    return this._httpClient.get<IJournalist[]>(url, options);
  }
}
