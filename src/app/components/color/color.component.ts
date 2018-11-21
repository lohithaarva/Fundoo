import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private noteService: NoteService) { }
  @Input() noteColorCard;
  @Output() emitColor = new EventEmitter;
  @Output() emitColorNotes = new EventEmitter<string>()
  token = localStorage.getItem("token");
  colorArray = [['#fafafa', '#ff8a80', '#ffd180', '#ffff8d'],
  ['#ccff90', '#a7ffeb', '#80d8ff', '#82b1ff'],
  ['#b388ff', '#f8bbd0', '#d7ccc8', '#cfd8dc']];

  ngOnInit() {
  }

  changeColor(colorcode) {
    this.emitColorNotes.emit(colorcode)
    if (this.noteColorCard != undefined) {
      this.noteService.changeColor({
        "color": colorcode,
        "noteIdList": [this.noteColorCard.id]
      }) .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          LoggerService.log("Color Request is successful", data);
          this.emitColor.emit()
          localStorage.setItem('color', colorcode);
        }, error => {
          LoggerService.log("Error", error);
        })
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
