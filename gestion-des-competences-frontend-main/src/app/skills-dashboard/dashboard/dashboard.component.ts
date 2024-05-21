import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, PrimeNGConfig} from 'primeng-lts/api';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SkillService} from '../services/skill.service';
import {DashboardService} from '../services/dashboard.service';
import {DepartmentService} from '../../departments/services/department.service';
import {UserService} from '../../users/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ConfirmationService]
})
export class DashboardComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
              private skillService: SkillService,
              private userService: UserService,
              private departmentService: DepartmentService,
              private dashboardService: DashboardService,
              public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  users: any;
  skillsColumns = [];
  displayedColumns: string[] = ['user'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.loadData();
    this.primengConfig.ripple = true;
  }

  loadData(): void {
    this.skillService.getSkillsNames().subscribe(results => {
      this.skillsColumns = results;
      this.displayedColumns = this.displayedColumns.concat(results.map((r: any) => r.name));
    });
    this.dashboardService.getDashboardEvaluation().subscribe((results: any) => {
      if (results) {
        this.initializeTableDataSource(results);
      }
    });

  }

  applyFilter($event: any): void {
    if($event.skills && $event.categories){
      this.skillService.getSkillsByIdsCategoryAndSkills($event.skills, $event.categories).subscribe((results: any) => {
        if (results) {
          this.displayedColumns = ['user'].concat(results);
        }
      });

    }else if ($event.skills ) {
      this.skillService.getSkillsByIds($event.skills).subscribe((results: any) => {
        if (results) {
          this.displayedColumns = ['user'].concat(results);
        }
      });
    }else if ($event.pertinent){
      let skill: any[] = [];
      $event.results.map((item: any) => {
        for (const [key, value] of Object.entries(item)) {
          if (typeof(value) == 'object'){
            let val = value as any;
            if(value){
              skill.push(val.id)
            }
            this.skillService.getSkillsByIds(skill).subscribe((results: any) => {
              if (results) {
                this.displayedColumns = ['user'].concat(results);
              }
            });

          }
        }
      })
    }else if($event.categories){
      this.skillService.getSkillsByIdsCategory($event.categories).subscribe((results: any) => {
        if (results) {
          this.displayedColumns = ['user'].concat(results);
        }
      });

    }
    else {
      this.skillService.getSkillsNames().subscribe(results => {
        this.skillsColumns = results;

        this.displayedColumns =  ['user'].concat(results.map((r: any) => r.name));
      });
    }

    this.initializeTableDataSource($event.results);
  }

  initializeTableDataSource(data: any): void {
   
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    /* this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'department':
          return item.Department.name;
      }
    }; */
  }
}
