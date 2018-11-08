import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { DataService } from "../../services/data.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor( private myHttpService: HttpService,public data:DataService) { }
  main = [];
  notes = [];
  globalSearch:any;
  access_token = localStorage.getItem('token');

  ngOnInit() {
    this.data.currentMessage.subscribe(message=>{
      this.globalSearch = message;
      console.log("searching note cards");
      
    })
    this.getCardsList();
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
        // this.first=[];
        // this.second=[];
        // this.third=[];
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
