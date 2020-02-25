import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWardComponent } from './add-new-ward.component';

describe('AddNewWardComponent', () => {
  let component: AddNewWardComponent;
  let fixture: ComponentFixture<AddNewWardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewWardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
