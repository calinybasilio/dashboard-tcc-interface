import { Subject } from "rxjs";
import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor(
    protected httpClient: HttpClient
  ) {}

  public prepareHeaders(): { headers: HttpHeaders } {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    return { headers };
  }
}
