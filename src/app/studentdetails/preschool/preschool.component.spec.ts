import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolComponent } from './preschool.component';

describe('PreschoolComponent', () => {
  let component: PreschoolComponent;
  let fixture: ComponentFixture<PreschoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreschoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
