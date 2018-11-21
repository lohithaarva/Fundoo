import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/authguard/auth.service';
import { Inote } from '../../core/models/Inote'
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  private notes = [] as Array<Inote>
  private pinNotes =[] as Array<Inote>
  access_token = localStorage.getItem("token");
  message: boolean;
  main = [];
  @Output() notesEventEmit = new EventEmitter();

  constructor(private noteService: NoteService, private auth: AuthService) {
    this.getCardsList();

   }
  ngOnInit() {
    this.getCardsList();
    this.getPinnedList();
  }

  receiveMessage(event) {
    console.log("i m here")
    this.message = event;
    if (event) {
      this.getCardsList();
      this.getPinnedList();
    }
  }
  addNotes(addNotes : Inote){
      this.notes.splice(0 , 0, addNotes)
     
    }

  getCardsList() {
    this.noteService.getNotes()      
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.notes = [];
        var notesArray:Inote[] = data['data'].data
        for (var i = notesArray.length - 1; i >= 0; i--) {
          if (notesArray[i].isDeleted == false 
          && notesArray[i].isArchived == false 
          && notesArray[i].isPined == false) {
            this.notes.push(notesArray[i]);
            this.notesEventEmit.emit({
            })
          }
        }
      },
        )
        error =>{
          console.log("Error" , error);
        }
        }
 
      getPinnedList() {
        this.noteService.getNotes()      
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            this.pinNotes = [];
            var notesArray:Inote[] = data['data'].data 
            for (var i = notesArray.length - 1; i >= 0; i--) {
              if (notesArray[i].isDeleted == false 
          && notesArray[i].isArchived == false 
          && notesArray[i].isPined == true) {
                this.pinNotes.push(notesArray[i]);
                this.notesEventEmit.emit({
                })
              }
            }
          },
            )
            error =>{
              console.log("Error" , error);
            }
            }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
          }






