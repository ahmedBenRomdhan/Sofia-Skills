import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {ConfirmationService, PrimeNGConfig} from 'primeng-lts/api';
import {UserService} from '../services/user.service';
import {User} from '../models/User';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {UpdateUserComponent} from '../update-user/update-user.component';
import { ImportUserComponent } from '../import-user/import-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ConfirmationService]
})
export class UserListComponent implements OnInit {


  constructor(private primengConfig: PrimeNGConfig,
              private userService: UserService,
              private confirmationService: ConfirmationService,
              public dialog: MatDialog
  ) {
  }

  users: any;
  totalRecords = 0;
  statuses: any;
  loading = true;
  public msgs: any;
  fileName = '';
  fileTypes: string[] = ['.csv', '.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'];
  displayedColumns: string[] = ['firstName', 'role', 'email', 'company', 'department', 'function', 'action'];
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
    this.userService.deleteUsers(id).subscribe(res => {
      if (res) {
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: 'User deleted'}];
        this.loadData();
      }
    }, error => {
      this.msgs = [{severity: 'error', summary: 'Error', detail: error}];
    });
  }

  disableUser(id: any): void {
    this.userService.disableUsers(id).subscribe(res => {
      if (res) {
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: 'User disabled'}];
        this.loadData();
      }
    }, error => {
      this.msgs = [{severity: 'error', summary: 'Error', detail: error}];
    });
  }

  loadData(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.totalRecords = users.length;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'department':
            return item.Department ? item.Department.name : '';
          case 'function':
            return item.Function ? item.Function.name : '';
          case 'role':
            return item.Role ? item.Role.name : '';
          default:
            return item[property];
        }
      };
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const searchString = filter.toLowerCase();
        const fullName = (data.firstName + ' ' + data.lastName).toLowerCase();
        for (const column of this.displayedColumns) {
          if (column === 'department' && data.Department && data.Department.name.toLowerCase().includes(searchString)) {
            return true;
          }
          if (column === 'function' && data.Function && data.Function.name.toLowerCase().includes(searchString)) {
            return true;
          }
          if (column === 'role' && data.Role && data.Role.name.toLowerCase().includes(searchString)) {
            return true;
          }
          if (column === 'firstName' && fullName.includes(searchString)) {
            return true;
          }
          if (column === 'lastName' && fullName.includes(searchString)) {
            return true;
          }
          if (data[column] && data[column].toString().toLowerCase().includes(searchString)) {
            return true;
          }
        }
        return false;
      };
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }
  confirmDelete(userId: string, method: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to ' + method + ' this user?',
      header: method.charAt(0).toUpperCase() + method.slice(1) + ' Confirmation',
      icon: 'pi pi-info-circle',
      acceptIcon: 'pi',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        if (method === 'delete') {
          this.deleteUser(userId);
        } else {
          this.disableUser(userId);
        }
      },
      key: 'confirmDialog'
    });
  }

  confirmRestore(user: any): void {

    this.confirmationService.confirm({
      message: 'Do you want to activate this user?',
      header: 'Activate Confirmation',
      icon: 'pi pi-info-circle',
      acceptIcon: 'pi',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        user.enabled = true;
        this.userService.updateUser(user).subscribe(result => {
          if (result) {
            this.msgs = [{severity: 'success', summary: 'Confirmed', detail: 'User Activated'}];
          }
        });
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
          //  this.uploadFile([$event.target.files[0],$event.target.files[1]]);
            this.uploadFile(file);
            this.fileName = '';
          },
          key: 'confirmDialog',
          reject: () => {
            this.fileName = '';
          },
        });
      } else {
        this.msgs = [{severity: 'error', summary: 'Error', detail: 'Only excel file accepted'}];
      }
    }
  }

  uploadFile(file: any): void {
    this.userService.uploadUsers(file).toPromise().then(data => {
      this.msgs = [{severity: 'success', summary: 'Success', detail: data.message}];
      setTimeout(() => {
       this.loadData();
      }, 1500);
    });
  }

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportUserComponent, {
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


  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '600px',
      data: user,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: result}];
      }
    });
  }
}

