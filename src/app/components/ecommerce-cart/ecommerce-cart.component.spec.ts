import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceCartComponent } from './ecommerce-cart.component';

describe('EcommerceCartComponent', () => {
  let component: EcommerceCartComponent;
  let fixture: ComponentFixture<EcommerceCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
