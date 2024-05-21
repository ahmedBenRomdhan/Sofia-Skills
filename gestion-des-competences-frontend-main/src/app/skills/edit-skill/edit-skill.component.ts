import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SkillService} from "../services/skill.service";
import {CategoryServiceService} from "../../category/service/category-service.service";
import {Skill} from "../models/Skill";
import { FunctionsService } from 'src/app/skills-dashboard/services/functions.service';
import { SkillFunctionService } from '../services/skill-function.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent implements OnInit {
  @Output() displayDialog = new EventEmitter<boolean>();


  public form: FormGroup = Object.create(null);
  public categories: any;
  public functions: any;
  public msgs: any;
  arr : any = [];


  constructor(private fb: FormBuilder, private skillService: SkillService,
    private functionService: FunctionsService, private skillFunService: SkillFunctionService,
              private categoryService: CategoryServiceService,  public dialogRef: MatDialogRef<EditSkillComponent>,
              @Inject(MAT_DIALOG_DATA) public skill: Skill) { }

  ngOnInit(): void {
    this.functionService.getFunctions().subscribe( (functions: any) =>{
      this.functions = functions;
    })
    this.skill.Functions.map((fun: any) => {
      this.arr.push(fun.id)
    })
    this.form = this.fb.group({
      name: [this.skill.name, Validators.compose([Validators.required])],
      category: [this.skill.Category, Validators.compose([Validators.required])],
      function: [this.arr],
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  validateOnSubmit(form: any): void {
    Object.keys(form.controls).map(x => form.controls[x].markAsTouched({ onlySelf: true }));
  }
  onSubmit(): void {
    if (this.form.valid) {
      const skillEdited = {
        id: this.skill.id,
        name:this.form.value.name,
        CategoryId: this.form.value.category.id,
        oldFun : this.skill.Functions,
        Functions: this.form.value.function
      };
      this.skillService.updateSkill(skillEdited).subscribe(data => {
        this.closeDialog(data.message);
        // delete previous SKill Functions relations
        this.skill.Functions.map((fun: any) => {
          this.skillFunService.deleteSkillFun({id: this.skill.id, oldFun: fun}).subscribe(data => {

          })
        })

        // add new skill functions relations
        this.form.value.function.map((fun: any) => {
          this.skillFunService.createSkillFun({ FunctionId: fun, SkillId: this.skill.id }).subscribe(data => {
          })
        })
      }, err => {
        this.msgs = [{severity: 'error', summary: 'Error', detail: err}];
      });
    }else {
      this.validateOnSubmit(this.form);
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'All fields are required'}];
    }
  }
  close(): void {
    this.displayDialog.emit(false);
  }
  resetForm(): void{
    this.ngOnInit();
    this.dialogRef.close()
  }
  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }

  nonSelectionFunctions(){
    this.form.controls['function'].setValue(null)
  }

}
