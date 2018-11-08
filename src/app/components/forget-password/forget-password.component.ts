import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms'

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
  constructor(private myHttpService: HttpService, public snackBar: MatSnackBar) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  reset()
  {
    this.myHttpService
      .postpassword('user/reset', {
        "email": this.info.email,
      })
      .subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("fill all the details")
          this.snackBar.open("Fill in all the details", "signup failed", {
            duration: 2000
          })
          console.log("Error", error);
        })
  }
 

  ngOnInit() {
  }

}
 
