/************************************************************************************************
*  Execution       :   1. default node         cmd> archive.ts 
*        
*  Purpose         :  To display notecards which are archived and also perform functionality
                      when clicked.
* 
*  Description    
* 
*  @file           : archive.ts
*  @overview       : To display notecards which are archived and also perform functionality
                     when clicked
*  @module         : archive.ts - This is optional if expeclictly its an npm or local package
*  @author         : LohithaShree <lohitha.arva@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NoteService } from '../../core/services/noteservice/note.service';
import { UserService } from 'src/app/core/services/userService/user.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { DialogComponentComponent, DialogData } from '../dialog-component/dialog-component.component';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
/**A componenet can be reused throughout the application & even in other applications */

@Component({
  selector: 'app-collaborator-dialog',/**A string value which represents the component on browser at 
                                      execution time */
  templateUrl: './collaborator-dialog.component.html',/**External templating process to define html
                                      tags in component */
  styleUrls: ['./collaborator-dialog.component.scss']/**It is used to provide style of components */
})
/**To use components in other modules , we have to export them */
export class CollaboratorDialogComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  /**Input and Output are two decorators in Angular responsible for 
        * communication between two components*/
  /**EventEmitter:creates an instance of this class that can delliver events  */
  @Output() removeCollaboratorEvent = new EventEmitter();
  private owner = this.data['user'];
  private profilePhoto = environment.apiUrl + this.owner.imageUrl;
  private img;
  private email;
  private firstName;
  private lastName;
  private image;
  private collaboratorSearch; //searchInput
  private collaboratorList = [];
  private addCollaboratorName = [];
  public searchResult = []
  public collabs = [];
  private addCollaboraorNew = [];
  addCollaboraor: any;
  public show: boolean = false;


  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public noteService: NoteService,
    private userService: UserService) { }

  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.image = localStorage.getItem('imageUrl');
    this.img = environment.apiUrl + this.image;
    for (let i = 0; i < this.data['collaborators'].length; i++) {
      this.addCollaboraorNew = (this.data['collaborators']);
    }
  }
  /** A callback method that performs custom clean-up, invoked immediately after a directive, 
     * pipe, or service instance is destroyed. */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  /**Method to search names */
  keySearch(event) {
    var RequestBody = {
      "searchWord": this.collaboratorSearch,
    }
    if (this.collaboratorSearch.length >= 1) {
      this.show = true;
    }
    this.userService.searchUserList(RequestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {  /**registers handlers for events emitted by this instance */
        LoggerService.log("collaborator note", data);

        this.collaboratorList = data['data']['details'];
        LoggerService.log('data', this.collaboratorList);
      })
  }
  /** Method to cancel single collaborator in the list */
  cancelCollaborator() {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      data: this.data,
      width: '450px',
    });
    dialogRef.afterClosed()
  }
  /** Method to add collaboraotors to the list */
  addCollaborator(name) {
    var RequestBody = {
      'firstName': name.firstName,
      'lastName': name.lastName,
      'email': name.email,
      'userId': name.userId,
    }
    this.noteService.addCollaboratorsNotes(RequestBody, this.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {  /**registers handlers for events emitted by this instance */
        LoggerService.log("collaborator note", data);
      })
  }
  /** Method to display email, on cliked */
  clickitem(email) {
    this.collaboratorSearch = email;
  }
  /**Method to display email and details of the person, on clicked */
  enterDetails(searchPerson) {
    for (let duplicateEntry = 0; duplicateEntry < this.addCollaboraorNew.length; duplicateEntry++) {
      if (this.collaboratorSearch == this.addCollaboraorNew[duplicateEntry].email) {
        this.snackBar.open("Collaborator already exists", "fail", {
          duration: 3000
        })
        this.collaboratorSearch = null;
        return false;
      }
    }
    for (let index = 0; index < this.collaboratorList.length; index++) {
      if (this.collaboratorList[index].email == searchPerson) {
        this.addCollaboraorNew.push(this.collaboratorList[index]);
      }
    }
    this.collaboratorSearch = [];
  }
  /**Mthod to remove collaborator from the list */
  removeCollaborator(userId) {
    this.noteService.removeCollaborator(this.data.id, userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {  /**registers handlers for events emitted by this instance */
        LoggerService.log("collaborator note", data);
        for (var i = 0; i < this.addCollaboraorNew.length; i++) {
          if (this.addCollaboraorNew[i].userId == userId) {
            this.addCollaboraorNew.splice(i, 1)
          }
        }
      })
  }
}





