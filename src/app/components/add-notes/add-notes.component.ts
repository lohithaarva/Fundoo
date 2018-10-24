import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {
  enterExpression = true;
 token=localStorage.getItem('token')

  constructor(private myHttpService:HttpService) { }
  // message: boolean = false
  @Output() messageEvent = new EventEmitter();

  ngOnInit() {}
  newNote() {
    this.enterExpression = false;
  }

  finish(){
    if(!this.enterExpression){
      this.enterExpression=!this.enterExpression;
    }
    }
    exit()
    { 
     
 
      this.myHttpService
      .addNotes('notes/addNotes', {
        'title'	:document.getElementById('titleId').textContent,
        'description':document.getElementById('notesId').textContent,
        'labelIdList':'',
        'checklist':'',
        'isPined':false
          
      },this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.messageEvent.emit({
          })
        },
        error => {
          console.log("Error", error);
        })
    }
  }


