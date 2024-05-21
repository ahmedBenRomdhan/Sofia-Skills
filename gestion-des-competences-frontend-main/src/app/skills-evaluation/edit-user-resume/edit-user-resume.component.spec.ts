import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserResumeComponent } from './edit-user-resume.component';

describe('EditUserResumeComponent', () => {
  let component: EditUserResumeComponent;
  let fixture: ComponentFixture<EditUserResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
