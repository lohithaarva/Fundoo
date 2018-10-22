import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {


  enterExpression = true;
  // expression = false;

  constructor() { }

  ngOnInit() {
  }
  newNote() {
    // this.expression = true;
    this.enterExpression = false;
  }

  finish(){
    if(!this.enterExpression){
      this.enterExpression=!this.enterExpression;
    }
  }

}
