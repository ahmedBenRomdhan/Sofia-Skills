import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, PrimeNGConfig} from "primeng-lts/api";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../users/models/User";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SkillService} from "../services/skill.service";
import {Skill} from "../models/Skill";
import {EditSkillComponent} from "../edit-skill/edit-skill.component";
import {AddSkillComponent} from "../add-skill/add-skill.component";
import {CategoryListComponent} from "../../category/category-list/category-list.component";
import { FunctionService } from 'src/app/functions/services/function.service';
import { ImportSkillComponent } from '../import-skill/import-skill.component';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss'],
  providers: [ConfirmationService]
})
export class SkillListComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              private skillService: SkillService,
              private functionService : FunctionService,
              public dialog: MatDialog) {
  }

  skills: any;
  functions: any;
  selectedFunctions: any;
  totalRecords = 0;
  statuses: any;
  loading = true;
  msgs: any;
  fileName = '';
  msg = 'Pertinent Skills';
  testPertinent = false;
  fileTypes: string[] = ['.csv', '.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'];
  displayedColumns !: string[] ;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  close(): void {
    this.confirmationService.close();
  }

  openAddSkillDialog(): void {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: result}];

      }
    });
  }

  openEditSkillDialog(skill: Skill): void {
    const dialogRef = this.dialog.open(EditSkillComponent, {
      width: '500px',
      data: skill,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(!this.testPertinent){
          this.loadData();
          this.msgs = [{severity: 'success', summary: 'Confirmed', detail: result}];
        }
        else{
          this.filterPertinent();
          this.msgs = [{severity: 'success', summary: 'Confirmed', detail: result}];
        }
      }

    });
  }

  ngOnInit(): void {
    this.loadData();
    this.primengConfig.ripple = true;
    this.functionService.getFunctions().subscribe((data: any) => {
      this.functions = data
    })
  }

  deleteSkill(id: any): void {
    this.skillService.deleteSkill(id).subscribe(result => {
      this.msgs = [{severity: 'success', summary: 'Confirmed', detail: 'Skill deleted'}];
      this.loadData();
    }, () => {
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'Please try again !'}];
    });
  }

  loadData(): void {
    this.displayedColumns = ['name', 'categoryName', 'action'];
    this.skills = [];
    this.skillService.getSkills().subscribe(skills => {
      this.skills = skills;
      this.totalRecords = skills.length;
      this.dataSource = new MatTableDataSource(this.skills);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'categoryName': return item.Category.name;
        default: return item[property];
        }
      }
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (skills: any, filter: string) => {
        return skills.Category.name.trim().toLowerCase().includes(filter) || skills.name.trim().toLowerCase().includes(filter);
       };

    }, () => {
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'Please refresh this page !'}];

    });
  }

  confirmDelete(skillId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this skill?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptIcon: 'pi',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.deleteSkill(skillId);
      },
      key: 'confirmDialog'
    });
  }

  confirmUploadFile($event: any): void {
    this.fileName = '';
    const file = $event.target.files[0];
    if (file) {
      if (this.fileTypes.includes(file.type)) {
        this.fileName = file.name;
        this.confirmationService.confirm({
          message: 'Do you want to upload this file ' + this.fileName,
          header: 'Upload file Confirmation',
          icon: 'pi pi-info-circle',
          acceptIcon: 'pi',
          rejectIcon: 'pi',
          rejectButtonStyleClass: 'p-button-secondary',
          accept: () => {
            this.uploadFile(file);
            this.fileName = '';
          },
          reject: () => {
            this.fileName = '';
          },
          key: 'confirmDialog'
        });
      } else {
        this.msgs = [{severity: 'error', summary: 'Error', detail: 'Only excel file accepted'}];
      }
    }
  }

  uploadFile(file: any): void {
    this.skillService.uploadSkillls(file).toPromise().then(data => {
      this.msgs = [{severity: 'success', summary: 'Success', detail: data.message}];
      setTimeout(() => {
        this.loadData();
      }, 1500);
    });
  }

  filterPertinent(){
    let skills :any [] = [];
      this.skillService.getSkills().subscribe((data: any) => {
      data.filter((skill: any) => {
        if (skill.Functions.length != 0){
          skills.push(skill)
        }
       })
      this.dataSource = new MatTableDataSource(skills);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'categoryName': return item.Category.name;
          default: return item[property];
        }
      }
    })
  }

  onClickapplyPertinentSkillFilter(){
    if(this.testPertinent == false){
      this.displayedColumns.splice(2,0, 'functionName');
    this.filterPertinent()
    this.msg = 'All skills';
    }else{
      this.loadData()

      this.msg = 'Pertinent Skills';
    }
    this.testPertinent = !this.testPertinent;
  }

  nonSelectionFunctions(){
    if (this.selectedFunctions ) {
      this.selectedFunctions = [];
    }
    this.filterPertinent()
  }

  onSelectChange(event: any){
    let skills :any [] = [];
      this.skillService.getSkills().subscribe((data: any) => {
      data.map((skill: any) => {
        skill.Functions.map((fun: any) => {
          if (fun.id == event.value){
            skills.push(skill)
          }
          this.dataSource = new MatTableDataSource(skills);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
              case 'categoryName': return item.Category.name;
              default: return item[property];
            }
          }
        })
       })
    })

  }

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportSkillComponent, {
      width: '41.8%',
      height: '45%'
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.loadData();
      }, 1500);
      // this.searchInput.nativeElement.value = '';
    });
  }
}
