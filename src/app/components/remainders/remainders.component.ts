import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';

@Component({
  selector: 'app-remainders',
  templateUrl: './remainders.component.html',
  styleUrls: ['./remainders.component.scss']
})
export class RemaindersComponent implements OnInit {
 token=localStorage.getItem('token');
 reminderNotesArray:any=[];
 @Output() reminderEmit = new EventEmitter();


  constructor(private myHttpService: HttpService) { }

  ngOnInit() {
    this.reminderNotes();
  }

  reminderNotes(){
    this.myHttpService.getNotes('/notes/getReminderNotesList', this.token).subscribe(
      (data) => {
        this.reminderNotesArray=data['data'].data;
        this.reminderEmit.emit({});
      })
  }

}
