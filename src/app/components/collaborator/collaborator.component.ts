import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';
import { DialogData } from '../dialog-component/dialog-component.component';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  private close: string;
  @Input() collaboratorPop;
  @Output() collaboratorEvent = new EventEmitter();
  public isDeleted = false;

  constructor(private dialog: MatDialog) { }
  openCollaboratorDialog(): void {
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, { 
      width: '600px',
      data: this.collaboratorPop
      
    });
    dialogRef.afterClosed()
    .subscribe(result => {
      this.close = result;  
    });
  }
  openCollaboratorDivision(){
  this.collaboratorEvent.emit({
  })
  }

  ngOnInit() {
    if (this.collaboratorPop != undefined && this.collaboratorPop.isDeleted==true){
      this.isDeleted=true;
    }
  }

}
