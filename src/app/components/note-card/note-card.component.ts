import { Component, OnInit, Input,} from '@angular/core';



@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {

  constructor() {}
    
  @Input() cardAdded;
  // notes =[];
  // access_token = localStorage.getItem("token");


 
  ngOnInit() { 
    // this.getElements();
    // this.getCards();
    
     
  }
    }
  
