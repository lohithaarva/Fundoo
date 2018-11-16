import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.scss']
})
export class RemindComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  @Input() noteRemindeCard;
  @Output() remindEmit = new EventEmitter();
  @Output() eventValue = new EventEmitter();

  accessToken = localStorage.getItem('token');
  currentDate = new Date();
  public minDate = new Date();
  public show = true;
  body = {};



  ngOnInit() {
  }
 /** Displaying the default series */
  reminders: any[] = [

    { value: "morning", viewPeriod: "Morning", viewTime: "08.00 AM" },
    { value: "afternoon", viewPeriod: "Afternoon", viewTime: "01.00 PM" },
    { value: "evening", viewPeriod: "Evening", viewTime: "06.00 PM" },
    { value: "night", viewPeriod: "Night", viewTime: "08.00 PM" }
  ]

  /** Hide and show method while moving on to other menu */
  datePickReminder() {
    this.show = !this.show;
  }
  backPressDatepicker() {
    this.show = true;
  }

  /** To display the current date as defalut */
  reminderBody = {
    "date": new FormControl(new Date()),
    "time": ""
  }

/** Method to display the present time and date */
  addRemindeToday() {
    var value = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      this.currentDate.getDate(), 20, 0, 0, 0)
    this.eventValue.emit(value);
    this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.noteRemindeCard.id],
        "reminder": value,
      }, this.accessToken).subscribe(data => {
        console.log('Post is successfull ', data); //API Post successful
        this.remindEmit.emit({
        })
      })
  }

  /** Method to display the date, after present date */
  addRemindTomorrow() {
    var valueTime1 = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      this.currentDate.getDate() + 1, 8, 0, 0, 0)
    this.eventValue.emit(valueTime1);
    this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.noteRemindeCard.id],
        "reminder": valueTime1
      }, this.accessToken).subscribe(data => {
        console.log('Post is successfull ', data); //API Post successful
        this.remindEmit.emit({
        })
      })
  }
  addRemindNextWeek() {
    var valueTime2 = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      this.currentDate.getDate() + 7, 8, 0, 0, 0)
    this.eventValue.emit(valueTime2);
    this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.noteRemindeCard.id],
        "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
          this.currentDate.getDate() + 7, 8, 0, 0, 0)
      }, this.accessToken).subscribe(data => {
        console.log('Post is successfull ', data); //API Post successful
        this.remindEmit.emit({
        })
      })
  }

  addRemindCustom(date, timing) {
    /** Checking the validation for time format */
    timing.match('^[0-2][0-3]:[0-5][0-9]$');
    // debugger;

    if (timing == '8:00 AM') {
      var valueTime4 = new Date(date.getFullYear(), date.getMonth(),
        date.getDate(), 8, 0, 0, 0)
      this.eventValue.emit(valueTime4);
      this.body = {
        "noteIdList": [this.noteRemindeCard.id],
        "reminder": valueTime4
      }
      this.myHttpService.postArchive('notes/addUpdateReminderNotes',
        localStorage.getItem('token'), this.body).subscribe((result) => {
          console.log(result);  
          this.remindEmit.emit();
        })  //API Post successful

    } else if (timing == '1:00 PM') {
      var valueTime5 = new Date(date.getFullYear(), date.getMonth(),
        date.getDate(), 13, 0, 0, 0)
      this.eventValue.emit(valueTime5);
      this.body = {
        "noteIdList": [this.noteRemindeCard.id],
        "reminder": valueTime5
      }
      this.myHttpService.postArchive('notes/addUpdateReminderNotes',
        localStorage.getItem('token'), this.body).subscribe((result) => {
          console.log(result);
          this.remindEmit.emit();
        })
    } else if (timing == '6:00 PM') {
      var valueTime6 = new Date(date.getFullYear(), date.getMonth(),
        date.getDate(), 18, 0, 0, 0)
      this.eventValue.emit(valueTime6);

      this.body = {
        "noteIdList": [this.noteRemindeCard.id],
        "reminder": valueTime6
      }
      this.myHttpService.postArchive('notes/addUpdateReminderNotes',
        localStorage.getItem('token'), this.body).subscribe((result) => {
          console.log(result);
          this.remindEmit.emit();
        })
    } else if (timing == '9:00 PM') {
      var valueTime7 = new Date(date.getFullYear(), date.getMonth(),
        date.getDate(), 21, 0, 0, 0)
      this.eventValue.emit(valueTime7);

      this.body = {
        "noteIdList": [this.noteRemindeCard.id],
        "reminder": valueTime7
      }
      this.myHttpService.postArchive('notes/addUpdateReminderNotes',
        localStorage.getItem('token'), this.body).subscribe((result) => {
          console.log(result);
          this.remindEmit.emit();
        })
    } else if (timing == this.reminderBody.time) {
      var x;
      var splitTime = this.reminderBody.time.split("", 8);
      var hour = Number(splitTime[0] + splitTime[1]);
      var minute = Number(splitTime[3] + splitTime[4]);
      var ampm = (splitTime[6] + splitTime[7]);
      console.log(ampm);
      console.log(hour);
      console.log(minute);
      if (ampm == 'AM' || ampm == 'am') {
        var valueTime8 = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
          hour, minute, 0, 0)
        this.eventValue.emit(valueTime8);

        this.body = {
          "noteIdList": [this.noteRemindeCard.id],
          "reminder": valueTime8
        }
        this.myHttpService.postArchive('notes/addUpdateReminderNotes',
          localStorage.getItem('token'), this.body).subscribe((result) => {
            console.log(result);
            this.remindEmit.emit();
          })
      } else if (ampm == 'PM' || ampm == 'pm') {
        var valueTime9 = new Date(date.getFullYear(), date.getMonth(),
          date.getDate(), hour + 12, minute, 0, 0)
        this.eventValue.emit(valueTime9);
        this.body = {
          "noteIdList": [this.noteRemindeCard.id],
          "reminder": valueTime9
        }
        this.myHttpService.postArchive('/notes/addUpdateReminderNotes',
          this.body, this.accessToken).subscribe((data) => {
            this.remindEmit.emit({})
          })

      }

    }
  }

}
