import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { Observable } from "rxjs";
import { mapLocalitiesInitials, mapLocalitiesName } from "src/app/core/consts";
import { EIteractionType } from "src/app/core/enums/iteraction-type.enum";
import { ELocalities } from "src/app/core/enums/localities.enum";
import { IFilterIncidenceOfWordsPerJournalists } from "src/app/core/interfaces/filter-incidence-of-words-per-journalists.interface";
import { IFilterTweetsPerMonth } from "src/app/core/interfaces/filter-tweets-per-month.interface";
import { IJournalist } from "src/app/core/interfaces/journalist-interface";
import { ITweetsStatistics } from "src/app/core/interfaces/tweets-statistics-result.interface";
import { DashboardService } from "src/app/core/services/dashboard.service";
import { JournalistService } from "src/app/core/services/journalist.service";

// core components
import { chartOptions, parseOptions } from "../../variables/charts";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public salesChart;

  public eLocalities = ELocalities;
  public mapLocalitiesName = mapLocalitiesName;
  public mapLocalitiesInitials = mapLocalitiesInitials;

  public tweetsStatistics: ITweetsStatistics;
  public rangeCollection = {
    firstCollectionDay: "08 de Fevereiro",
    lastCollectionDay: "26 de Setembro"
  };
  public tweetsPerMonthChart;
  public wordsChart;
  public wordsReplysChart;
  public wordsLikesChart;
  public numberJournalistsChart;

  public clickedLocalityBhTweetsPerMonth: boolean = true;
  public clickedLocalityMvTweetsPerMonth: boolean = false;

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

  filtersIncidenceOfWordsPerJournalists: IFilterIncidenceOfWordsPerJournalists;
  filtersTweetsPerMonth: IFilterTweetsPerMonth;

  journalists$: Observable<IJournalist[]>;
  journalistsTweetsPerMonth$: Observable<IJournalist[]>;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly journalistService: JournalistService
  ) {
    this.refreshWords();
    this.refreshJournalists();
  }

  ngOnInit() {
    this.journalists$ = this.journalistService.listJournalists(
      ELocalities.BELO_HORIZONTE
    );

    this.journalistsTweetsPerMonth$ = this.journalistService.listJournalists(
      ELocalities.BELO_HORIZONTE
    );

    parseOptions(Chart, chartOptions());

    this.loadTweetsStatistics();

    this.filtersTweetsPerMonth = {
      journalistId: null,
      localityId: ELocalities.BELO_HORIZONTE,
    };

    this.loadTweetsPerMonthChartData();

    this.filtersIncidenceOfWordsPerJournalists = {
      journalistId: null,
      iteractionType: EIteractionType.Tweets,
      localityId: ELocalities.BELO_HORIZONTE,
    };
    this.loadWordFrequencyTweetsChartData();

    const filters = { localityId: ELocalities.BELO_HORIZONTE };
    this.loadWordFrequencyReplysChartData(filters);
    this.loadWordFrequencyLikesChartData(filters);
    this.loadNumberJournalistsByLocationChartData();
  }

  private loadTweetsStatistics() {
    this.dashboardService.tweetsStatistics().subscribe({
      next: (result) => {
        this.tweetsStatistics = result;
      },
      error: () => {},
    });
  }

  private loadTweetsPerMonthChartData() {
    if (this.tweetsPerMonthChart) {
      this.tweetsPerMonthChart.destroy();
    }

    var chartTweetsPerMonthReference = document.getElementById(
      "chart-tweets-per-month"
    );

    this.dashboardService.tweetsPerMonth(this.filtersTweetsPerMonth).subscribe({
      next: (result) => {
        this.tweetsPerMonthChart = new Chart(chartTweetsPerMonthReference, {
          type: "line",
          options: {
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: false,
              },
            },
            scales: {
              r: {
                pointLabels: {
                  display: true,
                  centerPointLabels: true,
                  font: {
                    size: 24,
                  },
                },
              },
            },
          },
          data: result,
        });
      },
      error: () => {},
    });
  }

  private loadWordFrequencyTweetsChartData() {
    if (this.wordsChart) {
      this.wordsChart.destroy();
    }

    var chartWordsReference = document.getElementById("chart-words");

    this.dashboardService
      .wordFrequencyTweets(this.filtersIncidenceOfWordsPerJournalists)
      .subscribe({
        next: (result) => {
          this.wordsChart = new Chart(chartWordsReference, {
            type: "bar",
            options: {
              plugins: {
                legend: {
                  display: true,
                },
                title: {
                  display: false,
                },
              },
              scales: {
                r: {
                  pointLabels: {
                    display: true,
                    centerPointLabels: true,
                    font: {
                      size: 24,
                    },
                  },
                },
              },
            },
            data: result,
          });
        },
        error: () => {},
      });
  }

  private loadWordFrequencyReplysChartData(filters) {
    if (this.wordsReplysChart) {
      this.wordsReplysChart.destroy();
    }

    var chartWordsReplysReference =
      document.getElementById("chart-words-replys");

    this.dashboardService.wordFrequencyReplys(filters).subscribe({
      next: (result) => {
        this.wordsReplysChart = new Chart(chartWordsReplysReference, {
          type: "bar",
          data: result,
          options: {
            indexAxis: "y",
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: false,
              },
            },
          },
        });
      },
      error: () => {},
    });
  }

  private loadWordFrequencyLikesChartData(filters) {
    if (this.wordsLikesChart) {
      this.wordsLikesChart.destroy();
    }

    var chartWordsLikesReference = document.getElementById("chart-words-likes");

    this.dashboardService.wordFrequencyLikes(filters).subscribe({
      next: (result) => {
        this.wordsLikesChart = new Chart(chartWordsLikesReference, {
          type: "bar",
          data: result,
          options: {
            indexAxis: "y",
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: false,
              },
            },
          },
        });
      },
      error: () => {},
    });
  }

  private loadNumberJournalistsByLocationChartData() {
    if (this.numberJournalistsChart) {
      this.numberJournalistsChart.destroy();
    }

    var chartNumberJournalistsReference = document.getElementById(
      "chart-number-journalists"
    );

    this.dashboardService.numberJournalistsByLocationBar().subscribe({
      next: (result) => {
        this.numberJournalistsChart = new Chart(
          chartNumberJournalistsReference,
          {
            type: "pie",
            data: result,
            options: {
              plugins: {
                legend: {
                  display: true,
                },
                title: {
                  display: false,
                },
              },
              scales: {
                r: {
                  pointLabels: {
                    display: true,
                    centerPointLabels: true,
                    font: {
                      size: 24,
                    },
                  },
                },
              },
            },
          }
        );
      },
      error: () => {},
    });
  }

  changeLocalityWordsFrequencyTweetsChart(localityId: number) {
    this.filtersIncidenceOfWordsPerJournalists.localityId = localityId;
    this.journalists$ = this.journalistService.listJournalists(localityId);
    this.filtersIncidenceOfWordsPerJournalists.journalistId = null;
    this.loadWordFrequencyTweetsChartData();
  }
  changeJournalistWordsFrequencyTweetsChart(event: IJournalist) {
    this.loadWordFrequencyTweetsChartData();
  }

  changeLocalityTweetsPerMonthChart(localityId: number) {
    this.filtersTweetsPerMonth.localityId = localityId;
    this.journalistsTweetsPerMonth$ =
      this.journalistService.listJournalists(localityId);
    this.filtersTweetsPerMonth.journalistId = null;
    this.loadTweetsPerMonthChartData();
  }

  changeJournalistTweetsPerMonthChart(event: IJournalist) {
    this.loadTweetsPerMonthChartData();
  }

  changeLocalityWordsFrequencyReplysChart(localityId: number) {
    this.loadWordFrequencyReplysChartData({ localityId });
  }

  changeLocalityWordsFrequencyLikesChart(localityId: number) {
    this.loadWordFrequencyLikesChartData({ localityId });
  }

  refreshWords() {
    this.dashboardService
      .wordsRegisters({
        page: this.pageTableWords,
        pageSize: this.pageSizeTableWords,
      })
      .subscribe({
        next: (result) => {
          this.words = result.rows;
          this.collectionSizeTableWords = result.count;
        },
        error: () => {},
      });
  }

  refreshJournalists() {
    this.dashboardService
      .journalistsRegisters({
        page: this.pageTableJournalists,
        pageSize: this.pageSizeTableJournalists,
      })
      .subscribe({
        next: (result) => {
          this.journalists = result.rows;
          this.collectionSizeTableJournalists = result.count;
        },
        error: () => {},
      });
  }
}
