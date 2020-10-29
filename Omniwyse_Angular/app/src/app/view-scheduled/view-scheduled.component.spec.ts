import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheduledComponent } from './view-scheduled.component';

describe('ViewScheduledComponent', () => {
  let component: ViewScheduledComponent;
  let fixture: ComponentFixture<ViewScheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScheduledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
