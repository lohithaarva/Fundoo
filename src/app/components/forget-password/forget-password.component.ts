import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { UserService } from 'src/app/core/services/userService/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  info: any = {};
  service;

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  constructor(private userService: UserService, public snackBar: MatSnackBar) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  reset()
  {
    var requestBody = {
      "email": this.info.email,
    }
    this.userService
      .resetPassword(requestBody)
      .subscribe(
        (data) => {
          LoggerService.log("POST Request is successful ", data);
        },
        error => {
          // console.log("fill all the details")
          this.snackBar.open("Fill in all the details", "signup failed", {
            duration: 2000
          })
          LoggerService.log("Error", error);
        })
  }
 

  ngOnInit() {
  }

}
 
