import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../roles/service/role.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryServiceService} from "../service/category-service.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public form: FormGroup = Object.create(null);
  public msgs: any;

  constructor(private fb: FormBuilder, private categoryService: CategoryServiceService,
              private router: Router, public dialogRef: MatDialogRef<AddCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }
  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      description: [null],
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      const newCategory = {
        name: this.form.value.name,
        description: this.form.value.description,
      };
      this.categoryService.createCategory(newCategory).subscribe(data => {
        this.closeDialog(data.success);
      }, er => {
        this.msgs = [{severity: 'error', summary: 'Error', detail: er}];

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
  validateOnSubmit(form: any): void {
    Object.keys(form.controls).map(x => form.controls[x].markAsTouched({ onlySelf: true }));
  }

}
