import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup , Validators} from '@angular/forms'
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
constructor(public snackBar: MatSnackBar,private myHttpService: HttpService, private router:Router ) { }
  info:any = {};
  isLeftVisible : any;
  service;
  // count: number = 0;
//  continue:boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  getErrorMessagepassword() {
    return this.password.hasError('required') ? 'Password is Required' :
      this.password.hasError('pattern') ? 'Not a valid password' :
        '';
  }
  continue(){
    if (!this.email.invalid)
    {
      this.isLeftVisible = !this.isLeftVisible;
    }
    else
    {
      this.snackBar.open("login failed", "OPPS Try Again!!",{
            duration:2000
       })
    }
  }
  changeDivState(){
    console.log(this.info.email);
    console.log(this.info.password);        
    this.myHttpService
      .postlogin('user/login', {
        "email": this.info.email,
        "password":this.info.password,
        "emailVerified": true,
       
      }).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.snackBar.open("login successful", " ", {
            duration: 2000
          })
          this.router.navigate(['/home'])
        },
        error => {
          console.log("Password or emailid is wrong")
          this.snackBar.open("login falied", "Password or emailid is incorrect", {
            duration: 2000
          })
          console.log("Error", error);
        })
      }
  
  ngOnInit() {
    
  }
}
