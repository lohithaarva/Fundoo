/************************************************************************************************
*  Execution       :   1. default node         cmd> archive.ts 
*        
*  Purpose         :  To display notecards which are archived and also perform functionality
                      when clicked.
* 
*  Description    
* 
*  @file           : archive.ts
*  @overview       : To display notecards which are archived and also perform functionality
                     when clicked
*  @module         : archive.ts - This is optional if expeclictly its an npm or local package
*  @author         : LohithaShree <lohitha.arva@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Inject, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { NoteCardComponent } from '../note-card/note-card.component';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';

/**To use components in other modules , we have to export them */
export interface DialogData {
  title: string;
  description: string;
  id: string;
}
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-dialog-component',/**A string value which represents the component on browser at 
                                  execution time */
  templateUrl: './dialog-component.component.html',/**External templating process to define html
                                  tags in component */
  styleUrls: ['./dialog-component.component.scss'],/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class DialogComponentComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  /**Input and Output are two decorators in Angular responsible for 
      * communication between two components*/
  /**EventEmitter:creates an instance of this class that can delliver events  */
  @Output() updateEvent = new EventEmitter();
  @Output() eventEmit = new EventEmitter();
  private checklist = false;
  private modifiedCheckList;
  private title;
  private note;
  private tempArray = [];
  private newList;
  private newData: any = {};

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<NoteCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public snackBar: MatSnackBar,
    private noteService: NoteService) { }

  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */

  ngOnInit() {
    if (this.data['noteCheckLists'].length > 0) {
      this.checklist = true;
    }
    this.tempArray = this.data['noteCheckLists']
  }

  onNoClick(id): void {
    var requestBody = {
      "noteId": [this.data.id],
      "title": document.getElementById('titleId').innerHTML,
      "description": document.getElementById('notesId').innerHTML
    }
    this.noteService.noteUpdate(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {  /**registers handlers for events emitted by this instance */
        LoggerService.log('response', data);
        this.dialogRef.close();
        this.updateEvent.emit({
        })
      })
    this.dialogRef.close();
  }

  removelabel(labelId, noteId) {
    var requestBody = {
      "noteId": noteId,
      "lableId": labelId 
    }
    this.noteService.removeLabelFromNotes(requestBody, noteId, labelId)
    .pipe(takeUntil(this.destroy$))
      .subscribe( /**registers handlers for events emitted by this instance */
        Response => {
        LoggerService.log(Response);
        this.eventEmit.emit({})
      })
  }

  update() {

    if (this.checklist == false) {
      var id = this.data['id'];
      this.title = document.getElementById('titleId').innerHTML;
      this.note = document.getElementById('notesId').innerHTML;
      var requestBody = {
        "noteId": [id],
        "title": this.title,
        "description": this.note,
        "color": "",
        "noteLabels": ""
      }
      this.noteService.noteUpdate(requestBody)
      .subscribe(data => {
        this.snackBar.open("note updated successfully", "update", {
          duration: 10000,
        });
        this.eventEmit.emit({})
      })
    }
    else {
      var apiData = {
        "itemName": this.modifiedCheckList.itemName,
        "status": this.modifiedCheckList.status
      }
      this.noteService.updateChecklist(JSON.stringify(apiData), this.data.id,
        this.modifiedCheckList.id)
        .subscribe( /**registers handlers for events emitted by this instance */
          response => {
          LoggerService.log(response);
          this.eventEmit.emit({})
        })
    }
  }

  editing(editedList, event) {

    LoggerService.log(editedList);
    if (event.code == "Enter") {
      this.modifiedCheckList = editedList;
      this.update();
    }
  }

  checkBox(checkList) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedCheckList = checkList;
    this.update();
  }

  public removedList;
  removeList(checklist) {
    LoggerService.log(checklist)
    this.removedList = checklist;
    this.removeCheckList()
  }

  removeCheckList() {
    this.noteService.removeChecklist(null, this.data.id, this.removedList.id)
      .subscribe( /**registers handlers for events emitted by this instance */
      response => {
        LoggerService.log(response);
        for (var i = 0; i < this.tempArray.length; i++) {
          if (this.tempArray[i].id == this.removedList.id) {
            this.tempArray.splice(i, 1)
          }
        }
      })
  }
  public adding = false;
  public addCheck = false;
  public status = "open"

  addList(event) {
    if (this.newList != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
    if (event.code == "Enter") {
      if (this.addCheck == true) {
        this.status = "close";
      }
      else {
        this.status = "open"
      }
      this.newData = {
        "itemName": this.newList,
        "status": this.status
      }
      this.noteService.addChecklist(this.newData, this.data.id)
        .subscribe(   /**registers handlers for events emitted by this instance */
          response => {
          LoggerService.log(response);
          this.newList = null;
          this.addCheck = false;
          this.adding = false;
          LoggerService.log(response['data'].details);
          this.tempArray.push(response['data'].details)
          LoggerService.log(this.tempArray)
        })
    }
  }

  reminderDelete(data) {
    var id = data.id;
    LoggerService.log('reminder note id is', id);
    var requestBody = {
      "noteIdList": [id]
    }
    this.noteService.deleteReminder(requestBody).subscribe(data => {
      LoggerService.log("POST Request is successful ", data);
      this.eventEmit.emit({})
    })
  }

  reminderOff(cuttOff) {
    var currentReminderTime = new Date().getTime();
    var timeValue = new Date(cuttOff).getTime();
    if (timeValue > currentReminderTime) {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  openCollaboratorDialog(noteData): void {
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
      width: '600px',
      data: noteData,

    });
  }


}
