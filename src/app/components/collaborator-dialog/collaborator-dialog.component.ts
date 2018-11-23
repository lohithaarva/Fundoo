import { Component, OnInit,  OnDestroy  } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NoteService } from '../../core/services/noteservice/note.service';
import { UserService } from 'src/app/core/services/userService/user.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';


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

  constructor(public noteService: NoteService,private userService: UserService) { }

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


}
