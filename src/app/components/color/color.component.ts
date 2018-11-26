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
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-color',/**A string value which represents the component on browser at 
  execution time */
  templateUrl: './color.component.html',/**External templating process to define html
  tags in component */
  styleUrls: ['./color.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class ColorComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private noteService: NoteService) { }
  /**Input and Output are two decorators in Angular responsible for 
      * communication between two components*/
  @Input() noteColorCard;
  @Output() emitColor = new EventEmitter;
  @Output() emitColorNotes = new EventEmitter<string>()
  /**EventEmitter:creates an instance of this class that can delliver events  */

  /**Array of color scheme */
  colorArray = [['#fafafa', '#ff8a80', '#ffd180', '#ffff8d'],
  ['#ccff90', '#a7ffeb', '#80d8ff', '#82b1ff'],
  ['#b388ff', '#f8bbd0', '#d7ccc8', '#cfd8dc']];
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() { }

  /**Method to change color of notecards */
  changeColor(colorcode) {
    this.emitColorNotes.emit(colorcode)
    if (this.noteColorCard != undefined) {
      this.noteService.changeColor({
        "color": colorcode,
        "noteIdList": [this.noteColorCard.id]
      }) .pipe(takeUntil(this.destroy$))
      .subscribe( /**registers handlers for events emitted by this instance */
        (data) => {
          LoggerService.log("Color Request is successful", data);
          this.emitColor.emit()
          localStorage.setItem('color', colorcode);
        })
    }
  }
  /** A callback method that performs custom clean-up, invoked immediately after a directive, 
     * pipe, or service instance is destroyed. */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
