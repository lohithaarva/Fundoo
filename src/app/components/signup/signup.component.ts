import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/userService/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cartService/cart.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  hide = true;
  records = {};
  public card = [];
  info: any = {};
  private product;
  service;
  constructor(private userService: UserService, private cartService: CartService,public snackBar: MatSnackBar, private router: Router) { }
  cartId = localStorage.getItem('cartId')
  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  lastName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')])
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);
  getErrorMessagefirstName() {     
    return this.firstName.hasError('required') ? 'First Name is Required' :
      this.firstName.hasError('pattern') ? 'Invalid First Name' :
        '';
  }
  getErrorMessagelastName() {
    return this.lastName.hasError('required') ? 'Last Name is Required' :
      this.lastName.hasError('pattern') ? 'Invalid Last Name' :
        '';
  }
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
  getErrorMessageconfirmPassword() {
    return this.password.hasError('required') ? 'Confirmpassword is required' :
      this.password.hasError('pattern') ? 'Not a valid password' :
        '';
  }

  ngOnInit() {
    this.userService.getCards()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        var data = response["data"];
        for (var i = 0; i < data.data.length; i++) {
          this.card.push(data.data[i]);
        }
        console.log(this.card);
        this.getCardDetails();
      }) 
  }
  // displayCards(card) {
  //   console.log(card.name);
  //   this.service = card.name;
  //   card.choose = true;
  //   for (var i = 0; i < this.card.length; i++) {
  //     if (card.name == this.card[i].name) {
  //       continue;
  //     }
  //     this.card[i].choose = false;
  //   }

  // }
  check = false;
  next() {

    console.log(this.service)
    if (this.info.firstName == 0 || this.info.lastName == 0 || this.info.email == 0 ||
      this.info.password == 0 || this.service == 0) {
      console.log("fill all the details")
      this.snackBar.open("Fill in all the details", "signup failed", {
        duration: 2000
      })
      return;
    }
    // else if(!this.info.firstName == this.info.lastName){
    //   console.log("give a valid name");
    //      this.check=true;
    //      this.snackBar.open("Firstname or Lastname doesnt match", "signup failed", {
    //        duration: 2000
    //      })
    //         return;

    //     }

    else if (!this.info.password == this.info.confirmPassword) {
      console.log("give same password to confirm");
      this.check = true;
      this.snackBar.open("Password doesnot match", "signup failed", {
        duration: 2000
      })
      return;
    }
    var requestBody = {
      "firstName": this.info.firstName,
      "lastName": this.info.lastName,
      "service": this.service,
      "email": this.info.email,
      "emailVerified": true,
      "password": this.info.password,
    }
    this.userService
      .signupPost(requestBody).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.router.navigateByUrl('home')
        })
  }

  getCardDetails(){
    this.cartService.getCarDetails(this.cartId) 
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.product=data['data'].productId;
        this.service=data['data']['product'].id;
  })
}

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}


