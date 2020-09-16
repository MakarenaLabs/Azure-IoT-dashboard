import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelayStateComponent } from './relay-state.component';

describe('RelayStateComponent', () => {
  let component: RelayStateComponent;
  let fixture: ComponentFixture<RelayStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelayStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelayStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
