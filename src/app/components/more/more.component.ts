import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';
import { TrashDialogComponent } from '../trash-dialog/trash-dialog.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {
  close: string;
checkboxLabel = [];
search : any;
  constructor(private myHttpService : HttpService,public dialog: MatDialog) { }
  @Input() noteDeleteCard;
  @Output() delete = new EventEmitter();
  @Output() labelEvent = new EventEmitter();
  @Input() deleteNotesForever;
  
  ngOnInit() {
              console.log(this.deleteNotesForever); 
              this.getLabels();
              }

  token = localStorage.getItem("token");
  openTrashDialog(): void {
    const dialogRef = this.dialog.open(TrashDialogComponent, { 
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == true){
        this.deleteForEver();
        this.delete.emit({})
      }
      console.log('The dialog was closed');
      this.close = result;  
    });

  }


  deleteCard(id){
    console.log(this.noteDeleteCard);
    this.myHttpService.deleteNotes('/notes/trashNotes',{
      "isDeleted": true,
      "noteIdList":[this.noteDeleteCard.id]
    }, this.token).subscribe(
      (data) =>{
        console.log("Post Request is successful", data);
        this.delete.emit({})
        },error=>{
        console.log("Error", error);
      })
  }

  getLabels() {
  
    this.myHttpService.get("noteLabels/getNoteLabelList", localStorage.getItem('token')).subscribe(
      response => {
        this.checkboxLabel = response['data']['details'];
      })
    }

    selectLabel(id){
      this.labelEvent.emit(id);
        console.log("selected label is", id);
        console.log( 'Id is here', id.label);
        
        // if (this.noteDeleteCard!= null && markLabel.isChecked==null){    
          console.log(id)
          this.myHttpService.addNotes("/notes/" + this.noteDeleteCard.id + "/addLabelToNotes/" + id.id + "/add",{"noteId" : this.noteDeleteCard.id,
        "lableId" : id.id}, localStorage.getItem('token'))
            .subscribe(Response => {
              console.log(Response);
              this.delete.emit({})
            }, error => {
              console.log(error)
            })
          // }
}
deleteForEver(){
    this.myHttpService.deleteNotes("/notes/deleteForeverNotes", {
      "isDeleted": true,
      "noteIdList": [this.noteDeleteCard.id]
    }, this.token).subscribe(
      data => {
        console.log("delete forever successfull", data);
        this.delete.emit({})
       

      }) 
    }

restore(){
      this.myHttpService.deleteNotes("/notes/trashNotes", {
        "isDeleted": false,
        "noteIdList": [this.noteDeleteCard.id]
      }, this.token).subscribe(
        data => {
          console.log("delete forever successfull", data);
          this.delete.emit({})
         
  
        })
      }
  
}
