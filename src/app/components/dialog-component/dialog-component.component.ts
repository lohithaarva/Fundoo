import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NoteCardComponent } from '../note-card/note-card.component';
import { HttpService } from '../../services/http.service';


export interface DialogData {
  title: string;
  description: string;
  id : string;
}

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css'],

})
export class DialogComponentComponent implements OnInit {
token = localStorage.getItem('token')
@Output() updateEvent = new EventEmitter();
@Output() eventEmit=new EventEmitter();
// @Input() deleteNotesInDialog;



  constructor( public dialogRef: MatDialogRef<NoteCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private myHttpService: HttpService) {}

    onNoClick(id): void {
      this.myHttpService.noteUpdate('notes/updateNotes',{
        "noteId" : [this.data.id],
        "title" :document.getElementById('titleId').innerHTML ,
        "description" : document.getElementById('notesId').innerHTML
  
      },this.token).subscribe(data => {
            console.log('response', data);
            this.dialogRef.close();
            this.updateEvent.emit({
  
            })
          })
          this.dialogRef.close();
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
