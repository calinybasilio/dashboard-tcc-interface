import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { transparentize } from 'src/app/variables/charts';
import { CHART_COLORS, mapLocalitiesName } from '../consts';
import { ELocalities } from '../enums/localities.enum';
import { users, words_frequency_bh, words_frequency_mv } from '../mock/consts';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor() { }

    wordFrequencyPolarArea(filters): Observable<any> {
        const datasetReturn = {
            labels: [],
            data: []
        };

        const wordsFrequencyArray = filters.localityId === ELocalities.BELO_HORIZONTE ?
            words_frequency_bh : words_frequency_mv;

        wordsFrequencyArray.slice(0, 20).forEach((word: {
            count: number, word: string;
        }) => {
            datasetReturn.labels.push(word.word);
            datasetReturn.data.push(word.count);
        });

        return of({
            labels: datasetReturn.labels,
            datasets: [
                {
                    label: 'Incidência',
                    data: datasetReturn.data,
                    backgroundColor: [
                        transparentize(CHART_COLORS.red, 0.5),
                        transparentize(CHART_COLORS.orange, 0.5),
                        transparentize(CHART_COLORS.yellow, 0.5),
                        transparentize(CHART_COLORS.green, 0.5),
                        transparentize(CHART_COLORS.blue, 0.5),
                        transparentize(CHART_COLORS.red, 0.5),
                        transparentize(CHART_COLORS.orange, 0.5),
                        transparentize(CHART_COLORS.yellow, 0.5),
                        transparentize(CHART_COLORS.green, 0.5),
                        transparentize(CHART_COLORS.blue, 0.5),
                    ]
                }
            ]
        });
    }

    numberJournalistsByLocationBar(): Observable<any> {
        let countBh = 0;
        let countMv = 0;

        users.forEach(user => {
            if (user.locality_id == ELocalities.BELO_HORIZONTE) {
                countBh++;
            } else {
                countMv++;
            }
        });

        const result =  {
            labels: [mapLocalitiesName[ELocalities.BELO_HORIZONTE], mapLocalitiesName[ELocalities.MONTEVIDEO]],
            datasets: [
                {
                    label: 'Jornalistas',
                    data: [countBh, countMv]
                }
            ]
        };

        return of(result);
    }

    wordsRegisters(filter: {page: number; pageSize: number}): Observable<any> {
        const words = words_frequency_bh.map((country, i) => ({ id: i + 1, ...country })).slice(
			(filter.page - 1) * filter.pageSize,
			(filter.page - 1) * filter.pageSize + filter.pageSize,
		);

        return of({rows: words, count: words_frequency_bh.length});
    }

}
