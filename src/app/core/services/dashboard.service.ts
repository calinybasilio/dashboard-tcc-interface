import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { CHART_COLORS, mapLocalitiesName } from "../consts";
import { ELocalities } from "../enums/localities.enum";
import { IFilterIncidenceOfWordsPerJournalists } from "../interfaces/filter-incidence-of-words-per-journalists.interface";
import {
  users,
  words_frequency_likes_bh,
  words_frequency_likes_mv,
  words_frequency_replys_bh,
  words_frequency_replys_mv,
  words_frequency_tweets_bh,
} from "../mock/consts";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private readonly _BASE_URL = `${environment.apiUrl}/dashboard`;

  constructor(
    private _httpClient: HttpClient
  ) { }

  wordFrequencyTweets(payload: IFilterIncidenceOfWordsPerJournalists): Observable<any> {
    return this._httpClient.post(
      this._BASE_URL + `/incidence-of-words-per-journalists`,
      payload
    );
  }

  wordFrequencyReplys(filters): Observable<any> {
    const datasetReturn = {
      labels: [],
      data: [],
    };

    const wordsFrequencyArray =
      filters.localityId === ELocalities.BELO_HORIZONTE
        ? words_frequency_replys_bh
        : words_frequency_replys_mv;

    wordsFrequencyArray
      .slice(0, 20)
      .forEach((word: { count: number; word: string }) => {
        datasetReturn.labels.push(word.word);
        datasetReturn.data.push(word.count);
      });

    return of({
      labels: datasetReturn.labels,
      datasets: [
        {
          label: "Incidência (Replys)",
          data: datasetReturn.data,
        },
      ],
    });
  }

  wordFrequencyLikes(filters): Observable<any> {
    const datasetReturn = {
      labels: [],
      data: [],
    };

    const wordsFrequencyArray =
      filters.localityId === ELocalities.BELO_HORIZONTE
        ? words_frequency_likes_bh
        : words_frequency_likes_mv;

    wordsFrequencyArray
      .slice(0, 20)
      .forEach((word: { count: number; word: string }) => {
        datasetReturn.labels.push(word.word);
        datasetReturn.data.push(word.count);
      });

    return of({
      labels: datasetReturn.labels,
      datasets: [
        {
          label: "Incidência (Likes)",
          data: datasetReturn.data,
        },
      ],
    });
  }

  numberJournalistsByLocationBar(): Observable<any> {
    let countBh = 0;
    let countMv = 0;

    users.forEach((user) => {
      if (user.locality_id == ELocalities.BELO_HORIZONTE) {
        countBh++;
      } else {
        countMv++;
      }
    });

    const result = {
      labels: [
        mapLocalitiesName[ELocalities.BELO_HORIZONTE],
        mapLocalitiesName[ELocalities.MONTEVIDEO],
      ],
      datasets: [
        {
          label: "Jornalistas",
          data: [countBh, countMv],
          backgroundColor: [CHART_COLORS.orange]
        },
      ],
    };

    return of(result);
  }

  wordsRegisters(filter: { page: number; pageSize: number }): Observable<any> {
    const words = words_frequency_tweets_bh
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice(
        (filter.page - 1) * filter.pageSize,
        (filter.page - 1) * filter.pageSize + filter.pageSize
      );

    return of({ rows: words, count: words_frequency_tweets_bh.length });
  }

  journalistsRegisters(filter: {
    page: number;
    pageSize: number;
  }): Observable<any> {
    const users_filtered = users
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice(
        (filter.page - 1) * filter.pageSize,
        (filter.page - 1) * filter.pageSize + filter.pageSize
      );

    return of({ rows: users_filtered, count: users.length });
  }
}
