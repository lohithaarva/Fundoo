import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';
import { CoreModule } from '@angular/flex-layout';
import { ColorComponent } from '../color/color.component';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  enterExpression = true;
  boxClicked = true;
  checklist = {};
  token = localStorage.getItem('token')
  changeColor = localStorage.getItem('color');
  color;
  inputArea = [];
  checkBoxArray = [];
  labelChipName = [];
  labelChipId = [];
  public dataArray = [];
  public dataArrayCheck = [];
  public isChecked = false;
  public addCheck = false;
  public modifiedCheckList;
  checked;
  public status = "open";
  public i = 0;
  data;
  dataarray = [];

  note = {
    'isArchived' : false
  }

  constructor(private myHttpService: HttpService) { }
  @Output() messageEvent = new EventEmitter();

  ngOnInit() { }
  finish() {
    if (!this.enterExpression) {
      this.enterExpression = !this.enterExpression;
    }
    this.boxClicked = true;
  }

  exit() {
    if (this.checked == false) {
      console.log(this.color);
      this.myHttpService
        .addNotes('notes/addNotes', {
          'title': document.getElementById('titleId').innerHTML,
          'description': document.getElementById('notesId').innerHTML,
          'labelIdList': JSON.stringify(this.labelChipId),
          'checklist': '',
          'isPined': false,
          'color': this.color

        }, this.token).subscribe(
          (data) => {
            console.log("POST Request is successful ", data);
            this.messageEvent.emit({
            })
            this.color = "#fafafa";
          },
          error => {
            console.log("Error", error);
          })
      this.color = "#fafafa";
    }

    else {

      for (var i = 0; i < this.dataArray.length; i++) {
        if (this.dataArray[i].isChecked == true) {
          this.status = "close"
        }
        var apiObj = {
          "itemName": this.dataArray[i].data,
          "status": this.status
        }
        this.dataArrayCheck.push(apiObj)
        this.status = "open"
      }
      console.log(this.dataArrayCheck, "here is  datacheck array");
      console.log(document.getElementById('titleId').innerHTML)
      this.myHttpService.addNotes('/notes/addNotes', {
        'title': document.getElementById('titleId').innerHTML,
        'labelIdList': JSON.stringify(this.labelChipId),
        'checklist': JSON.stringify(this.dataArrayCheck),
        'isPined': 'false',
        'color': this.color
      }, this.token).subscribe(
        (data) => {
          LoggerService.log('POST successful', data);
          this.dataArray = [];
          
          this.messageEvent.emit({
          })
        },
        error => {
          this.dataArray = [];
          console.log("Error", error);

        })
    }
    this.dataArray=[];
  }

  ChangeColorNotes(event) {
    console.log(event);
    this.color = event;
  }

  addLabel(event) {
    if (this.labelChipName.indexOf(event) < 0) {
      this.labelChipId.push(event.id);
      this.labelChipName.push(event);
      console.log(this.labelChipName);
      console.log(this.labelChipId);
    }
    else {
      this.labelChipId.splice(this.labelChipId.indexOf(event), 1);
      this.labelChipName.splice(this.labelChipName.indexOf(event), 1);
    }
  }
  
  enter(event) {
    this.i++;
    this.isChecked = this.addCheck
    if (this.data != null && event.code == "Enter") {
      console.log(event, "keydown");
      var obj = {
        "index": this.i,
        "data": this.data,
        "isChecked": this.isChecked
      }
      this.dataArray.push(obj)
      console.log(this.dataArray);
      this.data = null;

      this.isChecked = false;
      this.addCheck = false;
    }

  }
  ondelete(deletedObj) {
    console.log("ondelete function runnig");
    for (var i = 0; i < this.dataArray.length; i++) {
      if (deletedObj.index == this.dataArray[i].index) {
        this.dataArray.splice(i, 1);
        break;
      }
    }
    console.log(this.dataArray);
  }

  editing(event, edited) {

    if (event.code == "Enter") {
      console.log("enter pressed");
      for (var i = 0; i < this.dataArray.length; i++) {
        if (edited.index == this.dataArray[i].index) {
          this.dataArray[i].data == edited.data
        }
      }
      console.log(this.dataArray);

    }
  }

  // checkBox(checkList) {

  //   if (checkList.status == "open") {
  //     checkList.status = "close"
  //   }
  //   else {
  //     checkList.status = "open"
  //   }
  //   console.log(checkList);
  //   this.modifiedCheckList = checkList;
  //   // this.update();
  // }

  

}


