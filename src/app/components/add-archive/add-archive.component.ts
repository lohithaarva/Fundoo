/************************************************************************************************
*  Execution       :   1. default node         cmd> add-archive.ts 
*        
*  Purpose         :  To archive a noteCard and display in archive segment.
* 
*  Description    
* 
*  @file           : add-archive.ts
*  @overview       : To archive a noteCard and display in archive segment.
*  @module         : add-archive.ts - This is optional if expeclictly its an npm or local package
*  @author         : LohithaShree <lohitha.arva@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NoteService } from '../../core/services/noteservice/note.service';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-add-archive',/**A string value which represents the component on browser at 
                              execution time */
  templateUrl: './add-archive.component.html',/**External templating process to define html
                              tags in component */
  styleUrls: ['./add-archive.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */

export class AddArchiveComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() noteArchiveCard;
  @Output() archiveEvent = new EventEmitter();
  @Output() unarchiveEvent = new EventEmitter();
  /**EventEmitter:creates an instance of this class that can delliver events  */

  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() { }
  constructor(public noteService: NoteService,
    private snackBar: MatSnackBar) { }
  
  /** Method to archive notecards */
  cardArchive() {
    var RequestBody = {
      "isArchived": true,
      "noteIdList": [this.noteArchiveCard.id]
    }
    this.noteService.archive(RequestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log("archive note", data);
        this.snackBar.open("Note archived successfully,please check in archive", "archive", {
          duration: 10000,
        });
        this.archiveEvent.emit();
      })
  }

  /** Method to unarchive notecards */
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
    })
  }

  /** A callback method that performs custom clean-up, invoked immediately after a directive, 
       * pipe, or service instance is destroyed. */
      ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
      }
}
