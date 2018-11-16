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
  public reminderAdd;
  public remindToday = new Date();
  public remindTomorrow = new Date(this.remindToday.getFullYear(), this.remindToday.getMonth(),
    this.remindToday.getDate() + 1)

  note = {
    'isArchived': false,
    'id': ''
  }

  constructor(private myHttpService: HttpService) { }
  @Output() messageEvent = new EventEmitter();

  ngOnInit() { }
  /** Method to hide and show the notes */
  finish() {
    if (!this.enterExpression) {
      this.enterExpression = !this.enterExpression;
    }
    this.boxClicked = true;
  }
  /** Method to add the notes *****/
  exit() {
    this.reminderAdd = '';
    if (this.remind != undefined) {
      this.reminderAdd = this.remind
    }
    if (this.checked == false) {
      LoggerService.log(this.color);
      this.myHttpService
        .addNotes('notes/addNotes', {
          'title': document.getElementById('titleId').innerHTML,
          'description': document.getElementById('notesId').innerHTML,
          'labelIdList': JSON.stringify(this.labelChipId),
          'checklist': '',
          'isPined': false,
          'color': this.color,
          'reminder': this.reminderAdd,

        }, this.token).subscribe(
          (data) => {
            LoggerService.log("POST Request is successful ", data);
            this.dataArray = [];
            this.labelChipName = [];
            this.labelChipId = [];
            this.reminderAdd = '';
            this.remind = '';
            this.messageEvent.emit({
            })
            this.color = "#fafafa";
          },
          error => {
            console.log("Error", error);
            this.dataArray = [];
            this.labelChipName = [];
            this.labelChipId = [];
            this.reminderAdd = '';
            this.remind = '';
          })
      this.color = "#fafafa";
    }
    /** Method to add notes along with checklist ****8*/
    else {
      this.reminderAdd = '';
      if (this.remind != undefined) {
        this.reminderAdd = this.remind
      }

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
      LoggerService.log(this.dataArrayCheck, "here is  datacheck array");
      LoggerService.log(document.getElementById('titleId').innerHTML)
      this.myHttpService.addNotes('/notes/addNotes', {
        'title': document.getElementById('titleId').innerHTML,
        'labelIdList': JSON.stringify(this.labelChipId),
        'checklist': JSON.stringify(this.dataArrayCheck),
        'isPined': 'false',
        'color': this.color,
        'reminder': this.reminderAdd,

      }, this.token).subscribe(
        (data) => {
          LoggerService.log('POST successful', data); /** Success api request */
          this.dataArray = [];
          this.labelChipName = [];
          this.labelChipId = [];
          this.reminderAdd = '';
          this.remind = '';
          this.messageEvent.emit({
          })
          this.color = "#fafafa";
        },
        error => {
          this.dataArray = [];
          this.labelChipName = [];
          this.labelChipId = [];
          this.reminderAdd = '';
          this.remind = '';

          LoggerService.log("Error", error);   /** Unsucessfull api request */
        })
      this.color = "#fafafa";
    }
    this.dataArray = [];
    this.arrayRemind = [];
    this.labelChipName = [];
    this.reminderAdd = '';
    this.remind = '';
  }

  /** Method to add color to notes  */
  ChangeColorNotes(event) {
    LoggerService.log(event);
    this.color = event;
  }

  /** Method to add labels to notes  */
  addLabel(event) {
    if (this.labelChipName.indexOf(event) < 0) {
      this.labelChipId.push(event.id);
      this.labelChipName.push(event);
      LoggerService.log(this.labelChipName);
      LoggerService.log(this.labelChipId);
    }
    else {
      this.labelChipId.splice(this.labelChipId.indexOf(event), 1);
      this.labelChipName.splice(this.labelChipName.indexOf(event), 1);
    }
  }

  /** Method to add checklist to notes */
  enter(event) {
    this.i++;
    this.isChecked = this.addCheck
    if (this.data != null && event.code == "Enter") {
      LoggerService.log(event, "keydown");
      var obj = {
        "index": this.i,
        "data": this.data,
        "isChecked": this.isChecked
      }
      this.dataArray.push(obj)
      LoggerService.log(this.dataArray);
      this.data = null;

      this.isChecked = false;
      this.addCheck = false;
    }

  }
  /** Method to delete checklist */
  ondelete(deletedObj) {
    console.log("ondelete function runnig");
    for (var i = 0; i < this.dataArray.length; i++) {
      if (deletedObj.index == this.dataArray[i].index) {
        this.dataArray.splice(i, 1);
        break;
      }
    }
    LoggerService.log(this.dataArray);
  }

  /** Method to add reminder */
  remind;
  arrayRemind = [];
  newvalue(event) {
    this.remind = event;
    this.arrayRemind.push(event)
  }

  /** Method to edit checklist  */
  editing(event, edited) {

    if (event.code == "Enter") {
      LoggerService.log("enter pressed");
      for (var i = 0; i < this.dataArray.length; i++) {
        if (edited.index == this.dataArray[i].index) {
          this.dataArray[i].data == edited.data
        }
      }
      LoggerService.log(this.dataArray);

    }
  }
  /** Method to delete reminder */
  reminderDelete() {
    this.arrayRemind = [];
    this.remind = '';
    this.labelChipName = [];
    this.labelChipId = [];
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


