import { Component, OnInit, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
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
export class CollaboratorDialogComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() removeCollaboratorEvent = new EventEmitter();
  private email;
  private firstName;
  private lastName;
  private image;
  private img;
  private collaboratorSearch; //searchInput
  private collaboratorList = [];
  private addCollaboratorName = [];
  public searchResult = []
  public collabs = [];
  private addCollaboraorNew = [];
  addCollaboraor: any;
  public show: boolean = false;

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public noteService: NoteService,
    private userService: UserService) { }

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
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  keySearch(event) {
    var RequestBody = {
      "searchWord": this.collaboratorSearch,
    }
    if (this.collaboratorSearch.length >= 1) {
      this.show = true;
    }
    this.userService.searchUserList(RequestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log("collaborator note", data);

        this.collaboratorList = data['data']['details'];
        LoggerService.log('data', this.collaboratorList);
      }),
      error => {
        LoggerService.log("Error", error);
      }
  }

  cancelCollaborator() {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      data: this.data,
      width: '450px',
    });
    dialogRef.afterClosed()
  }

  addCollaborator(name) {
    var RequestBody = {
      'firstName': name.firstName,
      'lastName': name.lastName,
      'email': name.email,
      'userId': name.userId,
    }
    this.noteService.addCollaboratorsNotes(RequestBody, this.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log("collaborator note", data);
        console.log(this.addCollaboratorName);
      })
  }
  clickitem(email) {
    LoggerService.log(email);
    this.collaboratorSearch = email;
  }

  enterDetails(searchPerson) {
    for (let index = 0; index < this.collaboratorList.length; index++) {
      if (this.collaboratorList[index].email == searchPerson) {
        this.addCollaboraorNew.push(this.collaboratorList[index]);
      }
    }
    this.collaboratorSearch = [];
  }

  removeCollaborator(userId) {
    this.noteService.removeCollaborator(this.data.id, userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log("collaborator note", data);
        this.removeCollaboratorEvent.emit({
        })
      })
    }
}





