import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import { DataService } from "../../services/data.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
 
    
  constructor(private breakpointObserver: BreakpointObserver,
    private data: DataService,
    public dialog: MatDialog,
    private myHttpService: HttpService,
    private router:Router,
    public route:ActivatedRoute,) {}
    public accessToken = localStorage.getItem("token")
    public clicked= false;
     firstName;
     lastName;
     email;
     value= [];
     globalSearch:any;
  
  ngOnInit() {
     
    this.noteCard();

     
  }
  noteCard(){
    var note=[];
  // this.firstName= localStorage.getItem("firstName");
  // console.log(this.firstName)
  // this.lastName = localStorage.getItem("lastname");
  // this.email = localStorage.getItem("email");
  this.myHttpService.getNotes("noteLabels/getNoteLabelList",this.accessToken)
  .subscribe(response=>{
    console.log("accessToken",this.accessToken)
  console.log(" Get label successfull",response);
  for(var i =0; i< response['data']['details'].length; i++){
    if(response['data']['details'][i].isDeleted == false){
      note.push(response['data']['details'][i]);
    }
  }
  this.value = note;

  console.log(response);
  console.log(this.value);

},error=>{
  console.log("failed",error)
})
  }

  signout(){
    this.myHttpService.postLogout("user/logout",this.accessToken)
      .subscribe(response=>{
        console.log("accessToken",this.accessToken)
      console.log(" logout successfull",response);
      localStorage.clear();
      this.router.navigateByUrl('login')

    },error=>{
      console.log("failed",error)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '250px',
      data: {labelDialog:this.value}
          });

    dialogRef.afterClosed().subscribe(result => {
      this.noteCard();
      console.log('The dialog was closed');
     
    });
  }

  keySearch(){
    this.data.changeMessage(this.globalSearch);

  }

  navigate(){
    this.router.navigate(['home/search']);
  }
}

