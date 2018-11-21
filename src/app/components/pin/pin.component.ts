import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { LoggerService } from '../../core/services/logger/logger.service';
import { MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();  
  @Output() pinEventEmit = new EventEmitter();
  @Input() notePinCard;
  public isDeleted = false;
  public isPinned = false;
  public apiPinned = true;
  token = localStorage.getItem('token');
  constructor(private noteService: NoteService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.notePinCard != undefined && this.notePinCard.isDeleted == true) {
      this.isDeleted = true;
    }
    if (this.notePinCard != undefined && this.notePinCard.isPined == true) {
      this.isPinned = true;
    }
  }

  pin() {

    this.pinEventEmit.emit({});
    if (this.notePinCard !== undefined) {
      if (this.notePinCard.isPined == true) {
        this.apiPinned = false;
      }
      var arr = []
      arr.push(this.notePinCard.id);
      console.log(arr);
      if (this.notePinCard.id != undefined) {
        var requestBody = {
          
            "isPined": this.apiPinned,
            "noteIdList": arr
          
          
        }
        this.noteService.pin(requestBody)   
         .pipe(takeUntil(this.destroy$))
        .subscribe((data)=>{
          this.snackBar.open("pinned","success", {
          duration: 1000,
        }),
          LoggerService.log('data',data);
          this.pinEventEmit.emit({});
      },
      error =>{
        console.log("Error" , error);
      })
    }
  }
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}



