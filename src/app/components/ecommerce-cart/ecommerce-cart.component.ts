import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EcommerceService } from 'src/app/core/services/ecommerceService/ecommerce.service';


@Component({
  selector: 'app-ecommerce-cart',
  templateUrl: './ecommerce-cart.component.html',
  styleUrls: ['./ecommerce-cart.component.scss'],

})
export class EcommerceCartComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private ecommerceService: EcommerceService) { }

  private flag2 = false;
  private flag = false;
  private cartOrder = false;
  private cardObj = {};
  private emptyCart = false;
  private value = 25;
  private address;
  private addNotGiven = false;
  private firstCss = true;
  private forCss;


  ngOnInit() {
    this.getCardDetails()
  }

  getCardDetails() {

    this.ecommerceService.myCartDetails()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {

        console.log(response['data']);
        if (response['data'].length != 0) {
          this.cardObj = response['data'][0].product;
          console.log(this.cardObj);
        }
        else {
          this.emptyCart = true;
        }

      });
  }

  cartPlaceOrder() {
    if (localStorage.getItem("cartId") == null) {
      console.log("cartId is not present");
      return;
    }
    if (this.address != undefined) {
      let reqBody = {
        "cartId": localStorage.getItem("cartId"),
        "address": this.address
      }
      this.ecommerceService.cartPlaceOrder(reqBody)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          console.log(response);
          this.value = 100
          this.cartOrder = true;
          this.flag = false;
          this.forCss = false

        });
    }
    else {
      console.log("enter address");
      this.addNotGiven = true

    }

  }
}
