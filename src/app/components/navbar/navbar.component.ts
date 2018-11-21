import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import { DataService } from "../../core/services/dataservice/data.service";
import { environment } from 'src/environments/environment';
import { CropImageComponent } from '../crop-image/crop-image.component';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { TouchSequence } from 'selenium-webdriver';
import { NoteService } from 'src/app/core/services/noteservice/note.service';
import { UserService } from 'src/app/core/services/userService/user.service';
import { Inote } from '../../core/models/Inote'



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  constructor(private breakpointObserver: BreakpointObserver,
    private data: DataService,
    private dialog: MatDialog,
    private noteService: NoteService,
    private userService: UserService,
    private router: Router,

    private route: ActivatedRoute, ) {

  }
  private accessToken = localStorage.getItem("token")
  private clicked = false;
  private header = "Fundoo"
  private firstName;
  private lastName;
  private email;
  private imageUrl;
  private value = [];
  private globalSearch: any;
  private labelPageNames;
  private listClick = true;
  private gridView = true;
  private grid = 0;
  private selectedFile = null;
  private profilePath;
  private color;
  private show: boolean = false;
  private clickOnSearch: boolean = true;
  private pic;
  private image = {};
  private note = [] as Array<Inote>

  ngOnInit() {

    this.noteCard();
    this.header = localStorage.getItem('header')
    
  }
  /** Method to change header names */
  changeHeader(header) {
    this.header = header;
    localStorage.setItem('header',header)
  }
  onEnterIcon(event) {
    if (event.key === "Enter") {
      this.show = false;
      this.clickOnSearch = true;
    }
    LoggerService.log(event);
  }
  headerFundoo() {

  }

  noteCard() {
    this.note = [];
    this.firstName = localStorage.getItem("firstName");
    console.log(this.firstName)
    this.lastName = localStorage.getItem("lastname");
    this.email = localStorage.getItem("email");
    this.noteService.getNoteLabellist()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          console.log("accessToken", this.accessToken)
          var noteLabelNotes: Inote[] = response['data']['details']
          for (var i = 0; i < noteLabelNotes.length; i++) {
            if (noteLabelNotes[i].isDeleted == false) {
              this.note.push(noteLabelNotes[i]);
            }
          }
          this.value = this.note;

        }, error => {
          console.log("failed", error)
        })
  }
  /** Method to logout from the account */
  signout() {
    this.userService.logout({})
      .subscribe(response => {
        console.log("accessToken", this.accessToken)
        console.log(" logout successfull", response);
        localStorage.clear();
        this.router.navigateByUrl('login')

      }, error => {
        console.log("failed", error)
      })
  }
  /** Method to display label during popover */
  openDialog(): void {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '250px',
      data: '{ labelDialog: this.value }'
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.noteCard();
        console.log('The dialog was closed');
      });
  }

  keySearch() {
    this.data.changeMessage(this.globalSearch);
  }

  navigate() {
    this.router.navigate(['home/search']);
  }

  labelPage(result) {
    var labelName = result.label;
    this.router.navigate(['home/labelNotes/' + labelName]);
  }
  /** notecards in list view */
  cardsInList() {
    this.grid = 1;
    this.data.changeView(false);
  }

  /** notecards in grid view */
  cardsInGrid() {
    this.grid = 0;
    this.data.changeView(true);
  }
  /** Method to crop the profile image  */
  public newimage2 = localStorage.getItem('imageUrl');
  img = "http://34.213.106.173/" + this.newimage2;
  token = localStorage.getItem('token');
  onFileSelected(event) {
    var token = localStorage.getItem('token');
    this.profileCropOpen(event);

    this.selectedFile = event.path[0].files[0];
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
  }


  /** Method to initiate to particular label state */
  clickLabel(labelsList) {
    var labelsList = labelsList.label;
    this.router.navigate(['/home/label/' + labelsList])
  }
  profileCropOpen(data): void { //Function for the dialog box
    const dialogRefPic = this.dialog.open(CropImageComponent, {
      width: '450px',
      data: data
    });

    dialogRefPic.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('The dialog was closed');
        this.data.currentMsg.subscribe(message => this.pic = message)
        console.log("pic", this.pic);
        if (this.pic == true) {
          this.newimage2 = localStorage.getItem('imageUrl');
          console.log(this.newimage2, "image is here");
          this.img = "http://34.213.106.173/" + this.newimage2;
        }

      });
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}

