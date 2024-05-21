import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCardCurveComponent } from './top-card-curve.component';

describe('TopCardCurveComponent', () => {
  let component: TopCardCurveComponent;
  let fixture: ComponentFixture<TopCardCurveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCardCurveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCardCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
