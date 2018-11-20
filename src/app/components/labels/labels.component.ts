import { AfterViewInit, Component, OnInit, Inject, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Response } from 'selenium-webdriver/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog-component/dialog-component.component';
import { DataService } from '../../core/services/dataservice/data.service';
import { LabelTrashDialogComponent } from '../label-trash-dialog/label-trash-dialog.component';
import { NoteService } from 'src/app/core/services/noteservice/note.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  public show = true;
  constructor(private noteService: NoteService,
    private data: DataService, public dialog: MatDialog) { }
  value1: any = [];
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
    var array = [];
    this.value1=[];
    this.noteService.getNoteLabellist().subscribe(
    (data) => {
          console.log("GET Request is successful ", data);
          this.updateLabel.emit({
          })
          for (var i = 0; i < data['data']['details'].length; i++) {
            if (data['data']['details'][i].isDeleted == false) {
              array.push(data['data']['details'][i])
            }
          }
          this.value1 = array;
          console.log(this.value1);
          // this.value1.filter()

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

    dialogRef.afterClosed().subscribe(result => {
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
}
