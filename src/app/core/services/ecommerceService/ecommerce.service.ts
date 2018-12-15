import { Injectable } from '@angular/core';
import { httpService } from '../httpservice/http.service';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  baseUrl = environment.baseUrl;

  public url;
  public httpOptions ;
  public http;
  constructor(private service: httpService) { }

  myCartDetails(){
    this.url = this.baseUrl +"/productcarts/myCart"
    return this.service.getJson(this.url)
  }

  cartPlaceOrder(RequestBody){
    this.url = this.baseUrl +"/productcarts/placeOrder"
    return this.service.PostJson(this.url,RequestBody)
  }
}
