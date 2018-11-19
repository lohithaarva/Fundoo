import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { AddNotesComponent } from '../add-notes/add-notes.component';
import { HttpService } from '../../core/services/httpservice/http.service';
import { AuthService } from '../../core/services/authguard/auth.service';
import { Inote } from '../../core/models/Inote'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  // var myListObject = [] as Array<IObject>
  public notes = [] as Array<Inote>
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
  addNotes(addNotes : Inote){
      this.notes.splice(0 , 0, addNotes)
     
    }

  getCardsList() {
    this.myHttpService.getNotes("notes/getNotesList", this.access_token).subscribe(
      data => {
        this.notes = [];
        var notesArray:Inote[]=data['data'].data
        console.log("successful", notesArray);
        for (var i = notesArray.length - 1; i >= 0; i--) {
          if (notesArray[i].isDeleted == false 
          && notesArray[i].isArchived == false 
          && notesArray[i].isPined == false) {
            this.notes.push(notesArray[i]);
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






