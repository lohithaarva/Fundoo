import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteCardComponent } from '../note-card/note-card.component';
import { HttpService } from '../../core/services/httpservice/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';


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
    private myHttpService: HttpService) { }

  onNoClick(id): void {
    this.myHttpService.noteUpdate('notes/updateNotes', {
      "noteId": [this.data.id],
      "title": document.getElementById('titleId').innerHTML,
      "description": document.getElementById('notesId').innerHTML
    }, this.token).subscribe(data => {
      LoggerService.log('response', data);
      this.dialogRef.close();
      this.updateEvent.emit({
      })
    })
    this.dialogRef.close();
  }

  remove(labelId, noteId) {
    // if (this.noteDeleteCard!= null && markLabel.isChecked==null){    
    this.myHttpService.addNotes("/notes/" + noteId + "/addLabelToNotes/" + labelId + "/remove", {
      "noteId": noteId,
      "lableId": labelId
    }, localStorage.getItem('token'))
      .subscribe(Response => {
        LoggerService.log(Response);
        this.eventEmit.emit({})
      }, error => {
        LoggerService.log(error)
      })
    // }
  }

  update() {

    if (this.checklist == false) {
      var id = this.data['id'];
      this.title = document.getElementById('titleId').innerHTML;
      this.note = document.getElementById('notesId').innerHTML;
      var model = {
        "noteId": [id],
        "title": this.title,
        "description": this.note,
        "color": "",
        "noteLabels": ""

      }
      this.myHttpService.addNotes("notes/updateNotes", model, this.token).subscribe(data => {
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
      var url = "notes/" + this.data['id'] + "/checklist/" + this.modifiedCheckList.id + "/update";
      this.myHttpService.postDel(url, JSON.stringify(apiData), this.token).subscribe(response => {
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
    var url = "notes/" + this.data['id'] + "/checklist/" + this.removedList.id + "/remove";

    this.myHttpService.postDel(url, null, this.token).subscribe((response) => {
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
      var url = "notes/" + this.data['id'] + "/checklist/add";
      this.myHttpService.postDel(url, this.newData, this.token)
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

  reminderDelete(id) {
    // var id = note.id;
    LoggerService.log('reminder note id is', id);
    this.myHttpService.postArchive('/notes/removeReminderNotes',
      {
        "noteIdList": [id]
      },
      localStorage.getItem('token')).subscribe(
        (data) => {
          LoggerService.log("POST Request is successful ", data);
          this.eventEmit.emit({})
        },
        error => {
          LoggerService.log("Error", error);
        })
  }

  ngOnInit() {
    if (this.data['noteCheckLists'].length > 0) {
      this.checklist = true;
    }
    this.tempArray = this.data['noteCheckLists']



  }

}
