import { Component, OnInit,  OnDestroy, Inject  } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NoteService } from '../../core/services/noteservice/note.service';
import { UserService } from 'src/app/core/services/userService/user.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { DialogComponentComponent, DialogData } from '../dialog-component/dialog-component.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 

  email = localStorage.getItem('email');
  firstName = localStorage.getItem('firstName');
  lastName = localStorage.getItem('lastName');
  image = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image;
  private collaboratorSearch;
  private collaboratorList = [];
  private addCollaboratorName = [];

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: DialogData, public noteService: NoteService,private userService: UserService) { }

  ngOnInit() {
    
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  keySearch(event){
      var RequestBody = {
        "searchWord": this.collaboratorSearch,
      }
      this.userService.searchUserList(RequestBody)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          LoggerService.log("collaborator note", data);
         
          this.collaboratorList = data['data']['details'];
          LoggerService.log('data',this.collaboratorList);
        }),
        error => {
          LoggerService.log("Error", error);
        }
      }

      // cancelCollaborator(){
      //   const dialogRef = this.dialog.open(DialogComponentComponent, {
      //     data: this.data,
      //     width: '450px',
          
      //   });

      //   dialogRef.afterClosed()
      // }

      addCollaborator(name){
        var RequestBody = {
          'firstName' : name.firstName,
          'lastName' : name.lastName,
           'email' : name.email,
           'userId': name.userId,
        }
        this.noteService. addCollaboratorsNotes(RequestBody ,this.data.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          LoggerService.log("collaborator note", data);
          console.log(this.addCollaboratorName);
          
        })
      }
      addNames(email){
       email = this.collaboratorSearch ;
      }


}
