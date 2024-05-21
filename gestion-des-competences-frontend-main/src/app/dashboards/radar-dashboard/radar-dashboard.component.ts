import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ChartComponent,
  ApexStroke,
  ApexMarkers,
  ApexYAxis
} from "ng-apexcharts";
import { ChartService } from '../services/chart.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-radar-dashboard',
  templateUrl: './radar-dashboard.component.html',
  styleUrls: ['./radar-dashboard.component.scss']
})
export class RadarDashboardComponent implements OnInit {
  @ViewChild("chart") chart !: ChartComponent;
  public chartOptions !: Partial<ChartOptions>;
  testComponenet = false;

  public dates: string[] = [];
  public arr :any[] = [];
  public skills :any[] = [];
  public years :any[] = [];

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.loadData()
    this.initializeChart(this.arr, this.dates,0);
    this.chartService.getReportingRadar().subscribe(results => {
      results.map((element: any) => {
        if(this.years.indexOf(element.created.slice(3,8)) == -1){
          this.years.push(element.created.slice(3,8));
        }
      })
    })
  }

  loadData(): void {
    this.chartService.getReportingRadar().subscribe(results => {
      if (results) {

        results.map((elet: any) => {
          if(this.dates.indexOf(elet.created) == -1){
            this.dates.push(elet.created);
          }
          if(this.skills.indexOf(elet.Skill.name) == -1){
            this.skills.push(elet.Skill.name);
          }
        });
      this.skills.map(skill => {
        this.arr.push({name: skill, data: [null]})
      })
      this.dates.map((date, index) => {
        this.arr.map((elementt: any) =>{
          const item = results.find((item: any) => item.created === date && item.Skill.name === elementt.name);
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
      if(skills.indexOf(elet.Skill.name) == -1){
        skills.push(elet.Skill.name);
      }
    })
    skills.map(skill => {
      arr.push({name: skill, data: [null]})
    })
    dates.map((date, index) => {
      arr.map((elementt: any) =>{
        const item = $event.find((item: any) => item.created === date && item.Skill.name === elementt.name);
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

    this.initializeChart(arr, dates, 1);
  }

  initializeChart(arr: any, dates: any, width: any){  
    this.chartOptions = {
      series: arr,
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
        toolbar: {
          export: {
            csv: {
              filename: 'Radar chart',
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
            },
            svg: {
              filename: 'Radar chart',
            },
            png: {
              filename: 'Radar chart',
            }
          },
        }
      },
      title: {
        text: "Radar Chart"
      },
      stroke: {
        width: width
      },
      fill: {
        opacity: 0.4
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: dates,
      },
      yaxis: {
        labels: {
          formatter: (value) => {
            return value.toFixed()
          },
        }
      }
    };
  }

}
