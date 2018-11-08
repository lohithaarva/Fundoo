import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  service;
  info:any = {}; 
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);

  constructor(public snackBar: MatSnackBar,
    private myHttpService: HttpService,
     private router:Router,
     public route:ActivatedRoute,) { }
     public accessToken=this.route.snapshot.params.forgotToken;

  getErrorMessagepassword() {
    return this.password.hasError('required') ? 'Password is Required' :
      this.password.hasError('pattern') ? 'Not a valid password' :
        '';
  }
  public input = new FormData();
  // Add your values in here 
  reset(){
  
      var body={
        "newPassword": this.info.password
      }
      if(this.info.password.length==0){
        console.log("please enter the password");
        return;
      }
      this.input.append('newPassword', this.info.password);
      console.log(this.input)
      this.myHttpService.postReset("user/reset-password",body,this.accessToken).subscribe(response=>{
        console.log("successfull",response);
      },error=>{
        console.log("failed",error)
      })
      console.log("accessToken",this.accessToken)
    }
  
  ngOnInit() {
  }

}
