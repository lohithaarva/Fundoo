import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';
import { MatSnackBar } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
    selector: 'app-add-archive',
    templateUrl: './add-archive.component.html',
    styleUrls: ['./add-archive.component.scss']
  })
  export class AddArchiveComponent implements OnInit  {
  @Input() noteArchiveCard;
  @Output() archiveEvent = new EventEmitter()
  @Output() unarchiveEvent = new EventEmitter()

  constructor(public service: HttpService, public snackBar: MatSnackBar) { }
  ngOnInit() {
  
    
  }
  token = localStorage.getItem('token')

  cardArchive() {
    // console.log(this.archiveNotesArray);

    // console.log(this.archiveNotesArray.id,"archived");
    var model = {
      "isArchived": true,
      "noteIdList": [this.noteArchiveCard.id]
    }
    this.service.postArchive("notes/archiveNotes", model, this.token).subscribe(data => {
      LoggerService.log("archive note",data);
      this.snackBar.open("note archived successfully,please check in archive", "archive", {
        duration: 10000,

      });
      this.archiveEvent.emit();
 
    }),
      error => {
        LoggerService.log("Error", error);

      }
  }
  unarchiveNotes() {
    // console.log(this.archiveNotesArray);
    // console.log(this.archiveNotesArray.id,"unarchived");
    var model = {
      "isArchived": false,
      "noteIdList": [this.noteArchiveCard.id]
    }
    this.service.postArchive("notes/archiveNotes", model, this.token).subscribe(data => {
      LoggerService.log("unarchive note",data);
      this.unarchiveEvent.emit();
      this.snackBar.open("note unarchived successfully,please check in notes", "notes", {
        duration: 10000,

      });


    }),
      error => {
        LoggerService.log("Error", error);

      }
  }

}
