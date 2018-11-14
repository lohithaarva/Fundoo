import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  @Output() pinEventEmit = new EventEmitter();
  @Input() notePinCard;
  public isDeleted = false;
  public isPinned = false;
  public apiPinned = true;
  token = localStorage.getItem('token');
  constructor(private myHttpService: HttpService, public snackBar: MatSnackBar) { }

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
        this.myHttpService.postDel("/notes/pinUnpinNotes",
        {
          "isPined": this.apiPinned,
          "noteIdList": arr
        
        }, this.token).subscribe((data)=>{
        //   this.snackBar.open("pinned","success", {
        //   duration: 1000,
        // }),
          LoggerService.log('data',data);
          this.pinEventEmit.emit({});
      },
      error =>{
        console.log("Error" , error);
      })
    }
  }
}
}



