import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup , Validators} from '@angular/forms'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public snackBar: MatSnackBar ) { }


  


  info:any = {};
  isLeftVisible : any;
  email= new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
        }
  continue(){
    if (!this.email.invalid)
    {
      this.isLeftVisible = !this.isLeftVisible;
    }
    else
    {
      this.snackBar.open("login", "failed",{
            duration:2000
       })
  
    }
  }
  ngOnInit() {
    
  }
}
