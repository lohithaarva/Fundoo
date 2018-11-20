import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NoteService } from '../../core/services/noteservice/note.service';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { httpService } from 'src/app/core/services/httpservice/http.service';

@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrls: ['./add-archive.component.scss']
})
export class AddArchiveComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() noteArchiveCard;
  @Output() archiveEvent = new EventEmitter();
  @Output() unarchiveEvent = new EventEmitter();

  constructor(public noteService: NoteService,
    public snackBar: MatSnackBar,
    public service: httpService) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngOnInit() { }
  token = localStorage.getItem('token')

  cardArchive() {
    var RequestBody = {
      "isArchived": true,
      "noteIdList": [this.noteArchiveCard.id]
    }
    this.noteService.archive(RequestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log("archive note", data);
        this.snackBar.open("note archived successfully,please check in archive", "archive", {
          duration: 10000,
        });
        this.archiveEvent.emit();
      }),
      error => {
        LoggerService.log("Error", error);
      }
  }

  unarchiveNotes() {
    var RequestBody = {
      "isArchived": false,
      "noteIdList": [this.noteArchiveCard.id]
    }
    this.noteService.archive(RequestBody).subscribe(data => {
      LoggerService.log("unarchive note", data);
      this.unarchiveEvent.emit();
      this.snackBar.open("note unarchived successfully,please check in notes", "notes", {
        duration: 10000,
      });
    }),
      error => {
        LoggerService.log("Error", error);

      }
  }

}
