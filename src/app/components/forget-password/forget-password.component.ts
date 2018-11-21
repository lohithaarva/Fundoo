import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { UserService } from 'src/app/core/services/userService/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  info: any = {};
  service;

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  constructor(private userService: UserService, public snackBar: MatSnackBar) { }
  email = new FormControl('', [Validators.required, Validators.email]);

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
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
  }

}

