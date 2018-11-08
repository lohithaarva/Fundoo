import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';

@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrls: ['./add-archive.component.scss']
})
export class AddArchiveComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  @Input() noteArchiveCard
  @Output() emitArchive = new EventEmitter()
  token = localStorage.getItem('token')
  ngOnInit() {
  }
  cardArchive(archive) {
    console.log(archive);
    
    this.myHttpService.postArchive('/notes/archiveNotes',
      {
        "isArchived": true,
        "noteIdList": [this.noteArchiveCard.id]
      }, this.token).subscribe(data => {
        console.log("Archive successful", data);
        this.emitArchive.emit({

        });
      },
        error => {
          console.log("Error", error);
        }
      )
  }


}
