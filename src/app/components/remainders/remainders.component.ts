import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/core/services/noteservice/note.service';

@Component({
  selector: 'app-remainders',
  templateUrl: './remainders.component.html',
  styleUrls: ['./remainders.component.scss']
})
export class RemaindersComponent implements OnInit {
 token=localStorage.getItem('token');
 reminderNotesArray:any=[];
 @Output() reminderEmit = new EventEmitter();


  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.reminderNotes();
  }

  reminderNotes(){
    this.noteService.getReminderNOteList().subscribe(
      (data) => {
        this.reminderNotesArray=data['data'].data;
        this.reminderNotesArray.sort((a: any, b: any) =>
        new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
    );
        this.reminderEmit.emit({});
      })
  }

}
