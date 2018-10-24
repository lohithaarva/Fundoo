import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { Router, ActivatedRoute } from '@angular/router';



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
    private myHttpService: HttpService,
    private router:Router,
    public route:ActivatedRoute,) {}
    public accessToken = localStorage.getItem("token")
    public clicked= false;
     firstName;
     lastName;
     email;
  
  ngOnInit() {

       this.firstName= localStorage.getItem("firstName");
      console.log(this.firstName)
      this.lastName = localStorage.getItem("lastname");
      this.email = localStorage.getItem("email");
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
}
