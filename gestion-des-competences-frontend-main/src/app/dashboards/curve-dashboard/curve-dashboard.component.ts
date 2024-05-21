import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartService} from '../services/chart.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-curve-dashboard',
  templateUrl: './curve-dashboard.component.html',
  styleUrls: ['./curve-dashboard.component.scss']
})
export class CurveDashboardComponent implements OnInit {

  @ViewChild("chart") chart2: ChartComponent = Object.create(null);
  public chartOptions2: Partial<any> | undefined;

  public dates: string[] = [];
  public skills: string[] = [];
  public arr :any[] = [];
  testComponenet = true;

  constructor(private chartService: ChartService) {
  }

  loadData(): void {
    this.chartService.getReportingAccordingTime().subscribe(results => {
      if (results) {
        results.map((elet: any) => {
          if(this.dates.indexOf(elet.created) == -1){
            this.dates.push(elet.created);
          }
          if(this.skills.indexOf(elet.SkillEvaluation.Skill.name) == -1){
            this.skills.push(elet.SkillEvaluation.Skill.name);
          }
        });
      this.skills.map(skill => {
        this.arr.push({name: skill, data: [null]})
      })
      this.dates.map((date, index) => {
        this.arr.map((elementt: any) =>{
          const item = results.find((item: any) => item.created === date && item.SkillEvaluation.Skill.name === elementt.name);
          if(item){
            elementt.data[index] = item.avgLevel.toFixed(2)
          }else{
            if(elementt.data[index-1] == undefined){
              elementt.data[index] = null
            }
            else{
              elementt.data[index] = elementt.data[index-1]
            }
          }
        })
      })
    }
    });
  }

  applyFilter($event: any): void {
    const arr: any[] = [];
    const dates: any[] = [];
    const skills: any[] = [];

    $event.forEach((elet: any) => {
      if(dates.indexOf(elet.created) == -1){
        dates.push(elet.created);
      }
      if(skills.indexOf(elet.SkillEvaluation.Skill.name) == -1){
        skills.push(elet.SkillEvaluation.Skill.name);
      }
    })
    skills.map(skill => {
      arr.push({name: skill, data: [null]})
    })
    dates.map((date, index) => {
      arr.map((elementt: any) =>{
        const item = $event.find((item: any) => item.created === date && item.SkillEvaluation.Skill.name === elementt.name);
        if(item){
          elementt.data[index] = item.avgLevel.toFixed(2)
        }else{
          if(elementt.data[index-1] == undefined){
            elementt.data[index] = null
          }
          else{
            elementt.data[index] = elementt.data[index-1]
          }
        }
      })
    })
    this.initializeChart(arr, dates);
  }

  ngOnInit(): void {
    this.loadData()
    this.initializeChart(this.arr, this.dates);

  }


  initializeChart(arr: any, dates: any){

    this.chartOptions2 = {
      series: arr,
      chart: {
        height: 360,
        type: "area",
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
      },
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: false ,
          customIcons: []
        },
        export: {
          csv: {
            filename: 'Over Time Skills Evolution',
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
          },
          svg: {
            filename: 'Over Time Skills Evolution',
          },
          png: {
            filename: 'Over Time Skills Evolution',
          }
        },
      },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: dates.sort()
      },
      yaxis: {
        max: 4,
        min: 0,
        decimalsInFloat: undefined,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

}
