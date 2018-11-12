import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  notes = [];
  token = localStorage.getItem('token');
  @Output() emitArchive = new EventEmitter();
  @Input() noteArchiveCard


  ngOnInit() {
    this.archiveNotes();
  }
  archiveNotes(){
    this.myHttpService.getArchive('/notes/getArchiveNotesList', this.token).subscribe(
      (data) => {
        this.notes = [];
        console.log("GET Request is successful ", data);
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          this.notes.push(data['data']['data'][i]);
        }
      },
      error => {
        console.log("Error", error);
      })
  }

  eventEmitarchive(event) {
    this.archiveNotes();
  }

}

