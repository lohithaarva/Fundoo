import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Inote } from '../../core/models/Inote';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private noteService: NoteService) { }
  private notes = [] as Array<Inote>
  token = localStorage.getItem('token');
  @Output() emitArchive = new EventEmitter();
  @Input() noteArchiveCard

  ngOnInit() {
    this.archiveNotes();
  }
  archiveNotes() {
    this.noteService.getArchiveNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.notes = [];
          var archiveNotes: Inote[] = data['data']['data']
          LoggerService.log("GET Request is successful ", archiveNotes);
          for (var i = archiveNotes.length - 1; i >= 0; i--) {
            this.notes.push(archiveNotes[i]);
          }
        },
        error => {
          // LoggerService.log("Error", error);
        })
  }

  eventEmitarchive(event) {
    this.archiveNotes();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}

