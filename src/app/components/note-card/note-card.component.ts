import { Component, OnInit, Input,EventEmitter, Output} from '@angular/core';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import {MatDialog} from '@angular/material';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { HttpService } from '../../core/services/httpservice/http.service';
import { DataService } from "../../core/services/dataservice/data.service";

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  messageDeleted:boolean;
 condition=true;
 
  constructor(public dialog: MatDialog, private myHttpService : HttpService,private data: DataService) {
    this.data.currentDelete.subscribe(message=>{
      console.log("deleting labels from dialog to sidenav ");
      if(message){
        this.eventEmit.emit({
        })
      }
    })
    
    this.data.currentView.subscribe(message=>{
      console.log("switching from grid view to list view");
     this.condition = message;
    })
   
   
    
  }
  @Input() deleteNotesForever;
  @Input() globalSearch;
  @Input() cardAdded;
  @Input() first=[];
  @Input() second=[];
  @Input() third=[];
  @Output() eventEmit=new EventEmitter();
  
  messageDelete(event) {
    console.log("i m here for deleting the card")
    this.eventEmit.emit({
    })
  }

  openDialog(note): void {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      // width: '550px', 
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.eventEmit.emit({
      })
    });
  }
  
  

  remove(labelId, noteId){
    // if (this.noteDeleteCard!= null && markLabel.isChecked==null){    
      this.myHttpService.addNotes("/notes/" + noteId + "/addLabelToNotes/" + labelId + "/remove",{"noteId" : noteId,
    "lableId" :labelId}, localStorage.getItem('token'))
        .subscribe(Response => {
          console.log(Response);
          this.eventEmit.emit({})
        }, error => {
          console.log(error)
        })
      // }
}

  ngOnInit() { 
   
  } 
}
  
