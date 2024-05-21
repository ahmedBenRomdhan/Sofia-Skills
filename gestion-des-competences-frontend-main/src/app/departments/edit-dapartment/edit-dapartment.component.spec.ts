import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDapartmentComponent } from './edit-dapartment.component';

describe('EditDapartmentComponent', () => {
  let component: EditDapartmentComponent;
  let fixture: ComponentFixture<EditDapartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDapartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDapartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
