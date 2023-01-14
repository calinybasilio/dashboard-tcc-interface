import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { mapLocalitiesInitials, mapLocalitiesName } from 'src/app/core/consts';
import { ELocalities } from 'src/app/core/enums/localities.enum';
import { DashboardService } from 'src/app/core/services/dashboard.service';

// core components
import {
  chartOptions,
  parseOptions,
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public salesChart;

  public eLocalities = ELocalities;
  public mapLocalitiesName = mapLocalitiesName;
  public mapLocalitiesInitials = mapLocalitiesInitials;

  public wordsChart;
  public wordsReplysChart;
  public wordsLikesChart;
  public numberJournalistsChart;

  public clickedLocalityBhTweets: boolean = true;
  public clickedLocalityMvTweets: boolean = false;

  public clickedLocalityBhReplys: boolean = true;
  public clickedLocalityMvReplys: boolean = false;

  public clickedLocalityBhLikes: boolean = true;
  public clickedLocalityMvLikes: boolean = false;

  public maxSizePaginationOptions = 2;
  pageTableWords = 1;
	pageSizeTableWords = 5;
	collectionSizeTableWords = 0;
	words: any[] = [];

  pageTableJournalists = 1;
	pageSizeTableJournalists = 5;
	collectionSizeTableJournalists = 0;
	journalists: any[] = [];

  constructor(
    private readonly dashboardService: DashboardService
  ) {
    this.refreshWords();
    this.refreshJournalists();
  }

  ngOnInit() {
    parseOptions(Chart, chartOptions());

    const filters = { localityId: ELocalities.BELO_HORIZONTE };
    this.loadWordFrequencyTweetsChartData(filters);
    this.loadWordFrequencyReplysChartData(filters);
    this.loadWordFrequencyLikesChartData(filters);
    this.loadNumberJournalistsByLocationChartData();
  }
  
  private loadWordFrequencyTweetsChartData(filters) {
    if (this.wordsChart) {
      this.wordsChart.destroy();
    }

    var chartWordsReference = document.getElementById('chart-words');

    this.dashboardService.wordFrequencyTweets(filters).subscribe({
      next: (result) => {
        this.wordsChart = new Chart(chartWordsReference, {
          type: 'bar',
          options: {
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: false
              }
            },
            scales: {
              r: {
                pointLabels: {
                  display: true,
                  centerPointLabels: true,
                  font: {
                    size: 24
                  },
                }
              }
            },
          },
          data: result
        });
      },
      error: () => {

      }
    });
  }

  private loadWordFrequencyReplysChartData(filters) {
    if (this.wordsReplysChart) {
      this.wordsReplysChart.destroy();
    }

    var chartWordsReplysReference = document.getElementById('chart-words-replys');

    this.dashboardService.wordFrequencyReplys(filters).subscribe({
      next: (result) => {
        this.wordsReplysChart = new Chart(chartWordsReplysReference, {
          type: 'bar',
          data: result,
          options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: false
              }
            },
            
          }
        });
      },
      error: () => {

      }
    });
  }

  private loadWordFrequencyLikesChartData(filters) {
    if (this.wordsLikesChart) {
      this.wordsLikesChart.destroy();
    }

    var chartWordsLikesReference = document.getElementById('chart-words-likes');

    this.dashboardService.wordFrequencyLikes(filters).subscribe({
      next: (result) => {
        this.wordsLikesChart = new Chart(chartWordsLikesReference, {
          type: 'bar',
          data: result,
          options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: false
              }
            },
            
          }
        });
      },
      error: () => {

      }
    });
  }

  private loadNumberJournalistsByLocationChartData(){
    if (this.numberJournalistsChart) {
      this.numberJournalistsChart.destroy();
    }

    var chartNumberJournalistsReference = document.getElementById('chart-number-journalists');

    this.dashboardService.numberJournalistsByLocationBar().subscribe({
      next: (result) => {
        this.numberJournalistsChart = new Chart(chartNumberJournalistsReference, {
          type: 'pie',
          data: result,
          options: {
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: false
              }
            },
            scales: {
              r: {
                pointLabels: {
                  display: true,
                  centerPointLabels: true,
                  font: {
                    size: 24
                  },
                }
              }
            },
          },
        });
      },
      error: () => {

      }
    });
  }

  changeLocalityWordsFrequencyTweetsChart(localityId: number) {
    this.loadWordFrequencyTweetsChartData({ localityId });
  }

  changeLocalityWordsFrequencyReplysChart(localityId: number) {
    this.loadWordFrequencyReplysChartData({ localityId });
  }

  changeLocalityWordsFrequencyLikesChart(localityId: number) {
    this.loadWordFrequencyLikesChartData({ localityId });
  }

  refreshWords() {
		this.dashboardService.wordsRegisters({page: this.pageTableWords, pageSize: this.pageSizeTableWords}).subscribe({
      next: (result) => {
        this.words = result.rows;
        this.collectionSizeTableWords = result.count;
      },
      error: () => {

      }
    });
	}

  refreshJournalists() {
		this.dashboardService.journalistsRegisters({page: this.pageTableJournalists, pageSize: this.pageSizeTableJournalists}).subscribe({
      next: (result) => {
        this.journalists = result.rows;
        this.collectionSizeTableJournalists = result.count;
      },
      error: () => {}
    });
	}

}
