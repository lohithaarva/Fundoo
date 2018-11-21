import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from "../../core/services/dataservice/data.service";
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Inote } from '../../core/models/Inote'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from 'src/app/core/services/logger/logger.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private noteService: NoteService, public data: DataService) { }
  main = [];
  private notes = [] as Array<Inote>
  globalSearch: any;
  access_token = localStorage.getItem('token');

  ngOnInit() {
    this.data.currentMessage
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.globalSearch = message;
      LoggerService.log("searching note cards");
    })
    this.getCardsList();
  }

  getCardsList() {
    this.noteService.getNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.notes = [];
          var notesArray:Inote[] = data['data'].data

          for (var i =notesArray.length - 1; i >= 0; i--) {
            if (notesArray[i].isDeleted == false && notesArray[i].isArchived == false) {
              this.notes.push(notesArray[i]);
            }
          }
          this.main = [];
          for (var index = 0; index < (this.notes.length); index++) {
            if (this.notes[index].isDeleted == false) {
              this.main.push(this.notes[index])

            }
          }
          for (var index = 0; index < (this.notes.length); index++) {
            // console.table(this.notes[index]);
            if (this.notes[index].isDeleted == false) {
              LoggerService.log(index);
            }
          }

        })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
