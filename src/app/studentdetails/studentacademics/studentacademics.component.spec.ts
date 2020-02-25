import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentacademicsComponent } from './studentacademics.component';

describe('StudentacademicsComponent', () => {
  let component: StudentacademicsComponent;
  let fixture: ComponentFixture<StudentacademicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentacademicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentacademicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
