import { Injectable } from '@angular/core';
import { httpService } from '../httpservice/http.service';
import { environment } from '../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;

public url;
public httpOptions ;
public http;
constructor(private service: httpService) { }

 getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
 

loginPost(RequestBody){
 
  this.url = this.baseUrl+"/user/login";
  return this.service.post(this.url,RequestBody)
}
signupPost(RequestBody){
  this.url = this.baseUrl +"/user/userSignUp";
  return this.service.post(this.url, RequestBody)

}
getCards(){
  this.url = this.baseUrl +"/user/service";
  return this.service.get(this.url)
}
resetPassword(RequestBody){
  this.url = this.baseUrl +"/user/reset";
  return this.service.post(this.url, RequestBody)
  
}
logout(RequestBody){

  this.url = this.baseUrl +"/user/logout";
  return this.service.PostUrlEncoded(this.url, RequestBody)

}
setPassword(RequestBody){
  
  this.url = this.baseUrl +"/user/reset-password";
  return this.service.PostnewPassword(this.url,this.getFormUrlEncoded(RequestBody))

}
registerToken(RequestBody){

  this.url = this.baseUrl +"/user/registerPushToken";
  return this.service.PostJson(this.url,RequestBody)
}
searchUserList(RequestBody){
  this.url = this.baseUrl +"/user/searchUserList";
  return this.service.PostJson(this.url,RequestBody);
}
}
