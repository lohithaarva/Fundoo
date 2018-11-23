import { Component, OnInit, Input} from '@angular/core';
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
  @Input() collaboratorPop
  constructor(private dialog: MatDialog) { }

  openCollaboratorDialog(): void {
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, { 
      width: '600px',
      data: this.collaboratorPop
      
    });
 
 
    

    dialogRef.afterClosed()
    .subscribe(result => {
      console.log('The dialog was closed');
      this.close = result;  
    });

  }


  ngOnInit() {
  }

}
