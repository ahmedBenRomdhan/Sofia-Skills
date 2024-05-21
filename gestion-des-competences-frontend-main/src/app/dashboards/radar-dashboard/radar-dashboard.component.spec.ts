import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarDashboardComponent } from './radar-dashboard.component';

describe('RadarDashboardComponent', () => {
  let component: RadarDashboardComponent;
  let fixture: ComponentFixture<RadarDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
