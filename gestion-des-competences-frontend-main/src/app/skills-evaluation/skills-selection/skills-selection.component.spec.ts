import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SkillsSelectionComponent } from './skills-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { SkillsEvalService } from '../services/skills-eval.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

fdescribe('SkillsSelectionComponent', () => {
  let component: SkillsSelectionComponent;
  let fixture: ComponentFixture<SkillsSelectionComponent>;
  let skillsServiceEvalMock: any;
  const dialogMock = {
    close: () => { }
    };

  beforeEach(async () => {
    skillsServiceEvalMock = jasmine.createSpyObj('SkillsEvalService', ['getSkillEvaluationsByUser', 'updateSkillAffect']);
    skillsServiceEvalMock.getSkillEvaluationsByUser.and.returnValue(of([]));
    skillsServiceEvalMock.updateSkillAffect.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports:[
              ReactiveFormsModule,
              FormsModule,
              MatListModule ],
      declarations: [ SkillsSelectionComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: SkillsEvalService, useValue: skillsServiceEvalMock},
        {provide: MatDialogRef, useValue: dialogMock},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call getSkillEvaluationsByUser on the ProductService one time on ngOnInit', () => {
    fixture.detectChanges();
    expect(skillsServiceEvalMock.getSkillEvaluationsByUser).toHaveBeenCalledTimes(1);
  });

/*   it('Should call toAffectedSkill function and update the two arrays', () =>{
    component.nonSelectedOptions=[{id: 1, name: '', Skill: {name: 'option1'}}, {id: 1, name: '', Skill: {name: 'option2'}}]
    component.allSkillsAffected = [{id: 1, name: '', Skill: {name: 'affected'}}];
    component.allSkillsNonAffected = [{id: 1, name: '', Skill: {name: 'option1'}}, {id: 1, name: '', Skill: {name: 'option2'}}];
    fixture.detectChanges();
    let list = fixture.debugElement.queryAll(By.css('.btn_app'));
    let rightButton = fixture.debugElement.query(By.css('#rightButton'));
    rightButton.nativeElement.click();
    fixture.detectChanges();
    expect(list.length).toBe(6);
    expect(rightButton.nativeElement.id).toBe('rightButton');
    //expect(component.allSkillsAffected).toEqual([{id: 1, name: '', Skill: {name: 'affected'}}, {id: 1, name: '', Skill: {name: 'option1'}}, {id: 1, name: '', Skill: {name: 'option2'}}]);
    expect(component.allSkillsNonAffected).toEqual([]);
  }); */

  it('Test if HTML input is binded with TS formControl', fakeAsync (() =>{

    fixture.detectChanges();
      let input = fixture.debugElement.queryAll(By.css('input'));
      let el = input[0].nativeElement;

      expect(el.value).toBe('');
      el.value = 'f';
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      expect(el.value).toBe('f');
      tick();
      spyOn(component, 'onChange'); 

      expect(component.SearchFormNonAffected.controls['nonSelectedSkillCtrl'].value).toBe('f');
  }));

  it('Test onSubmit function', () => {
    component.finalNonSelectedOptions=['s', 'd'];
    component.finalSelectedOptions=['s']
    spyOn(component, 'applyChangesOnDatabase')
    component.onSubmit();
    //expect(component.applyChangesOnDatabase).toHaveBeenCalledTimes(1);
    expect(skillsServiceEvalMock.updateSkillAffect).toHaveBeenCalledTimes(3);
  });

  it('Test add index button', () => {
    component.selectedOptions=[ {id: 3, name: '', Skill: {name: 'option3'}}]
    component.allSkillsAffected = [{id: 1, name: '', Skill: {name: 'option1'}}, {id: 2, name: '', Skill: {name: 'option2'}}, {id: 3, name: '', Skill: {name: 'option3'}}];
    spyOn(component, 'higherIndex');
    let rightButton = fixture.debugElement.query(By.css('#higherButton'));
    rightButton.nativeElement.click();
    expect(component.higherIndex).toHaveBeenCalledTimes(1);
    //expect(component.allSkillsAffected).toEqual([ {id: 1, name: '', Skill: {name: 'option1'}}, {id: 3, name: '', Skill: {name: 'option3'}}, {id: 2, name: '', Skill: {name: 'option2'}}])
  });

  it('Spy on add function', () =>{
    //spyOn(component, 'add')
    component.allSkillsNonAffected = ['2'];
    let res = component.add(3,2);
    expect(res).toBe(5);
    expect(component.allSkillsNonAffected).toEqual(['2', 5]);
  }); 
});
