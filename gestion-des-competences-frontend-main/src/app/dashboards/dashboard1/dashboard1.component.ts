import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartService} from '../services/chart.service';
import {
  ChartComponent
} from "ng-apexcharts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public chartOptions: Partial<any> | undefined;
  public avgLevels: number[] = [];
  public skills: string[] = [];

  constructor(private chartService: ChartService) {
    this.loadData();
    this.initializeChatOptions();
  }

  ngOnInit(): void {
    this.initializeChatOptions();
  }

  loadData(): void {
    this.chartService.getHistogramChartValues().subscribe(results => {
      if (results) {
        results.forEach((elet: any) => {
          this.avgLevels.push(elet.avgLevel.toFixed(2));
          this.skills.push(elet.Skill.name);
        });
      }
    });
  }

  applyFilter($event: any): void {
    const avgLevels: number[] = [];
    const skills: string[] = [];
    $event.forEach((elet: any) => {
      avgLevels.push(elet.avgLevel.toFixed(2));
      skills.push(elet.Skill.name);
    });
    this.initializeChatOption(avgLevels, skills);
  }

  initializeChatOption(avgLevels: any, skills: any): void {
    this.chartOptions = {
      series: [
        {
          name: 'Average level',
          data: avgLevels
        }
      ],
      chart: {
        type: 'bar',
        fontFamily: 'Poppins,sans-serif',
        height: 400,
        toolbar: {
          export: {
            csv: {
              filename: 'Skills Evaluation Overview',
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
            },
            svg: {
              filename: 'Skills Evaluation Overview',
            },
            png: {
              filename: 'Skills Evaluation Overview',
            }
          },
        },
      },
      grid: {
        borderColor: 'rgba(0,0,0,.2)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '15%',
          endingShape: 'flat'
        },

      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width:5,
        colors: ['transparent']
      },
      xaxis: {
        categories: skills,
        labels: {
          show: skills.length > 0, // Show labels only if there are skills
          rotate: -75,
          style: {
            fontSize: '10px' // Adjust font size as needed
          },
        }
      },
      yaxis: {
        max: 4,
        min: 0,
        decimalsInFloat: undefined,
      },
      legend: {
        show: false,
      },
      fill: {
        colors: ['#26c6da', '#1e88e5'],
        opacity: 1
      },
      tooltip: {
        theme: 'light',
        fillSeriesColor: false,
        marker: {
          show: false,
        },
      }
    };
  }

  initializeChatOptions(): void {
    this.chartOptions = {
      series: [
        {
          name: 'Average level',
          data: []
        }
      ],
      chart: {
        type: 'bar',
        fontFamily: 'Poppins,sans-serif',
        height: 360,
        toolbar: {
          export: {
            csv: {
              filename: 'Skills Evaluation Overview',
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
            },
            svg: {
              filename: 'Skills Evaluation Overview',
            },
            png: {
              filename: 'Skills Evaluation Overview',
            }
          },
        },
      },
      grid: {
        borderColor: 'rgba(0,0,0,.2)',
        strokeDashArray: 3,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          endingShape: 'flat'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [], // Initially empty
        labels: {
          show: false, // Initially hide labels

        }
      },
      yaxis: {
        max: 4,
        min: 0,
        decimalsInFloat: undefined,
      },
      legend: {
        show: false,
      },
      fill: {
        colors: ['#26c6da', '#1e88e5'],
        opacity: 1
      },
      tooltip: {
        theme: 'light',
        fillSeriesColor: false,
        marker: {
          show: false,
        },
      }
    };
  }

}
