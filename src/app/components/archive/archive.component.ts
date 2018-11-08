import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(private myHttpService : HttpService) { }
  card = [];
  token = localStorage.getItem('token');
  ngOnInit() {
    this.myHttpService.getArchive('/notes/getArchiveNotesList', this.token).subscribe(
      (data) => {
        console.log("GET Request is successful ", data);
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          // if (data['data']['data'][i].isArchive == false) {
          this.card.push(data['data']['data'][i]);
          // }
        }
      },
      error => {
        console.log("Error", error);
      })
  }
}
