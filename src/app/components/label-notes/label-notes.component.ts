import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NoteService } from 'src/app/core/services/noteservice/note.service';


@Component({
  selector: 'app-label-notes',
  templateUrl: './label-notes.component.html',
  styleUrls: ['./label-notes.component.scss']
})
export class LabelNotesComponent implements OnInit {

  constructor( private noteService : NoteService,public route: ActivatedRoute) { }
  labelName;
  labelArray=[];
 
  

  ngOnInit() {

    console.log("particular label is been arrived");
    this.route.params.subscribe(
    (params:Params)=>{
      this.labelName= params['labelName']
      this.getLabelNotes(this.labelName)
      console.log("i m here now");
      
    })
    }

    getLabelNotes(labelName){
      // var url ="notes/getNotesListByLabel/"+labelName
      this.noteService.getLabelNotes(labelName)
      .subscribe(response => {
        console.log("successfull", response);
        this.labelArray=response['data'].data
        console.log(this.labelArray);
      }, error => {
        console.log("failed", error)
        })
    
    }
  }


    
   