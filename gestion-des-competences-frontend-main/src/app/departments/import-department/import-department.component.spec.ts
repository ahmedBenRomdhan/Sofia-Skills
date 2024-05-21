import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDepartmentComponent } from './import-department.component';

describe('ImportDepartmentComponent', () => {
  let component: ImportDepartmentComponent;
  let fixture: ComponentFixture<ImportDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
