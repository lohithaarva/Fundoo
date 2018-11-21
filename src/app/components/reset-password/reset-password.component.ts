import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/userService/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();   
  service;
  info:any = {}; 
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);

  constructor(public snackBar: MatSnackBar,
    private userService: UserService,
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
      this.userService.setPassword((body))
      .pipe(takeUntil(this.destroy$))
      .subscribe(response=>{
        console.log("successfull",response);
        this.router.navigateByUrl('login')
      },error=>{
        console.log("failed",error)
      })
      console.log("accessToken",this.accessToken)
    }
  
  ngOnInit() {
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
