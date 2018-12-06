/************************************************************************************************
*  Execution       :   1. default node         cmd> labels.ts 
*        
*  Purpose         :  To display labels on notecards
* 
*  Description    
* 
*  @file           : labels.ts
*  @overview       :  To display labels on notecards
*  @module         : labels.ts - This is optional if expeclictly its an npm or local package
*  @author         : LohithaShree <lohitha.arva@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { OnDestroy, Component, OnInit, Inject, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog-component/dialog-component.component';
import { DataService } from '../../core/services/dataservice/data.service';
import { Inote, Label } from '../../core/models/Inote'
import { LabelTrashDialogComponent } from '../label-trash-dialog/label-trash-dialog.component';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
/**A componenet can be reused throughout the application & even in other applications */

@Component({
  selector: 'app-labels',/**A string value which represents the component on browser at 
  execution time */
  templateUrl: './labels.component.html',/**External templating process to define html
  tags in component */
  styleUrls: ['./labels.component.scss']/**It is used to provide style of components */
})
export class LabelsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public show = true;
  constructor(private noteService: NoteService,
    private data: DataService, public dialog: MatDialog) { }
  private value1: any = [];
  private array = [] as Array<Label>

  @Output() updateLabel = new EventEmitter()
  @ViewChild('newLabel') newLabel: ElementRef;
  @ViewChild('myLabel') myLabel: ElementRef;
  clear: any;
  globalLabelDelete: any;
  alertMessage;

  onNoClick(): void {
  }
  ngOnInit() {
    this.delete();
  }

  id = localStorage.getItem('userId')
  token = localStorage.getItem('token');
  addLabel() {
    var label = this.newLabel.nativeElement.innerHTML
    for (var i = 0; i < this.value1.length; i++) {
      if (this.value1[i].label == label) {
        this.alertMessage = 'Label already exists'
        return false;
      }
    }
    var requestBody = {
      "label": this.newLabel.nativeElement.innerHTML,
      "isDeleted": false,
      "userId": this.id
    }
    this.noteService.addLabel(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log("POST Request is successful ", data);
        this.updateLabel.emit({
        })
        this.delete();
      })
  }

  labelDelete(val) {
    this.openLabelDialog(val)
  }

  delete() {
    this.array = [];
    this.value1 = [];
    this.noteService.getNoteLabellist()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          console.log("GET Request is successful ", data);
          this.updateLabel.emit({
          })
          var labelNoteList: Label[] = data['data']['details']

          for (var i = 0; i < labelNoteList.length; i++) {
            if (labelNoteList[i].isDeleted == false) {
              this.array.push(labelNoteList[i])
            }
          }
          this.value1 = this.array;
          console.log(this.value1);
        })
  }

  edit(val) {
    this.show = true;
    var requestBody = {
      "label": this.myLabel.nativeElement.innerHTML,
      "isDeleted": false,
      "id": val,
      "userId": localStorage.getItem('userId')
    }
    this.noteService.editLabel(val, requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        console.log("UPDATE Request is successful ", data);
        this.updateLabel.emit({
        })
        console.log(data);
      })
  }
  edit2(id) {
    this.show = true;
    this.show = id;
  }

  close() {
    this.newLabel.nativeElement.innerHTML = ' ';
  }
  openLabelDialog(val): void {
    const dialogRef = this.dialog.open(LabelTrashDialogComponent, {
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(result);
        if (result == true) {
          this.show = true;
          this.noteService.deleteLabel(val).subscribe(
            (data) => {
              console.log("DELETE Request is successful ", data);
              this.delete();
              this.data.changeDelete(true);
            })
        }
        console.log('The dialog was closed');
        this.close = result;
      });
  }
/** A callback method that performs custom clean-up, invoked immediately after a directive, 
     * pipe, or service instance is destroyed. */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
