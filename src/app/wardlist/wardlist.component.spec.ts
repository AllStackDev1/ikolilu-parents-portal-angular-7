import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardlistComponent } from './wardlist.component';

describe('WardlistComponent', () => {
  let component: WardlistComponent;
  let fixture: ComponentFixture<WardlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
