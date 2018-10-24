import { Component, OnInit } from '@angular/core';
// import { AddNotesComponent } from '../add-notes/add-notes.component';
import { HttpService } from '../../services/http.service';
import { AuthService } from './../../services/auth.service';
import { getLocaleFirstDayOfWeek } from '@angular/common';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  // enterExpression = true;
  // expression = false;
  notes =[];
  access_token = localStorage.getItem("token");
  message:boolean;


  constructor(private myHttpService: HttpService,private auth: AuthService) { }
  ngOnInit() {
    this.getCardsList();
  }
  
  receiveMessage(event) {
    console.log("i m here")
    this.message = event;
    if(event)
    {
  
  this.myHttpService.getNotes("notes/getNotesList", this.access_token).subscribe(
    data=>{
        console.log("successful",data['data'].data);          
          this.notes=data['data'].data          
        console.log("array", this.notes)        
    })
  }
}
  getCardsList()
  {
  this.myHttpService.getNotes("notes/getNotesList", this.access_token).subscribe(
    data=>{
        console.log("successful",data['data'].data);          
          this.notes=data['data'].data          
        console.log("array", this.notes)        
    })
  }
  

  

}
