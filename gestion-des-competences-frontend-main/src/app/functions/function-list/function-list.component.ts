import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, PrimeNGConfig} from 'primeng-lts/api';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EditFunctionComponent} from '../edit-function/edit-function.component';
import {FunctionService} from '../services/function.service';
import {AddComponent} from '../add/add.component';
import { ImportFunctionComponent } from '../import-function/import-function.component';

@Component({
  selector: 'app-function-list',
  templateUrl: './function-list.component.html',
  styleUrls: ['./function-list.component.scss'],
  providers: [ConfirmationService]
})
export class FunctionListComponent implements OnInit {


  constructor(private primengConfig: PrimeNGConfig,
              private functionService: FunctionService,
              private confirmationService: ConfirmationService,
              public dialog: MatDialog
  ) {
  }

  functions: any;
  totalRecords = 0;
  statuses: any;
  loading = true;
  public msgs: any;
  fileName = '';
  fileTypes: string[] = ['.csv', '.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'];
  displayedColumns: string[] = ['name', 'department', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  ngOnInit(): void {
    this.loadData();
    this.primengConfig.ripple = true;
  }

  deleteUser(id: any): void {
    this.functionService.deleteFunction(id).subscribe(res => {
      if (res) {
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: 'Function deleted'}];
        this.loadData();
      }
    });
  }

  /* Load functions from database*/
  loadData(): void {
    this.functions = [];
    this.functionService.getFunctionsIncludeDepartments().subscribe(fcts => {
      this.functions = fcts;
      this.totalRecords = fcts.length;
      this.dataSource = new MatTableDataSource(this.functions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'department':
            return item.Department ? item.Department.name : '';
          default:
            return item[property];
        }
      };
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const searchString = filter.toLowerCase();
        for (const column of this.displayedColumns) {
          if (column === 'department' && data.Department && data.Department.name.toLowerCase().includes(searchString)) {
            return true;
          }
        }
        return false;
      }
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }

  confirmDelete(functionId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this function?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptIcon: 'pi',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.deleteUser(functionId);
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
    this.functionService.uploadFunctions(file).toPromise().then(data => {
      this.msgs = [{severity: 'success', summary: 'Success', detail: data.message}];
      setTimeout(() => {
        this.loadData();
      }, 1500);
    });
  }
  openEditFunctionDialog(): void {
    const dialogRef = this.dialog.open(EditFunctionComponent, {
      width: '500px',
      data: '',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: result}];
      }
    });
  }
  openAddFunctionDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '500px',
      data: '',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: result}];
      }
    });
  }

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportFunctionComponent, {
      width: '41.8%',
      height: '45%'
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.loadData();
      }, 1500);
    });
  }

}
