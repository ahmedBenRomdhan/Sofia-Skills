import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RoleService} from "../../roles/service/role.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Role} from "../../roles/models/Role";
import {Category} from "../models/Category";
import {CategoryServiceService} from "../service/category-service.service";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  msgs: any;
  constructor(private fb: FormBuilder, private router: Router,
              private categoryService: CategoryServiceService, public dialogRef: MatDialogRef<EditCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Category) { }
  ngOnInit(): void {this.form = this.fb.group({
    name: [this.data.name, Validators.compose([Validators.required])],
  });
  }
  onSubmit(): void {
    if (this.form.valid) {
      const newCategory = {
        id : this.data.id,
        name: this.form.value.name,
      };
      this.categoryService.updateCategory(newCategory).subscribe(data => {
        this.closeDialog(data.message);
      });
    }else {
      this.validateOnSubmit(this.form);
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'All fields are required'}];
    }
  }
  cancel(): void{
    this.ngOnInit();
    this.dialogRef.close()
  }
  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
  validateOnSubmit(form: any): void {
    Object.keys(form.controls).map(x => form.controls[x].markAsTouched({ onlySelf: true }));
  }

}
