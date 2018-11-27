import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Form should be valid '),async(()=>{
    expect(component.info.email.toEqual('kajol@gmail.com'));
    expect(component.info.password.toEqual('Lohitha@12345'));
    })
    
    it('Invalid Form'),async(()=>{
    expect(component.info.email.toEqual(''));
    expect(component.info.password.toEqual(''));
    })
});
