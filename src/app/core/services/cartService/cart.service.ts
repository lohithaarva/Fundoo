import { Injectable } from '@angular/core';
import { httpService } from '../httpservice/http.service';
import { environment } from '../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.baseUrl;

  public url;
  public httpOptions ;
  public http;
  constructor(private service: httpService) { }

  
  addToCart(RequestBody) {

    this.url = this.baseUrl + "/productcarts/addToCart";
    return this.service.PostJson(this.url, RequestBody)
  }
  getCarDetails(cartId){
      this.url = this.baseUrl +"/productcarts/getCartDetails/" + cartId;
      return this.service.getJson(this.url);
  }
}
