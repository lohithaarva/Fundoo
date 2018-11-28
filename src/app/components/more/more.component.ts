import { Component, OnInit,Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrashDialogComponent } from '../trash-dialog/trash-dialog.component';
import {MatDialog} from '@angular/material';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  close: string;
checkboxLabel = [];
search : any;
  constructor(private noteService : NoteService,public dialog: MatDialog, private router: Router) { }
  @Input() noteDeleteCard;
  @Output() delete = new EventEmitter();
  @Output() labelEvent = new EventEmitter();
  @Input() deleteNotesForever;
  ;
  
  ngOnInit() {
              this.getLabels();
              }
  openTrashDialog(): void {
    const dialogRef = this.dialog.open(TrashDialogComponent, { 
    });
    
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
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
    var requestBody = {
      "isDeleted": true,
      "noteIdList":[this.noteDeleteCard.id]
    }
    this.noteService.trash(requestBody)
    .pipe(takeUntil(this.destroy$))
          .subscribe(data =>{
        console.log("Post Request is successful", data);
        this.delete.emit({})
        })
  }

  getLabels() {
  
    this.noteService.getNoteLabellist().subscribe(
      response => {
        this.checkboxLabel = response['data']['details'];
      })
    }

    selectLabel(id){
      this.labelEvent.emit(id);
          this.noteService.addLabeltoNotes(this.noteDeleteCard.id, id.id ,{"noteId" : this.noteDeleteCard.id,
        "lableId" : id.id})
        .pipe(takeUntil(this.destroy$))
            .subscribe(Response => {
              console.log(Response);
              this.delete.emit({})
            })
          // }
}
/******************** delete notes permanentely ***************/
deleteForEver(){
  var requestBody = {
    "isDeleted": true,
    "noteIdList": [this.noteDeleteCard.id]
  }
  this.noteService.deleteForever(requestBody)
  .pipe(takeUntil(this.destroy$))
  .subscribe(
      data => {
        console.log("delete forever successfull", data);
        this.delete.emit({})
       

      }) 
    }
/******************** unarchive **************************/ 
restore(){
  var requestBody = {
    "isDeleted": false,
    "noteIdList": [this.noteDeleteCard.id]
  }
      this.noteService.trash(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          console.log("delete forever successfull", data);
          this.delete.emit({})
        })
      }
      ngOnDestroy() {
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
      }
      /** Method to ask question and answer for particular note */
      askAQuestion(){
                this.router.navigate(['/home/qanda/' + this.noteDeleteCard.id]);
                console.log(this.noteDeleteCard)
      }
  
}
