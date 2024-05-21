import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, PrimeNGConfig} from 'primeng-lts/api';
import {MatDialog} from '@angular/material/dialog';
import {CategoryServiceService} from '../service/category-service.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../users/models/User';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AddCategoryComponent} from '../add-category/add-category.component';
import {Skill} from '../../skills/models/Skill';
import {EditCategoryComponent} from '../edit-category/edit-category.component';
import { ImportCategoryComponent } from '../import-category/import-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              private categoryService: CategoryServiceService,
              public dialog: MatDialog) {
  }

  categories: any;
  totalRecords = 0;
  statuses: any;
  loading = true;
  msgs: any;
  fileName = '';
  fileTypes: string[] = ['.csv', '.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'];
  displayedColumns: string[] = ['name', 'action'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: result}];

      }
    });
  }

  openEditCategoryDialog(skill: Skill): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '500px',
      data: skill,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
        this.msgs = [{severity: 'success', summary: 'Confirmed', detail: result}];
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.primengConfig.ripple = true;
  }

  deleteCategory(id: any): void {
    this.categoryService.deleteCategory(id).subscribe(result => {
      this.msgs = [{severity: 'success', summary: 'Confirmed', detail: 'Category deleted'}];
      this.loadData();
    }, () => {
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'Please try again !'}];
    });
  }

  loadData(): void {
    this.categories = [];
    this.categoryService.getCategories().subscribe(categories => {
      categories.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.categories = categories;
      this.totalRecords = categories.length;
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, () => {
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'Please refresh this page !'}];

    });
  }

  confirmDelete(categoryId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptIcon: 'pi',
      rejectIcon: 'pi',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.deleteCategory(categoryId);
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
    this.categoryService.uploadCategories(file).toPromise().then(data => {
      this.msgs = [{severity: 'success', summary: 'Success', detail: data.message}];
      setTimeout(() => {
        this.loadData();
      }, 1500);
    });
  }

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportCategoryComponent, {
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
