import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-signup',
  // animations: [
  // trigger('basic', [ state('open', style({ color:'white', height:'90px', width:'150px',cursor: 'pointer',
  //                 background: 'linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))'})),
  //                   state('closed', style({ color:'black', height:'90px', width:'150px',cursor: 'pointer',
  //                   background:' linear-gradient(to right, rgb(31, 64, 55), rgb(153, 242, 200))'})),
  //                   transition('open => closed', [ animate('1s')]),
  //                   transition('closed => open', [ animate('0.5s')
  //                   ]),
  //                 ]),   
  //             ,
  // trigger('advance', [ state('open', style({ color:'white', height:'97px', width:'150px',cursor: 'pointer',
  //             background: 'linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))'})),
  //               state('closed', style({ color:'black', height:'97px', width:'150px',cursor: 'pointer',
  //               background:' linear-gradient(to right, rgb(31, 64, 55), rgb(153, 242, 200))'})),
  //               transition('open => closed', [ animate('1s')]),
  //               transition('closed => open', [ animate('0.5s')
  //               ]),
  //             ]),   
  //         ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  records = {};
  public card = [];
  info: any = {};
  service;
  constructor(private myHttpService: HttpService) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  lastName = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')])
  // Name= new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')])
  password = new FormControl('',[Validators.required])

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

  ngOnInit() {

    this.myHttpService.getData("user/service")

      .subscribe((response) => {
        var data = response["data"];
        for (var i = 0; i < data.data.length; i++) {
          this.card.push(data.data[i]);
        }
        console.log(this.card);
      })

  }
  displayCards(card) {
    console.log(card.name);
    this.service = card.name;
    card.choose = true;
    for (var i = 0; i < this.card.length; i++) {
      if (card.name == this.card[i].name) {
        continue;
      }
      this.card[i].choose = false;
    }

  }

  // signup() {
  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.info))
  // }


  next() {

    console.log(this.info.firstName);
    console.log(this.info.lastName);
    console.log(this.info.email);
    console.log(this.info.password);
    this.myHttpService
      .postData('user/userSignUp', {
        "firstName": this.info.firstName,
        "lastName": this.info.lastName,
        "service": "string",
        "email": this.info.email,
        "emailVerified": true,
        "password": this.info.password,
        // "createdDate": "2018-10-09T06:35:12.617Z",
        // "modifiedDate": "2018-10-09T06:35:12.617Z",
      }).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
        },
        error => {
          console.log("Error", error);
        })
  }

}


