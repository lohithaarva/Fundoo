import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QandAComponent } from './qand-a.component';

describe('QandAComponent', () => {
  let component: QandAComponent;
  let fixture: ComponentFixture<QandAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QandAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QandAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return 1 if like is true', () => {
    let ArrayLike=[{
      like:Boolean,
      userId:"5c011ff8019ffc00400b0eb7"
    }]
    let ques={
      like:ArrayLike
    }
    expect(component.like(ques)).toBeTruthy();
  });
  
  it('should return 0 if like is false', () => {
    let ArrayLike=[{
      like:String,
      userId:"asdfghjkloiuytreewqdvfhj"
    }]
    let ques={
      like:ArrayLike
    }
    expect(component.like(ques)).toBeFalsy();
  })
});














