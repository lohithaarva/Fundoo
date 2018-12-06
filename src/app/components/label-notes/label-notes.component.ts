/************************************************************************************************
*  Execution       :   1. default node         cmd> label-notes.ts 
*        
*  Purpose         :  To display notecards which consists of labels
* 
*  Description    
* 
*  @file           : label-notes.ts 
*  @overview       :To display notecards which consists of labels
*  @module         : label-notes.ts  - This is optional if expeclictly its an npm or local package
*  @author         : LohithaShree <lohitha.arva@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  selector: 'app-label-notes',/**A string value which represents the component on browser at 
                              execution time */
  templateUrl: './label-notes.component.html',/**External templating process to define html
                              tags in component */
  styleUrls: ['./label-notes.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */

export class LabelNotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private noteService: NoteService, public route: ActivatedRoute) { }
  private labelName;
  private labelArray = [];
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */

  ngOnInit() {
    console.log("particular label is been arrived");
    this.route.params.subscribe(
      (params: Params) => {
        this.labelName = params['labelName']
        this.getLabelNotes(this.labelName)
        console.log("i m here now");

      })
  }
  //**Method to notecards which consists of labels */
  getLabelNotes(labelName) {
    this.noteService.getLabelNotes(labelName)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        console.log("successfull", response);
        this.labelArray = response['data'].data
        console.log(this.labelArray);
      })

  }
  /** A callback method that performs custom clean-up, invoked immediately after a directive, 
     * pipe, or service instance is destroyed. */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}



