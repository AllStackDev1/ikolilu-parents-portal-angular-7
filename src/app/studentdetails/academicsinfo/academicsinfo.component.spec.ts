import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicsinfoComponent } from './academicsinfo.component';

describe('AcademicsinfoComponent', () => {
  let component: AcademicsinfoComponent;
  let fixture: ComponentFixture<AcademicsinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicsinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicsinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
