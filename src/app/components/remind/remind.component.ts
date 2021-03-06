import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenu } from '@angular/material';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.scss'],
  exportAs: 'menuInOtherComponent',
})
export class RemindComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();   

  constructor(private noteService: NoteService) { }
  @Input() noteRemindeCard;
  @Output() remindEmit = new EventEmitter();
  @Output() eventValue = new EventEmitter();
  @ViewChild(MatMenu) menu: MatMenu;

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
  
  addReminder(valueTime2) {
    var requestBody =  {
      "noteIdList": [this.noteRemindeCard.id],
      "reminder": valueTime2
    }
    this.noteService.addReminder(requestBody)    
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
        console.log(result);
        this.remindEmit.emit({
        })
      })

  }
  /** Method to display the present time and date */
  addRemindeToday() {
    var value = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      this.currentDate.getDate(), 20, 0, 0, 0)
    this.eventValue.emit(value);
    this.addReminder(value);
  }

  /** Method to display the date, after present date */
  addRemindTomorrow() {
    var valueTime1 = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      this.currentDate.getDate() + 1, 8, 0, 0, 0)
    this.eventValue.emit(valueTime1);
    this.addReminder(valueTime1);
  }

  addRemindNextWeek() {
    var valueTime2 = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      (this.currentDate.getDate() + 7), 8, 0, 0, 0)
    this.eventValue.emit(valueTime2);
    this.addReminder(valueTime2);
  }

  addRemindCustom(date, timing) {
    timing.match('^[0-2][0-3]:[0-5][0-9]$');

    if (timing == '8:00 AM') {
      var valueTime3 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
      this.eventValue.emit(valueTime3);
      this.addReminder(valueTime3);

    } else if (timing == '1:00 PM') {
      var valueTime4 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0)
      this.eventValue.emit(valueTime4);
      this.addReminder(valueTime4);

    } else if (timing == '6:00 PM') {
      var valueTime5 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0)
      this.eventValue.emit(valueTime5);
      this.addReminder(valueTime5);

    } else if (timing == '9:00 PM') {
      var valueTime6 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0)
      this.addReminder(valueTime6);

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
        var valueTime7 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0)
        this.addReminder(valueTime7);

      } else if (ampm == 'PM' || ampm == 'pm') {
        var valueTime8 = new Date(date.getFullYear(), date.getMonth(),
          date.getDate(), hour + 12, minute, 0, 0)
        this.addReminder(valueTime8);
      }
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

