import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
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
  accessToken = localStorage.getItem('token');
  currentDate = new Date();
  public minDate= new Date();
  public show = true;
  body = {};
  
  

  ngOnInit() {
  }
 
  reminders :any[]=[
   
    {value:"morning",viewPeriod:"Morning",viewTime:"8.00 AM"},
    {value:"afternoon",viewPeriod:"Afternoon",viewTime:"1.00 PM"},
    {value:"evening",viewPeriod:"Evening",viewTime:"6.00 PM"},
    {value:"night",viewPeriod:"Night",viewTime:"8.00 PM"}
  ]

  datePickReminder(){
    this.show = !this.show;
  }
  backPressDatepicker(){
    this.show = true;
  }

  reminderBody = {
    "date": new FormControl(new Date()),
    "time": ""
  }


  addRemindeToday() {
      this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
      "noteIdList": [this.noteRemindeCard.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),                   
      this.currentDate.getDate(), 8, 0, 0, 0)
      }, this.accessToken).subscribe(data => {
      console.log('Post is successfull ', data);
      this.remindEmit.emit({
      })
      })
      }

      addRemindTomorrow() {
      this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
      "noteIdList": [this.noteRemindeCard.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      this.currentDate.getDate() + 1, 8, 0, 0, 0)
      }, this.accessToken).subscribe(data => {
      console.log('Post is successfull ', data);
      this.remindEmit.emit({
      })
      })
      }
      addRemindNextWeek() {
      this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
      "noteIdList": [this.noteRemindeCard.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      this.currentDate.getDate() + 7, 8, 0, 0, 0)
      }, this.accessToken).subscribe(data => {
      console.log('Post is successfull ', data);
      this.remindEmit.emit({
      })
      })
      }

      addRemindCustom(date, timing) {
debugger;
        timing.match('^[0-2][0-3]:[0-5][0-9]$');
   
        if (timing == '8:00 AM') {
          this.body = {
            "noteIdList": [this.noteRemindeCard.id],
            "reminder": new Date(date.getFullYear(), date.getMonth(), 
            date.getDate(), 8, 0, 0, 0)
          }
          this.myHttpService.noteUpdate('notes/addUpdateReminderNotes',
           localStorage.getItem('token'), this.body).subscribe((result) => {
            console.log(result);
            this.remindEmit.emit();
          })
        } else if (timing == '1:00 PM') {
          this.body = {
            "noteIdList": [this.noteRemindeCard.id],
            "reminder": new Date(date.getFullYear(), date.getMonth(),
             date.getDate(), 13, 0, 0, 0)
          }
          this.myHttpService.noteUpdate('notes/addUpdateReminderNotes', 
          localStorage.getItem('token'), this.body).subscribe((result) => {
            console.log(result);
            this.remindEmit.emit();
          })
        } else if (timing == '6:00 PM') {
          this.body = {
            "noteIdList": [this.noteRemindeCard.id],
            "reminder": new Date(date.getFullYear(), date.getMonth(), 
            date.getDate(), 18, 0, 0, 0)
          }
          this.myHttpService.noteUpdate('notes/addUpdateReminderNotes', 
          localStorage.getItem('token'), this.body).subscribe((result) => {
            console.log(result);
            this.remindEmit.emit();
          })
        } else if (timing == '9:00 PM') {
          this.body = {
            "noteIdList": [this.noteRemindeCard.id],
            "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0)
          }
          this.myHttpService.noteUpdate('notes/addUpdateReminderNotes', 
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
            this.body = {
              "noteIdList": [this.noteRemindeCard.id],
              "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(),
               hour, minute, 0, 0)
            }
            this.myHttpService.noteUpdate('notes/addUpdateReminderNotes',
             localStorage.getItem('token'), this.body).subscribe((result) => {
              console.log(result);
              this.remindEmit.emit();
            })
          } else if (ampm == 'PM' || ampm == 'pm') {
            this.body = {
              "noteIdList": [this.noteRemindeCard.id],
              "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 12, minute, 0, 0)
            }
            this.myHttpService.noteUpdate('notes/addUpdateReminderNotes', 
            localStorage.getItem('token'), this.body).subscribe((result) => {
              console.log(result);
              this.remindEmit.emit();
            })
          }
    
        }
      }
      
}
