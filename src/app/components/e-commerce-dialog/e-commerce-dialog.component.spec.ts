import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommerceDialogComponent } from './e-commerce-dialog.component';

describe('ECommerceDialogComponent', () => {
  let component: ECommerceDialogComponent;
  let fixture: ComponentFixture<ECommerceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ECommerceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ECommerceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
