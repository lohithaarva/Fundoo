import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-remainders',
  templateUrl: './remainders.component.html',
  styleUrls: ['./remainders.component.scss']
})
export class RemaindersComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();   
 token=localStorage.getItem('token');
 reminderNotesArray:any=[];
 @Output() reminderEmit = new EventEmitter();


  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.reminderNotes();
  }

  reminderNotes(){
    this.noteService.getReminderNOteList()         
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.reminderNotesArray=data['data'].data;
        this.reminderNotesArray.sort((a: any, b: any) =>
        new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
    );
        this.reminderEmit.emit({});
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
