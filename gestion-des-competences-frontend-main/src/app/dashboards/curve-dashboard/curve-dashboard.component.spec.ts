import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurveDashboardComponent } from './curve-dashboard.component';

describe('CurveDashboardComponent', () => {
  let component: CurveDashboardComponent;
  let fixture: ComponentFixture<CurveDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurveDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurveDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
