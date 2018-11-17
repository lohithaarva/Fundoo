import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { MatDialog } from '@angular/material';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { HttpService } from '../../core/services/httpservice/http.service';
import { DataService } from "../../core/services/dataservice/data.service";
import { LoggerService } from '../../core/services/logger/logger.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  messageDeleted: boolean;
  condition = true;
  public checkArray = [];
  public modifiedCheckList;
  public remindToday = new Date();
  public remindTomorrow = new Date(this.remindToday.getFullYear(), this.remindToday.getMonth(),
    this.remindToday.getDate() + 1)


  constructor(public dialog: MatDialog, private myHttpService: HttpService,
     private data: DataService,
     private router: Router) {
    this.data.currentDelete.subscribe(message => {
      if (message) {
        this.eventEmit.emit({
        })
      }
    })

    this.data.currentView.subscribe(message => {
      this.condition = message;
    })
  }
  @Input() deleteNotesForever;
  @Input() globalSearch;
  @Input() cardAdded;
  // @Input() unarchiveEvent;
  @Output() eventEmit = new EventEmitter();

  messageDelete(event) {
    LoggerService.log("i m here for deleting the card")
    this.eventEmit.emit({
    })
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      data: note,
      width: '750px',
      panelClass: 'myapp-no-padding-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      LoggerService.log(result);
      this.eventEmit.emit({
      })
    });
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

  reminderDelete(note) {
    var id = note.id;
    LoggerService.log('reminder note id is', id);
    this.myHttpService.postArchive('/notes/removeReminderNotes',
      {
        "noteIdList": [id]
      },
      localStorage.getItem('token')).subscribe(
        (data) => {
          LoggerService.log("POST Request is successful ", data);
          this.eventEmit.emit({});
        },
        error => {
          LoggerService.log("Error", error);
        })
  }

  checkBox(checkList, note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    LoggerService.log(checkList);
    this.modifiedCheckList = checkList;
  }
  archiveEvent(event) {
    this.eventEmit.emit({
    })

  }

  unarchiveEvent(event) {
    this.eventEmit.emit({})
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

  labelPage(result) {
    var labelName = result.label;
    this.router.navigate(['home/labelNotes/' + labelName]);
  }
  ngOnInit() {

  }
}

