import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteCardComponent } from '../note-card/note-card.component';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteService } from 'src/app/core/services/noteservice/note.service';


export interface DialogData {
  title: string;
  description: string;
  id: string;
}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss'],

})
export class DialogComponentComponent implements OnInit {
  token = localStorage.getItem('token')
  @Output() updateEvent = new EventEmitter();
  @Output() eventEmit = new EventEmitter();
  // @Input() deleteNotesInDialog;
  public checklist = false;
  public modifiedCheckList;
  public title;
  public note;
  public tempArray = [];
  public newList;
  public newData: any = {};

  constructor(public dialogRef: MatDialogRef<NoteCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public snackBar: MatSnackBar,
    private noteService: NoteService) { }

  onNoClick(id): void {
    var requestBody = {
      "noteId": [this.data.id],
      "title": document.getElementById('titleId').innerHTML,
      "description": document.getElementById('notesId').innerHTML
    }
    this.noteService.noteUpdate(requestBody).subscribe(data => {
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
      .subscribe(Response => {
        LoggerService.log(Response);
        this.eventEmit.emit({})
      }, error => {
        LoggerService.log(error)
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
      this.noteService.noteUpdate(requestBody).subscribe(data => {
        // console.log(data,"data");
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
      // var url = "notes/" + this.data['id'] + "/checklist/" + this.modifiedCheckList.id + "/update";
      this.noteService.updateChecklist(JSON.stringify(apiData), this.data.id, this.modifiedCheckList.id)
        .subscribe(response => {
          LoggerService.log(response);
          this.eventEmit.emit({})
        })
    }
    error => {
      LoggerService.log(error);
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
    // var url = "notes/" + this.data['id'] + "/checklist/" + this.removedList.id + "/remove";
    this.noteService.removeChecklist(null, this.data.id, this.removedList.id)
      .subscribe(response => {
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
      // var url = "notes/" + this.data['id'] + "/checklist/add";
      this.noteService.addChecklist(this.newData, this.data.id)
        .subscribe(response => {
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
    },
      error => {
        LoggerService.log("Error", error);
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

  ngOnInit() {
    if (this.data['noteCheckLists'].length > 0) {
      this.checklist = true;
    }
    this.tempArray = this.data['noteCheckLists']



  }

}
