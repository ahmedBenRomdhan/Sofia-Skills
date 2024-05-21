import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SkillsEvalService } from '../services/skills-eval.service';

@Component({
  selector: 'app-skills-selection',
  templateUrl: './skills-selection.component.html',
  styleUrls: ['./skills-selection.component.scss']
})
export class SkillsSelectionComponent implements OnInit {

  user: any;
  nonSelectedSkillCtrl = new FormControl('');
  SelectedSkillCtrl = new FormControl('');
  allSkillsAffected: any;
  allSkillsNonAffected: any;
  filtredSkillsAffected: any;
  filtredSkillsNonAffected: any;
  skills : any[] = [];
  SearchFormNonAffected!: FormGroup;
  SearchFormAffected!: FormGroup;
  selectedOptions: any;
  nonSelectedOptions: any;
  testAffected = false;
  testNonAffected = false;
  finalSelectedOptions: any = [];
  finalNonSelectedOptions: any = [];
  affectedTest = false;
  nonAffectedTest = false;
  testLowest = false;

  constructor(
    public dialogRef: MatDialogRef<SkillsSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private skillService: SkillsEvalService,
    private formBuilder : FormBuilder
    ) { }

  ngOnInit(): void {
    this.SearchFormNonAffected = this.formBuilder.group({
      nonSelectedSkillCtrl: [''],
    });
    this.SearchFormAffected = this.formBuilder.group({
      SelectedSkillCtrl: [''],
    });
    this.user = this.data;
    this.getAllSkills(this.data.id);
  }

  getAllSkills(user: any) : any{
    this.skillService.getSkillEvaluationsByUser(user).subscribe((data) =>{
      this.allSkillsAffected = this.filtredSkillsAffected = data.filter((item: any)=>  item.Skill.enabled && item.affected);
      if(this.allSkillsAffected.length != 0){
        this.affectedTest = true;
      }
      this.allSkillsNonAffected = this.filtredSkillsNonAffected = data.filter((item: any)=>  item.Skill.enabled && !item.affected);
      if(this.allSkillsNonAffected.length){
        this.nonAffectedTest = true;
      }
      return data;
    })
  }

  onChange(event: any){
    console.log(event)
    if (!this.SearchFormNonAffected.controls['nonSelectedSkillCtrl'].value) {
      this.testNonAffected = false;
    } else {
      this.testNonAffected = true;
        this.filtredSkillsNonAffected = this.allSkillsNonAffected.filter((skill: any) =>  skill.Skill.enabled && skill.Skill.name.toLowerCase().includes(this.SearchFormNonAffected.controls['nonSelectedSkillCtrl'].value.toLowerCase()))
      }
  }

  onChangeAffected(event: any){
    if (!this.SearchFormAffected.controls['SelectedSkillCtrl'].value) {
      this.testAffected = false;
    } else {
      this.testAffected = true;
        this.filtredSkillsAffected = this.allSkillsAffected.filter((skill: any) => skill.Skill.enabled && skill.Skill.name.toLowerCase().includes(this.SearchFormAffected.controls['SelectedSkillCtrl'].value.toLowerCase()) )
      }
  }

  toNonAffectedSkill(){
    if(this.selectedOptions){
      this.selectedOptions.map((option: any) =>{
        this.allSkillsNonAffected.unshift(option);
          let index = this.allSkillsAffected.indexOf(option)
          this.allSkillsAffected.splice(index,1);
          if(this.testAffected === true){
            let index2 = this.filtredSkillsAffected.indexOf(option);
            this.filtredSkillsAffected.splice(index2,1);
          }
          this.finalSelectedOptions = [...this.finalSelectedOptions, option];
          if(this.finalNonSelectedOptions.indexOf(option) != -1){
            let index = this.finalNonSelectedOptions.indexOf(option);
            this.finalNonSelectedOptions.splice(index, 1)
          }
      })

      if(this.allSkillsNonAffected.length != 0){
        this.nonAffectedTest = true;
      }else{
        this.nonAffectedTest = false;
      }

      if(this.allSkillsAffected.length != 0){
        this.affectedTest = true;
      }else{
        this.affectedTest = false;
      }
    }
  }

