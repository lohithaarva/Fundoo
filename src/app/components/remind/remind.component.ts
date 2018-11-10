import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';

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

  ngOnInit() {
  }
  

    remindMe() {
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

      addTomorrowReminder() {
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
      addWeeklyReminder() {
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
      
}
