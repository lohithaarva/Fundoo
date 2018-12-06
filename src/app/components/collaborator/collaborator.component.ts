/************************************************************************************************
*  Execution       :   1. default node         cmd> collaborator.ts 
*        
*  Purpose         :  To add a person who works jointly on an activity.
* 
*  Description    
* 
*  @file           : collaborator.ts
*  @overview       : To add a person who works jointly on an activity.
*  @module         : collaborator.ts - This is optional if expeclictly its an npm or local package
*  @author         : LohithaShree <lohitha.arva@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';
/**A componenet can be reused throughout the application & even in other applications */

@Component({
  selector: 'app-collaborator',/**A string value which represents the component on browser at 
                                execution time */
  templateUrl: './collaborator.component.html',/**External templating process to define html
                                tags in component */
  styleUrls: ['./collaborator.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class CollaboratorComponent implements OnInit {
  private close: string;
  /**Input and Output are two decorators in Angular responsible for 
      * communication between two components*/
  /**EventEmitter:creates an instance of this class that can delliver events  */
  @Input() collaboratorPop;
  @Output() collaboratorEvent = new EventEmitter();
  public isDeleted = false;
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {
    if (this.collaboratorPop != undefined && this.collaboratorPop.isDeleted == true) {
      this.isDeleted = true;
    }
  }
  constructor(private dialog: MatDialog) { }
  /**Method to display dialog */
  openCollaboratorDialog(): void {
    if (this.collaboratorPop != undefined) {
      const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
        width: '600px',
        data: this.collaboratorPop
      });
      dialogRef.afterClosed()
        .subscribe(result => {
          this.close = result;
        });
    }
  }
  /**EventEmitter:creates an instance of this class that can delliver events  */
  openCollaboratorDivision() {
    this.collaboratorEvent.emit({
    })
  }
}
