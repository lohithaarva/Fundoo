import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { AddNotesComponent } from '../add-notes/add-notes.component';
import { HttpService } from '../../core/services/httpservice/http.service';
import { AuthService } from '../../core/services/authguard/auth.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes = [];
  pinNotes =[];
  access_token = localStorage.getItem("token");
  message: boolean;
  main = [];
  @Output() notesEventEmit = new EventEmitter();

  constructor(private myHttpService: HttpService, private auth: AuthService) {
    this.getCardsList();

   }
  ngOnInit() {
    this.getCardsList();
    this.getPinnedList();
  }

  receiveMessage(event) {
    console.log("i m here")
    this.message = event;
    if (event) {
      this.getCardsList();
      this.getPinnedList();
    }
  }

  getCardsList() {
    this.myHttpService.getNotes("notes/getNotesList", this.access_token).subscribe(
      data => {
        this.notes = [];
        console.log("successful", data['data'].data);
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          if (data['data'].data[i].isDeleted == false 
          && data['data'].data[i].isArchived == false 
          && data['data'].data[i].isPined == false) {
            this.notes.push(data['data'].data[i]);
            this.notesEventEmit.emit({
            })
          }
        }
      },
        error =>{
          console.log("Error" , error);
        })
        }
 
      getPinnedList() {
        this.myHttpService.getNotes("notes/getNotesList", this.access_token).subscribe(
          data => {
            this.pinNotes = [];
            console.log("successful", data['data'].data);
            for (var i = data['data'].data.length - 1; i >= 0; i--) {
              if (data['data'].data[i].isDeleted == false 
          && data['data'].data[i].isArchived == false 
          && data['data'].data[i].isPined == true) {
                this.pinNotes.push(data['data'].data[i]);
                this.notesEventEmit.emit({
                })
              }
            }
          },
            error =>{
              console.log("Error" , error);
            })
            }
          }






