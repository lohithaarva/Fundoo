import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  notes = [];
  access_token = localStorage.getItem("token");
  constructor(private myHttpService: HttpService) { }

  ngOnInit() {

    this.myHttpService.trashNotes("notes/getTrashNotesList", this.access_token).subscribe(
      data => {
        console.log("successful", data['data'].data);
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          if (data['data'].data[i].isDeleted == true) {
            this.notes.push(data['data'].data[i]);
          }
        }
        console.log("array", this.notes)
      })
  }

}
