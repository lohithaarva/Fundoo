import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemaindersComponent } from './remainders.component';

describe('RemaindersComponent', () => {
  let component: RemaindersComponent;
  let fixture: ComponentFixture<RemaindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemaindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemaindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
