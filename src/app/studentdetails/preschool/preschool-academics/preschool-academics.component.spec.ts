import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolAcademicsComponent } from './preschool-academics.component';

describe('PreschoolAcademicsComponent', () => {
  let component: PreschoolAcademicsComponent;
  let fixture: ComponentFixture<PreschoolAcademicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreschoolAcademicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreschoolAcademicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
