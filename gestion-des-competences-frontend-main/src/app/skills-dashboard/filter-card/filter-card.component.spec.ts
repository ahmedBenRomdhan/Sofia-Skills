import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { FilterCardComponent } from './filter-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SkillService } from '../services/skill.service';
import { DashboardService } from '../services/dashboard.service';

fdescribe('FilterCardComponent', () => {
  let component: FilterCardComponent;
  let fixture: ComponentFixture<FilterCardComponent>;
  let skillsServiceMock: any;
  let dashboardMock: any;

  beforeEach(async () => {
    skillsServiceMock = jasmine.createSpyObj('SkillService', ['getAllSkills']);
    skillsServiceMock.getAllSkills.and.returnValue(of([]));
    dashboardMock = jasmine.createSpyObj('dashboardService', ['applyFilter']);
    dashboardMock.applyFilter.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [ FilterCardComponent ],
      imports: [HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule],
      providers: [
        {provide: SkillService, useValue: skillsServiceMock},
        {provide: DashboardService, useValue: dashboardMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test ngOnInit()', () => {
    fixture.detectChanges();
    expect(skillsServiceMock.getAllSkills).toHaveBeenCalledTimes(1);
    expect(component.testSelect).toBe(false)
  });

  it('Click button apply filter', fakeAsync (() => {
    let btn = fixture.debugElement.nativeElement.querySelector('button');
    component.selectedCategories = ['6', '5'];
    fixture.detectChanges();
    spyOn(component, 'transformArray');
    btn.click();
    expect(component.transformArray).toHaveBeenCalledOnceWith(['6', '5']);
    expect(dashboardMock.applyFilter).toHaveBeenCalledTimes(1);
  }));

  it('Test transformArray function', () => {
    component.selectedFunctions = ['6', '5'];
    let res = component.transformArray(component.selectedFunctions);
    expect(res).toEqual('6,5');
    component.selectedFunctions = ['6', '5', '8', '9'];
    expect(component.transformArray(component.selectedFunctions)).toEqual('6,5,8,9')
  });
});