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
import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Inote } from '../../core/models/Inote';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-archive',/**A string value which represents the component on browser at 
                          execution time */
  templateUrl: './archive.component.html',/**External templating process to define html
                           tags in component */
  styleUrls: ['./archive.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class ArchiveComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private noteService: NoteService) { }
  private notes = [] as Array<Inote>
  /**Input and Output are two decorators in Angular responsible for 
      * communication between two components*/
  @Output() emitArchive = new EventEmitter();
  @Input() noteArchiveCard;
  /**EventEmitter:creates an instance of this class that can delliver events  */
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {
    this.archiveNotes();
  }
  /**method that receives the notecards which are archived */
  archiveNotes() {
    this.noteService.getArchiveNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(  /**registers handlers for events emitted by this instance */
        (data) => {
          this.notes = [];
          var archiveNotes: Inote[] = data['data']['data']
          LoggerService.log("GET Request is successful ", archiveNotes);
          for (var i = archiveNotes.length - 1; i >= 0; i--) {
            this.notes.push(archiveNotes[i]);
          }
        })
  }

  eventEmitarchive(event) {
    this.archiveNotes();
  }
/** A callback method that performs custom clean-up, invoked immediately after a directive, 
     * pipe, or service instance is destroyed. */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}

