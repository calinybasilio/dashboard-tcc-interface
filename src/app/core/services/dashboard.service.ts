import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor() { }

    // wordFrequencyPolarArea() {
    //     const datasetReturn = {
    //         labels: [],
    //         data: []
    //     };

    //     const words = words_frequency_bh.slice(0, 10).forEach((word: {
    //         count: number, word: string;
    //     }) => {
    //         datasetReturn.labels.push(word.word);
    //         datasetReturn.data.push(word.count);
    //     });

    //     return {
    //         labels: datasetReturn.labels,
    //         datasets: [
    //           {
    //             label: 'Incidência',
    //             data: datasetReturn.data,
    //             backgroundColor: [
    //               'rgb(255, 99, 132)',
    //               'rgb(75, 192, 192)',
    //               'rgb(255, 205, 86)',
    //               'rgb(201, 203, 207)',
    //               'rgb(54, 162, 235)',
    //               'rgb(22, 99, 132)',
    //               'rgb(44, 192, 192)',
    //               'rgb(77, 205, 86)',
    //               'rgb(99, 203, 207)',
    //               'rgb(112, 162, 235)'
    //             ]
    //           }
    //         ]
    //       };
    // }

    // numberJournalistsByLocationBar() {
    //     let countBh = 0;
    //     let countMv = 0;

    //     users.forEach(user => {
    //         if (user.locality_id == ELocalities.BELO_HORIZONTE) {
    //             countBh++;
    //         } else {
    //             countMv++;
    //         }
    //     });

    //     const retorno =  {
    //         labels: [mapLocalitiesName[ELocalities.BELO_HORIZONTE], mapLocalitiesName[ELocalities.MONTEVIDEO]],
    //         datasets: [
    //             {
    //                 label: '',
    //                 data: [countBh, countMv],
    //                 backgroundColor:  'rgb(75, 192, 192)',
    //             }
    //         ]
    //     };

    //     return retorno;
    // }

}
