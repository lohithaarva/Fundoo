/************************************************************************************************
*  Execution       :   1. default node         cmd> forget-password.ts 
*        
*  Purpose         :  To reset password.
* 
*  Description    
* 
*  @file           : forget-password.ts 
*  @overview       : To reset password.
*  @module         :  forget-password.ts  - This is optional if expeclictly its an npm or local package
*  @author         : LohithaShree <lohitha.arva@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { UserService } from 'src/app/core/services/userService/user.service';
/**A componenet can be reused throughout the application & even in other applications */

@Component({
  selector: 'app-forget-password',/**A string value which represents the component on browser at 
                                   execution time */
  templateUrl: './forget-password.component.html',/**External templating process to define html
                                   tags in component */
  styleUrls: ['./forget-password.component.scss']/**It is used to provide style of components */
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private info: any = {};

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  constructor(private userService: UserService, public snackBar: MatSnackBar) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  //**Method to reset password */
  reset() {
    var requestBody = {
      "email": this.info.email,
    }
    this.userService
      .resetPassword(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          LoggerService.log("POST Request is successful ", data);
        },
        error => {
          this.snackBar.open("Fill in all the details", "signup failed", {
            duration: 2000
          })
          LoggerService.log("Error", error);
        })
  }
  /** A callback method that performs custom clean-up, invoked immediately after a directive, 
     * pipe, or service instance is destroyed. */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
  }

}

