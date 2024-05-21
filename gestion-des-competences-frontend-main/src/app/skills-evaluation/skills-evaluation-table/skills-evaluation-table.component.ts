import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SkillsEvalService} from '../services/skills-eval.service';
import {EditSkillEvaluationComponent} from "../edit-skill-evaluation/edit-skill-evaluation.component";
import {EditUserResumeComponent} from "../edit-user-resume/edit-user-resume.component";
import {ResumeService} from "../services/resume.service";
import { SkillsSelectionComponent } from '../skills-selection/skills-selection.component';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-skills-evaluation-table',
  templateUrl: './skills-evaluation-table.component.html',
  styleUrls: ['./skills-evaluation-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class SkillsEvaluationTableComponent implements OnInit {
  dataSource !: MatTableDataSource<any>;
  columnsToDisplay = ['firstName', 'department', 'function', 'englishResume', 'frenchResume'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any;
  displayedColumns: string[] = ['category', 'name', 'status', 'rate', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  msgs: any;
  connectedUserRole: any;
  connectedUserId : any;
  currentState: any;

  constructor(public dialog: MatDialog,
              private resumeService: ResumeService,
              private userService : UserService,
              private skillEvalService: SkillsEvalService) {
  }

  ngOnInit(): void {
    this.connectedUserRole = localStorage.getItem('role');
    this.connectedUserId = localStorage.getItem('id');
    this.loadData();
    this.currentState = false;
  }


  loadData(): void {
    this.skillEvalService.getUsersWithSkillEval().subscribe(data => {    
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'department':
            return item.Department.name;
          case 'function':
            return item.Function.name;
          default:
            return item[property];
        }
      };
    });
  }

  downloadFile(pathFile: any, fileName:any): void {
    this.resumeService.downloadFile(pathFile).subscribe((result) => {
      var blob = new Blob([result]);
      var url = window.URL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.download = fileName;
      anchor.href = url;
      anchor.click();

    }, error => {
      console.log(error.message);
    });

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  displayMsg($event: any): void {
    if ($event.message) {
      this.msgs = [{severity: 'success', summary: 'Confirmed', detail: $event.message}];
    } else {
      if ($event.warning) {
        this.msgs = [{severity: 'warn', summary: 'Warning', detail: $event.warning}];
      }
    }
  }

  openEditResumeDialog(user: any): void {
    const dialogRef = this.dialog.open(EditUserResumeComponent, {
      width: '600px',
      data: user,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.displayMsg(result);
        this.loadData();
      }
    });
  }

  openSkillDialog(user: any): void {
    this.currentState = false;
    const dialogRef = this.dialog.open(SkillsSelectionComponent, {
      width: '800px',
      height: 'auto',
      data: user,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.currentState = true;
      if (result) {
        this.displayMsg(result);
        this.loadData();
        
      }
    });
  }

  sendEmail(){
    
    this.userService.sendEmail({User: this.connectedUserId}).subscribe((data: any) =>{
      if(data){
        this.displayMsg(data)
      }
      
    })
  }
}

