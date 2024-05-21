import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSkillComponent } from './import-skill.component';

describe('ImportSkillComponent', () => {
  let component: ImportSkillComponent;
  let fixture: ComponentFixture<ImportSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
