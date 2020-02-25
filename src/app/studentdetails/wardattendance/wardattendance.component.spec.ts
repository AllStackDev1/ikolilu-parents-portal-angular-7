import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardattendanceComponent } from './wardattendance.component';

describe('WardattendanceComponent', () => {
  let component: WardattendanceComponent;
  let fixture: ComponentFixture<WardattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
