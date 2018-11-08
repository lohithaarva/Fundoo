import { Component, OnInit } from '@angular/core';
// import { AddNotesComponent } from '../add-notes/add-notes.component';
import { HttpService } from '../../services/http.service';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes = [];
  access_token = localStorage.getItem("token");
  message: boolean;
  first = [];
  second = [];
  third = [];
  main = [];


  constructor(private myHttpService: HttpService, private auth: AuthService) {
    this.getCardsList();

   }
  ngOnInit() {
    // this.getCardsList();
  }

  receiveMessage(event) {
    console.log("i m here")
    this.message = event;
    if (event) {
      
      this.getCardsList();
    }
  }

  getCardsList() {
    this.myHttpService.getNotes("notes/getNotesList", this.access_token).subscribe(
      data => {
        this.notes = [];
        console.log("successful", data['data'].data);
        for (var i = data['data'].data.length - 1; i >= 0; i--) {
          if (data['data'].data[i].isDeleted == false && data['data'].data[i].isArchived == false) {
            this.notes.push(data['data'].data[i]);
          }
        }
        console.log("array", this.notes)
        this.first=[];
        this.second=[];
        this.third=[];
        this.main=[];
        for(var index=0; index<(this.notes.length) ; index++)
        {
          if(this.notes[index].isDeleted == false ){
            this.main.push(this.notes[index])
            
          }
        }

        console.log("Main data ", this.main);
        console.log(this.notes.length);
        
        for(var index=0; index<(this.notes.length) ; index++)
        {
            console.table(this.notes[index]);
          if(this.notes[index].isDeleted == false){ 
            console.log(index);
            // if(index%3 == 0){
            //   this.first.push(this.notes[index]);
            // }else if(index % 3 == 1){
            //   this.second.push(this.notes[index]);
            // }else{
            //   this.third.push(this.notes[index]);
            // }

          }
        }
        
      })
  }




}
