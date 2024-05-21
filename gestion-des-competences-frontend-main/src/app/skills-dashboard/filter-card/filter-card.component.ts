import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SkillService} from "../services/skill.service";
import {UserService} from "../../users/services/user.service";
import {DepartmentService} from "../../departments/services/department.service";
import {DashboardService} from "../services/dashboard.service";
import {MatOption} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { FunctionsService } from '../services/functions.service';
import { CategoryServiceService } from 'src/app/category/service/category-service.service';

@Component({
  selector: 'app-filter-card',
  templateUrl: './filter-card.component.html',
  styleUrls: ['./filter-card.component.scss']
})
export class FilterCardComponent implements OnInit {
  skills: any;
  connectedUserRole: any;
  departments: any;
  testSelect : any;
  testSelectFun: any;
  testSelectCat: any;
  levels = [
    {
      id: 0,
      value: '0'
    }, {
      id: 1,
      value: '1'
    }, {
      id: 2,
      value: '2'
    }, {
      id: 3,
      value: '3'
    }, {
      id: 4,
      value: '4'
    },
  ];
  users: any;
  functions: any;

  categories: any;
  selectedSkills: FormGroup | undefined;
  selectedDepartments: any;
  selectedFunctions: any;
  selectedUsers: any;
  selectedCategories: any;
  minLevel: any;
  pertinentSkills = 'off';
  role = localStorage.getItem('role');
  @ViewChild('allSelected') private allSelected: MatOption | undefined;
  @Output() resultData = new EventEmitter<any>();

  constructor(private skillService: SkillService,
              private userService: UserService,
              private departmentService: DepartmentService,
              private dashboardService: DashboardService,
              private functionsService: FunctionsService,
              private categoryService: CategoryServiceService,
              private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.testSelect =  false;
    this.testSelectFun = false;
    this.testSelectCat = false;
    this.connectedUserRole = localStorage.getItem('role');
    this.selectedSkills = this.fb.group({
      skills: new FormControl('')
    });
    this.skillService.getAllSkills().subscribe(results => {
      this.skills = results;
    });
    this.departmentService.getAllDepartments().subscribe(results => {
      this.departments = results;
    });
    this.userService.getUsersFullnames().subscribe(results => {
      this.users = results;
    });
    this.functionsService.getFunctions().subscribe((results: any) =>{
      this.functions = results
    });
    this.categoryService.getCategories().subscribe((data: any ) =>{
      this.categories = data
    });
  }

  applyFilter(): any {
    // @ts-ignore
    if ((this.selectedDepartments === undefined && this.selectedUsers === undefined) && this.selectedSkills.controls.skills.value.length < 1) {
      //window.location.reload()
    }
    let skills = '';
    let departments = '';
    let users = '';
    let functions = '';
    let categories = '';
    let pertinent = false;

    // @ts-ignore
    if (this.selectedSkills.controls.skills.value.length > 0) {
      if (this.selectedSkills?.controls.skills) {
        skills = this.transformArray(this.selectedSkills.controls.skills.value);
      }
    }else {
      this.selectedSkills = this.fb.group({
        skills: new FormControl('')
      });
    }

    if (this.selectedDepartments !== undefined) {
      if (this.selectedDepartments) {
        departments = this.transformArray(this.selectedDepartments);
      }
    }
    if (this.selectedUsers !== undefined) {
      if (this.selectedUsers) {
        users = this.transformArray(this.selectedUsers);
      }
    }
    if (this.selectedFunctions !== undefined) {
      if (this.selectedFunctions) {
        functions = this.transformArray(this.selectedFunctions);
      }
    }
    if (this.selectedCategories !== undefined) {
      if (this.selectedCategories) {
        categories = this.transformArray(this.selectedCategories);
      }
    }
    if(this.pertinentSkills == 'on'){
      pertinent = true;
    }
    this.dashboardService.applyFilter(skills, this.minLevel, users, departments, functions, categories, pertinent,0).subscribe((results: any) => {
      if (results) {
        this.resultData.emit({results, skills, categories, pertinent});
      }
    });
  }

  transformArray(array: any): any {
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

  nonSelectionDepartments(){
    if(this.selectedDepartments){
      this.selectedDepartments = []
    }
  }

  nonSelectionFunctions(){
    if (this.selectedFunctions ) {
      this.selectedFunctions = [];
    }
  }

  nonSelectionCategories(){ //this
    if (this.selectedCategories ) {
      this.selectedCategories = [];
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

  searchCategories(event: any){
    this.testSelectCat = true;
    if(event.value[0] === undefined){
      this.skillService.getAllSkills().subscribe(results => {
        this.skills = results;
      });
      this.categoryService.getCategories().subscribe((data: any ) =>{
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

  showPertinentSkills(){
    let skillsArray :any = [];
    let skills = '';
    let departments = '';
    let users = '';
    let functions = '';
    let categories = '';
    let pertinent = false;

    this.skillService.getAllSkills().subscribe((data: any) => {
      data.map((skill: any) => {
        skill.Functions.map((fn: any) => {
          if(fn.DepartmentId == localStorage.getItem('departmentId')){
            skillsArray.push(skill.id);
            skills = this.transformArray(skillsArray);
          }
        })
      })
    })

    this.dashboardService.applyFilter(skills, this.minLevel, users, departments, functions, categories, pertinent,0).subscribe((results: any) => {
      if (results) {
        this.resultData.emit({results, skills, categories, pertinent});
      }
    });
  }

  downloadExcel(){
    let skills = '';
    let departments = '';
    let users = '';
    let functions = '';
    let categories = '';
    let pertinent = false;

    // @ts-ignore
    if (this.selectedSkills.controls.skills.value.length > 0) {
      if (this.selectedSkills?.controls.skills) {
        skills = this.transformArray(this.selectedSkills.controls.skills.value);
      }
    }else {
      this.selectedSkills = this.fb.group({
        skills: new FormControl('')
      });
    }

    if (this.selectedDepartments !== undefined) {
      if (this.selectedDepartments) {
        departments = this.transformArray(this.selectedDepartments);
      }
    }
    if (this.selectedUsers !== undefined) {
      if (this.selectedUsers) {
        users = this.transformArray(this.selectedUsers);
      }
    }
    if (this.selectedFunctions !== undefined) {
      if (this.selectedFunctions) {
        functions = this.transformArray(this.selectedFunctions);
      }
    }
    if (this.selectedCategories !== undefined) {
      if (this.selectedCategories) {
        categories = this.transformArray(this.selectedCategories);
      }
    }
    if(this.pertinentSkills == 'on'){
      pertinent = true;
    }
    this.dashboardService.downloadExcel(skills, this.minLevel, users, departments, functions, categories, pertinent,1).subscribe((data: any) => {
      var blob = new Blob([data]);
      var url = window.URL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.download = "Skills Dashboard.xlsx";
      anchor.href = url;
      anchor.click();
    })
  }
}
