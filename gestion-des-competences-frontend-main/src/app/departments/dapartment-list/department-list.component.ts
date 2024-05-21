import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, PrimeNGConfig} from "primeng-lts/api";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DepartmentService} from "../services/department.service";
import {AddDapartmentComponent} from "../add-dapartment/add-dapartment.component";
import {EditDapartmentComponent} from "../edit-dapartment/edit-dapartment.component";
import { ImportDepartmentComponent } from '../import-department/import-department.component';

@Component({
  selector: 'app-dapartment-list',
  templateUrl: './dapartment-list.component.html',
  styleUrls: ['./dapartment-list.component.scss'],
  providers: [ConfirmationService]
})
export class DepartmentListComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
              private departmentService: DepartmentService,
              private confirmationService: ConfirmationService,
              public dialog: MatDialog
  ) {
  }

  departments: any;
  totalRecords = 0;
  statuses: any;
  loading = true;
  public msgs: any;
  fileName = '';
  fileTypes: string[] = ['.csv', '.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'];
  displayedColumns: string[] = ['name', 'description', 'action'];
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
    this.departmentService.deleteDepartment(id).subscribe(res => {
      if (res) {
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: 'Department deleted'}];
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.departments =[];
    this.departmentService.getActivatedDepartments().subscribe(result => {
      this.departments = result;
      this.totalRecords = result.length;
      this.dataSource = new MatTableDataSource(this.departments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }

  confirmDelete(departmentId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this department?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptIcon: 'pi',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.deleteUser(departmentId);
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
    this.departmentService.uploadDepartments(file).toPromise().then(data => {
      this.msgs = [{severity: 'success', summary: 'Success', detail: data.message}];
      setTimeout(() => {
        this.loadData();
      }, 1500);
    });
  }

  openAddDepartmentDialog(): void {
    const dialogRef = this.dialog.open(AddDapartmentComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: result}];
      }
    });
  }

  openEditDepartmentDialog(department: any): void {
    const dialogRef = this.dialog.open(EditDapartmentComponent, {
      width: '500px',
      data: department,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: result}];
      }
    });
  }
  openImportDialog() {
    const dialogRef = this.dialog.open(ImportDepartmentComponent, {
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