  toAffectedSkill(){
    if(this.nonSelectedOptions){
    this.nonSelectedOptions.map((option: any) =>{
      this.allSkillsAffected.unshift(option);
      let index = this.allSkillsNonAffected.indexOf(option);
      this.allSkillsNonAffected.splice(index,1);
      if(this.testNonAffected === true){
        let index2 = this.filtredSkillsNonAffected.indexOf(option);
        this.filtredSkillsNonAffected.splice(index2,1);
      }
      this.finalNonSelectedOptions = [...this.finalNonSelectedOptions, option];
      if(this.finalSelectedOptions.indexOf(option) != -1){
        let index = this.finalSelectedOptions.indexOf(option);
        this.finalSelectedOptions.splice(index, 1)
      }
    })
    if(this.allSkillsAffected.length != 0){
      this.affectedTest = true;
    }else{
      this.affectedTest = false;
    }

    if(this.allSkillsNonAffected.length != 0){
      this.nonAffectedTest = true;
    }else{
      this.nonAffectedTest = false;
    }
    }
  }

  // Search for index of the item and replace it by the item who has index -1 in the list
  higherIndex(){
    if(this.selectedOptions){
      let indexInitial = this.allSkillsAffected.indexOf(this.selectedOptions[0]);
      this.selectedOptions.map((option: any) => {
        let index = this.allSkillsAffected.indexOf(option);
          if( indexInitial > 0 ){
            this.allSkillsAffected.splice( index , 1 );
            this.allSkillsAffected.splice( index - 1 , 0 , option );
          }
      });
    }
  }

  // Search for index of the item and replace it by the item who has index +1 in the list
  lowerIndex(){
    if(this.selectedOptions){
      let len = this.selectedOptions.length;
      let indexEnd = this.allSkillsAffected.indexOf(this.selectedOptions[len - 1]);
      this.selectedOptions.slice(0).reverse().map((option: any) => {
        let index = this.allSkillsAffected.indexOf(option);
        if( indexEnd != this.allSkillsAffected.length -1){
          this.allSkillsAffected.splice(index,1);
          this.allSkillsAffected.splice(index + 1, 0, option);
        }
        })
    }
  }

  // Search for index and add the item in the top of list
  highestIndex(){
    this.selectedOptions.slice(0).reverse().map((option: any) => {
      let index = this.allSkillsAffected.indexOf(option);
        this.allSkillsAffected.splice(index,1);
        this.allSkillsAffected.splice(0,0,option);
    });
    this.testLowest = true;
  }

  // search for index and add the item in the bottom of list
  lowestIndex(){
      this.selectedOptions.map((option: any) => {
        let index = this.allSkillsAffected.indexOf(option);
        this.allSkillsAffected.splice(index,1);
        this.allSkillsAffected.push(option);
      });
  }

  onSubmit(){
    //add non affected skills
    this.applyChangesOnDatabase()

    this.finalNonSelectedOptions.map( (option: any) =>{
      let optionX = {...option, affected: true, evaluatorId: this.user.id, index: this.allSkillsAffected.indexOf(option)}
      this.skillService.updateSkillAffect(optionX).subscribe((data)=>{})
    })

    //add affected skills
    this.finalSelectedOptions.map( (option: any) =>{
      let optionX = {...option, affected: false, evaluatorId: this.user.id, index: -1}
      this.skillService.updateSkillAffect(optionX).subscribe((data)=>{})
    })
    this.dialogRef.close()
  }

  applyChangesOnDatabase(){
    this.allSkillsAffected.map((item: any) =>{
      let skill = {...item, evaluatorId: this.user.id, index: this.allSkillsAffected.indexOf(item)}
      this.skillService.updateSkillAffect(skill).subscribe((data: any) =>{
      })
    })
  }

  add(a: any, b:any) {
    this.allSkillsNonAffected.push(a+b)
    return a +b ;
  }
}
