import { OnDestroy, Component, OnInit, Inject, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog-component/dialog-component.component';
import { DataService } from '../../core/services/dataservice/data.service';
import { Inote, Label } from '../../core/models/Inote'
import { LabelTrashDialogComponent } from '../label-trash-dialog/label-trash-dialog.component';
import { NoteService } from 'src/app/core/services/noteservice/note.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
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
      },
        error => {
          console.log("Error", error);
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
        },
        error => {
          console.log("Error", error);
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
      },
        error => {
          console.log("Error", error);
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
              // this.data.changeDelete(true);
            },
            error => {
              console.log("Error", error);
            })
        }
        console.log('The dialog was closed');
        this.close = result;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
