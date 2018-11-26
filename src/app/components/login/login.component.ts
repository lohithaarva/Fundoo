import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup , Validators} from '@angular/forms'
import {LoggerService} from '../../core/services/logger/logger.service';
import { MessageServiceService } from 'src/app/core/services/message-service/message-service.service';
import { UserService } from 'src/app/core/services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
constructor(public snackBar: MatSnackBar,private userService: UserService,
   private router:Router,
   private msgService: MessageServiceService ) { }
  info:any = {};
  hide = true;
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
    LoggerService.log(this.info.email); 
    var requestBody = {
      "email": this.info.email,
        "password":this.info.password      
    }
    this.userService
      .loginPost(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          // console.log("POST Request is successful ", data);
          LoggerService.log("POST Request is successful" , data) 
          this.snackBar.open("login successful", " ", {
            duration: 2000
          })
          // console.log(data['id']);
        
          localStorage.setItem("token",data['id'])
          localStorage.setItem("firstName",data["firstName"]);
          localStorage.setItem("lastname",data["lastName"]);
          localStorage.setItem("email",data["email"]);
          localStorage.setItem("userId",data["userId"]);
          localStorage.setItem("imageUrl",data["imageUrl"])
          var token=localStorage.getItem('token')
          console.log(token)
          var pushToken=localStorage.getItem('pushToken')
          console.log(pushToken)
          var body={
          'pushToken':pushToken
          }
          this.userService.registerToken(body)
          .subscribe(data=>
          {
          console.log(data)
          })
          this.router.navigate(['home']);
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
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
