import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDapartmentComponent } from './add-dapartment.component';

describe('AddDapartmentComponent', () => {
  let component: AddDapartmentComponent;
  let fixture: ComponentFixture<AddDapartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDapartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDapartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
