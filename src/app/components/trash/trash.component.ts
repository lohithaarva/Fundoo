import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Inote } from '../../core/models/Inote'
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 

  access_token = localStorage.getItem("token");
  deleteNotesForever = "delete";
  private notes = [] as Array<Inote>
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.deleteNotes();

  }

  receiveMessage($event) {
    this.deleteNotes();
  }

  deleteNotes() {
    this.noteService.getTrashNotes()   
     .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.notes = [];
        var trashNotes: Inote[] = data['data'].data
        LoggerService.log("successful", trashNotes);
        for (var i = trashNotes.length - 1; i >= 0; i--) {
          if (trashNotes[i].isDeleted == true) {
            this.notes.push(trashNotes[i]);
          }
        }
        LoggerService.log("array", this.notes)
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}