import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup , Validators} from '@angular/forms'
import { HttpService } from '../../services/http.service';
import {LoggerService} from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
constructor(public snackBar: MatSnackBar,private myHttpService: HttpService, private router:Router ) { }
  info:any = {};
  isLeftVisible : any;
  service;
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
    // console.log(this.info.email);
    // console.log(this.info.password); 
    // LoggerService.log(this.info.email); 
    this.myHttpService
      .postlogin('user/login', {
        "email": this.info.email,
        "password":this.info.password 
          
      }).subscribe(
        (data) => {
          // console.log("POST Request is successful ", data);
          LoggerService.log("POST Request is successful" , data) 
          this.snackBar.open("login successful", " ", {
            duration: 2000
          })
          // console.log(data['id']);
          localStorage.setItem('token',data['id'])
          localStorage.setItem("firstName",data["firstName"]);
          localStorage.setItem("lastname",data["lastName"]);
          localStorage.setItem("email",data["email"]);
          localStorage.setItem("userId",data["userId"]);
          localStorage.setItem("imageUrl",data["imageUrl"])
          this.router.navigateByUrl('home')
        },
        error => {
          console.log("Password or emailid is wrong")
          this.snackBar.open("login falied", "Password or emailid is incorrect", {
            duration: 2000
          })
          console.log("Error", error);
        })
        return false;
      }
  
  ngOnInit() {
   
  }
}
