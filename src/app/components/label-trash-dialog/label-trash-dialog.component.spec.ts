import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTrashDialogComponent } from './label-trash-dialog.component';

describe('LabelTrashDialogComponent', () => {
  let component: LabelTrashDialogComponent;
  let fixture: ComponentFixture<LabelTrashDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelTrashDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelTrashDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
