import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form should be invalid', async(()=>{
    component.info.controls['email'].setValue('');
    component.info.controls['email'].setValue('@bb.AA.com');
    component.info.controls['email'].setValue('AA.23@bbb.com');

    component.info.controls['password'].setValue('');
    component.info.controls['password'].setValue('ak');
    component.info.controls['password'].setValue('aaaaaaaaaaaaaaaaaaa');

    component.info.controls['firstName'].setValue('');
    component.info.controls['firstName'].setValue('ku');

    component.info.controls['lastName'].setValue('');
    component.info.controls['lastName'].setValue('hj');

    component.info.controls['phoneNumber'].setValue('');
    component.info.controls['phoneNumber'].setValue('@678');
    component.info.controls['phoneNumber'].setValue('67@#8999999');
    component.info.controls['phoneNumber'].setValue('111111');
    component.info.controls['phoneNumber'].setValue('78987678@#');
    
    component.info.controls['service'].setValue('');
    expect(component.info.valid).toBeFalsy();
    
}))
it('form should be valid', async(()=>{
  component.info.controls['firstName'].setValue('Kajol');
  component.info.controls['firstName'].setValue('jdskjckssieufdciksxefr');
  component.info.controls['lastName'].setValue('jain');
  component.info.controls['lastName'].setValue('fyuyfyufuu');
  component.info.controls['email'].setValue('abccc@bbbb.com');
  component.info.controls['password'].setValue('Lohitha@12345');
  component.info.controls['phoneNumber'].setValue('2341528617');
  expect(component.info.valid).toBeTruthy();
}))
it('form invalid when empty', () => {
  expect(component.info.valid).toBeFalsy();
});

});
