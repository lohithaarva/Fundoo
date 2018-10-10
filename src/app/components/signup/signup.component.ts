import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { trigger, state, style, animate, transition, } from '@angular/animations';

@Component({
  selector: 'app-signup',
  animations: [
    trigger('basic', [ state('open', style({ color:'white', height:'90px', width:'150px',cursor: 'pointer',
                    background: 'linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))'})),
                      state('closed', style({ color:'black', height:'90px', width:'150px',cursor: 'pointer',
                      background:' linear-gradient(to right, rgb(31, 64, 55), rgb(153, 242, 200))'})),
                      transition('open => closed', [ animate('1s')]),
                      transition('closed => open', [ animate('0.5s')
                      ]),
                    ]),   
                ,
    trigger('advance', [ state('open', style({ color:'white', height:'97px', width:'150px',cursor: 'pointer',
                background: 'linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))'})),
                  state('closed', style({ color:'black', height:'97px', width:'150px',cursor: 'pointer',
                  background:' linear-gradient(to right, rgb(31, 64, 55), rgb(153, 242, 200))'})),
                  transition('open => closed', [ animate('1s')]),
                  transition('closed => open', [ animate('0.5s')
                  ]),
                ]),   
            ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  records ={};
  isBasic = true;
  isAdvance = true;
  basic : any;
  advance : any;
  constructor(private myHttpService: HttpService){ }

  card1() {
    this.isBasic = !this.isBasic;
    this.records = this.myHttpService.getData('user/service').subscribe(data =>{
      console.log('response',data)
      // this.basic = data["data"].data[0].description;
    })
  }
  card2() {
    this.isAdvance = !this.isAdvance;
    this.records = this.myHttpService.getData('user/service').subscribe(data =>{
      console.log('response',data)
      // this.advance = data["data"].data[1].description;
    })
  }

  info:any = {};
  service:any;

  next(){

    console.log(this.info.firstName);
    console.log(this.info.lastName);
    console.log(this.info.userName);
    console.log(this.info.email);
    this.myHttpService
    .postData('user/userSignUp',{
      "firstName": this.info.firstName,
      "lastName": this.info.lastName,
      "phoneNumber": "7022145848",
      "service": "string",
      "email": this.info.email ,
      "emailVerified": true,
      "password": this.info.password,
      "username": this.info.userName, 
     "createdDate": "2018-10-09T06:35:12.617Z",
    "modifiedDate": "2018-10-09T06:35:12.617Z",
  }).subscribe(
    (data )=> {
        console.log("POST Request is successful ", data);
},
    error => {
        console.log("Error", error);
    }

  )

} 

  ngOnInit() {
  
  }
}

