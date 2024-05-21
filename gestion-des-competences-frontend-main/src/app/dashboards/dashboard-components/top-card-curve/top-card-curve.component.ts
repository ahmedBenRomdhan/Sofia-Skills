import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DepartmentService} from '../../../departments/services/department.service';
import {SkillService} from '../../../skills-dashboard/services/skill.service';
import {UserService} from '../../../users/services/user.service';
import {ChartService} from "../../services/chart.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import { FunctionService } from 'src/app/functions/services/function.service';
import { CategoryServiceService } from 'src/app/category/service/category-service.service';

@Component({
  selector: 'app-top-card-curve',
  templateUrl: './top-card-curve.component.html',
  styleUrls: ['./top-card-curve.component.scss']
})
export class TopCardCurveComponent implements OnInit {
  connectedUserRole: any;
  departments: any;
  selectedDepartment: any;
  selectedFunctions: any;
  selectedCategories: any;
  users: any;
  selectedUsers: any;
  skills: any;
  functions: any;
  categories: any;
  selectedSkills: FormGroup | undefined;
  selectedYears: any;
  testSelect : any;
  testSelectCat: any;
  pertinentSkills = 'off';
  @ViewChild('allSelected') private allSelected: MatOption | undefined;
  @Input() testComponenet !: boolean;
  @Input() years !: any[];
  @Output() resultData = new EventEmitter<any>();
  @Output() resultDataRadar = new EventEmitter<any>();

  constructor(private departmentService: DepartmentService,
    private skillService: SkillService,
    private functionsService: FunctionService,
    private categoriesService: CategoryServiceService,
    private chartService: ChartService,
    private fb: FormBuilder,
    private userService: UserService) { }

    ngOnInit(): void {
      this.testSelect =  false;
      this.testSelectCat = false;
      this.connectedUserRole = localStorage.getItem('role');
      this.selectedSkills = this.fb.group({
        skills: new FormControl('')
      });
      this.departmentService.getAllDepartments().subscribe(results => {
        if (results) {
          this.departments = results;
        }
      });
      this.userService.getUsersFullnames().subscribe(results => {
        if (results) {
          this.users = results;
        }
      });
      this.skillService.getAllSkills().subscribe(results => {
        if (results) {
          this.skills = results;
        }
      });
      this.functionsService.getFunctions().subscribe(results =>{
        if(results){
          this.functions = results;
        }
      });
      this.categoriesService.getCategories().subscribe(results => {
        this.categories = results;
      })
    }

    applyFilter(): any {
      let skills = '';
      let department = '';
      let fun = '';
      let category = '';
      let user = '';
      let year = '';
      let pertinent = false;
  
      if (this.selectedSkills?.controls.skills) {
        skills = this.transformArrayToString(this.selectedSkills.controls.skills.value);
      }
      if (this.selectedDepartment) {
        department = this.selectedDepartment;
      }
      if (this.selectedUsers) {
        user = this.selectedUsers;
      }
      if(this.selectedCategories){
        category = this.selectedCategories;
      }
      if(this.selectedYears){
        year = this.selectedYears;
      }
      if(this.selectedFunctions){
        fun = this.selectedFunctions;
      }
      if(this.pertinentSkills == 'on'){
        pertinent = true;
      }

      if(this.testComponenet){
        this.chartService.applyFilterTime(skills, user, department, category, pertinent, fun).subscribe((results: any) => {
          if (results) {
            this.resultData.emit(results);
          }
        });
      }else{
        this.chartService.applyFilterRadar(skills, user, department, category, pertinent, fun, year).subscribe((results: any) => {
          if (results) {
            if(year != ''){
              this.resultDataRadar.emit(results.filter((element: any) => element.created.slice(3,8) == year));
            }else{
              this.resultDataRadar.emit(results);
            }
          }
        });
      }
    }

    transformArrayToString(array: any): any {
      return array.toString();
    }


    tosslePerOne(all: any): any {
      if (this.allSelected && this.allSelected.selected) {
        this.allSelected.deselect();
        return false;
      }

      if (this.allSelected && this.selectedSkills &&
        this.selectedSkills.controls.skills.value.length === this.skills.length) {
        this.allSelected.select();
      }
    }

    toggleAllSelection(): any {
      if (this.allSelected && this.selectedSkills && this.allSelected.selected) {
        this.selectedSkills.controls.skills
          .patchValue([...this.skills.map((item: any) => item.id), 0]);
      } else {
        // @ts-ignore
        this.selectedSkills.controls.skills.patchValue([]);
      }
    }

    nonSelection(){
      if (this.selectedSkills ) {
      this.selectedSkills.controls.skills.patchValue([]);
      }
    }

    nonSelectionUsers(){
      if (this.selectedUsers ) {
        this.selectedUsers = [];
      }
    }

    nonSelectionFunctions(){
      if (this.selectedFunctions ) {
        this.selectedFunctions = [];
      }
    }

    nonSelectionCategories(){
      if (this.selectedCategories ) {
        this.selectedCategories = [];
      }
    }

    nonSelectionDepartments(){
      if (this.selectedDepartment ) {
        this.selectedDepartment = [];
      }
    }

    searchFunctions(event: any){
      this.testSelect = true;
      if(event.value[0] === undefined){
        this.testSelect = false;
        this.departmentService.getAllDepartments().subscribe(results => {
          this.departments = results;
        });
        this.userService.getUsersFullnames().subscribe(results => {
          this.users = results;
        });
        this.functionsService.getFunctions().subscribe((results: any) =>{
          this.functions = results;
        })
      }else{
        this.nonSelectionFunctions()
        this.nonSelectionUsers()
        this.functionsService.getFunctions().subscribe((functions: any) => {
        this.functions = functions.filter((fun: any) => event.value.includes(fun.DepartmentId));
        });

      this.userService.getUsers().subscribe((users: any) => {

        this.users = users.filter((user: any) => event.value.includes(user.Department.id));
        });
      }
    }

    searchSkills(event: any){
      this.testSelectCat = true;
      if(event.value[0] === undefined){
        this.skillService.getAllSkills().subscribe(results => {
          this.skills = results;
        });
        this.categoriesService.getCategories().subscribe((data: any ) =>{
          this.categories = data
        })
      }else{
        if(this.selectedSkills){
         this.selectedSkills.controls.skills.patchValue([]);
        }
        this.skillService.getAllSkills().subscribe((skills: any) => {
        this.skills = skills.filter((skill: any) => event.value.includes(skill.categoryId));

        });
      }
    }

    searchUsers(event: any){
      this.testSelect = true;
      if(event.value[0] === undefined){
        this.testSelect = false;
        if(this.selectedDepartment){
          this.testSelect = true;
          this.userService.getUsers().subscribe((results) => {
            this.users = results.filter(
              (user: any) => this.selectedDepartment.includes(user.Department.id)
            );
          });
        }else{
          this.userService.getUsersFullnames().subscribe(results => {
            this.users = results;
          });
        }
      }else{
        this.nonSelectionUsers()

      this.userService.getUsers().subscribe((users: any) => {
        this.users = users.filter((user: any) => event.value.includes(user.Function.id));
        });
      }
    }

}
