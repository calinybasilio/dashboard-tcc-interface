import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { mapLocalitiesInitials, mapLocalitiesName } from 'src/app/core/consts';
import { ELocalities } from 'src/app/core/enums/localities.enum';
import { DashboardService } from 'src/app/core/services/dashboard.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
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
  public numberJournalistsChart;

  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(
    private readonly dashboardService: DashboardService
  ) { }

  ngOnInit() {
    parseOptions(Chart, chartOptions());

    const filters = { localityId: ELocalities.BELO_HORIZONTE };
    this.loadWordFrequencyChartData(filters);

    this.loadNumberJournalistsByLocationChartData();
  }

  private loadWordFrequencyChartData(filters) {
    if (this.wordsChart) {
      this.wordsChart.destroy();
    }

    var chartWordsReference = document.getElementById('chart-words');

    this.dashboardService.wordFrequencyPolarArea(filters).subscribe({
      next: (result) => {
        this.wordsChart = new Chart(chartWordsReference, {
          type: 'polarArea',
          options: {
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
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: false
              }
            }
          },
          data: result
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
          type: 'bar',
          options: {
            plugins: {
              legend: {
                display: false
              }
            },
            tooltips: {
              callbacks: {
                label: function (item, data) {
                  var label = data.datasets[item.datasetIndex].label || "";
                  var yLabel = item.yLabel;
                  var content = "";
                  if (data.datasets.length > 1) {
                    content += label;
                  }
                  content += yLabel;
                  return content;
                }
              }
            }
          },
          data: result
        });
      },
      error: () => {

      }
    });
  }

  changeLocalityWordsFrequencyChart(localityId: number) {
    this.loadWordFrequencyChartData({ localityId })
  }

}
