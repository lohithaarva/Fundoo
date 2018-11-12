import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  notes = [];
  access_token = localStorage.getItem("token");
  deleteNotesForever = "delete";
  constructor(private myHttpService: HttpService) { }

  ngOnInit() {
    this.deleteNotes();

  }

  receiveMessage($event){
    this.deleteNotes();
  }

  deleteNotes() {
    this.myHttpService.trashNotes("notes/getTrashNotesList", this.access_token).subscribe(
      data => {
        this.notes=[];
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