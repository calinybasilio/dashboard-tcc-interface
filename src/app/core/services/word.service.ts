import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IFindWord } from "../interfaces/find-word-interface";
import { UtilsService } from "./utils.service";

@Injectable({
  providedIn: "root",
})
export class WordService {
  private readonly _BASE_URL = `${environment.apiUrl}/word`;

  constructor(
    private _httpClient: HttpClient,
    private _utilService: UtilsService
  ) {}

  listRegisters(filters: IFindWord): Observable<any> {
    const url = this._BASE_URL;
    let params = new HttpParams();
    params = params.set("localityId", filters.localityId || "");
    params = params.set("limit", filters.limit || "");
    params = params.set("offset", filters.offset || "");
    let options: any = this._utilService.prepareHeaders();
    options.params = params;
    return this._httpClient.get<any>(url, options);
  }
}
