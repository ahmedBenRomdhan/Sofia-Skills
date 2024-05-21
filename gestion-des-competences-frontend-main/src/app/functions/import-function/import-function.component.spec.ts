import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFunctionComponent } from './import-function.component';

describe('ImportFunctionComponent', () => {
  let component: ImportFunctionComponent;
  let fixture: ComponentFixture<ImportFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportFunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
