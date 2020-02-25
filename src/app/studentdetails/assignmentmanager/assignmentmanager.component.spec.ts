import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentmanagerComponent } from './assignmentmanager.component';

describe('AssignmentmanagerComponent', () => {
  let component: AssignmentmanagerComponent;
  let fixture: ComponentFixture<AssignmentmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
