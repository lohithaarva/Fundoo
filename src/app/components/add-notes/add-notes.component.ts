import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CoreModule } from '@angular/flex-layout';
import { ColorComponent } from '../color/color.component';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {
  enterExpression = true;
  boxClicked =  true;

 token=localStorage.getItem('token')
 changeColor = localStorage.getItem('color');
 color;

  constructor(private myHttpService:HttpService) { }
  // message: boolean = false
  @Output() messageEvent = new EventEmitter();
  

  ngOnInit() {}

  // newBoxClick(){
  //   this.boxClicked =  true;
  // }
  // newNote() {
  //   this.enterExpression = false;
  // }

  finish(){
    if(!this.enterExpression){
      this.enterExpression=!this.enterExpression;
    }
    // else if(this.boxClicked){
      this.boxClicked = true;
    // }

    }

  
    
    exit()
    { 
      console.log(this.color);
      this.myHttpService
      .addNotes('notes/addNotes', {
        'title'	:document.getElementById('titleId').innerHTML,
        'description':document.getElementById('notesId').innerHTML,
        'labelIdList':'',
        'checklist':'',
        'isPined':false,
        'color':this.color
          
      },this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.messageEvent.emit({
          })
          this.color="#fafafa";
        },
        error => {
          console.log("Error", error);
        })
        this.color="#fafafa";
    }

    ChangeColorNotes(event){
      console.log(event); 
      this.color= event;
    }
  }


