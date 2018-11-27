import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { MatDialog } from '@angular/material';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { DataService } from "../../core/services/dataservice/data.service";
import { LoggerService } from '../../core/services/logger/logger.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() word;
  @Input() length;
  @Input() deleteNotesForever;
  @Input() globalSearch;
  @Input() cardAdded;
  @Output() eventEmit = new EventEmitter();
  private messageDeleted: boolean;
  private condition = true;
  private checkArray = [];
  private modifiedCheckList;
  private remindToday = new Date();
  private remindTomorrow = new Date(this.remindToday.getFullYear(), this.remindToday.getMonth(),
  this.remindToday.getDate() + 1)


  constructor(public dialog: MatDialog, private noteService: NoteService,
    private data: DataService,
    private router: Router) {
    this.data.currentDelete
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        if (message) {
          this.eventEmit.emit({
          })
        }
      })
    this.data.currentView
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        this.condition = message;
      })
  }

  messageDelete(event) {
    LoggerService.log("i m here for deleting the card")
    this.eventEmit.emit({
    })
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      data: note,
      width: '450px',
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        LoggerService.log(result);
        this.eventEmit.emit({
        })
      });
  }

  remove(labelId, noteId) {
    var requestBody = {
      "noteId": noteId,
      "lableId": labelId
    }
    this.noteService.removeLabelFromNotes(requestBody, noteId, labelId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(Response => {
        LoggerService.log(Response);
        this.eventEmit.emit({})
      })
  }

  reminderDelete(note) {
    var id = note.id;
    LoggerService.log('reminder note id is', id);
    var requestBody = {
      "noteIdList": [id]
    }
    this.noteService.deleteReminder(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          LoggerService.log("POST Request is successful ", data);
          this.eventEmit.emit({});
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
  ngOnInit() { }

  openCollaboratorDialog(noteData): void {
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, { 
      width: '600px',
      data: noteData,  
    });
    
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

