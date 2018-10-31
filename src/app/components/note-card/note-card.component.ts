import { Component, OnInit, Input,EventEmitter, Output} from '@angular/core';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import {MatDialog} from '@angular/material';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  messageDeleted:boolean;
  constructor(public dialog: MatDialog) {}
  

  @Input() cardAdded;
  @Input() first=[];
  @Input() second=[];
  @Input() third=[];
  @Output() eventEmit=new EventEmitter();
  
  messageDelete(event) {
    console.log("i m here for deleting the card")
    this.eventEmit.emit({
    })
    // this.eventEmit = event;
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
 

  ngOnInit() { 
  }
    
}
  
