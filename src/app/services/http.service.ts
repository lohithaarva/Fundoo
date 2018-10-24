import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://34.213.106.173/api/';

  constructor(private http: HttpClient) { }
  getData(url){
     url= this.url+url;
     return this.http.get(url);
  }
  postData(url,body){
    url=this.url+url;
    return this.http.post(url,body);
  }
  postpassword(url,body){
    url=this.url+url;
    return this.http.post(url,body);
  }
  postlogin(url,body){
    url=this.url+url;
    return this.http.post(url,body);
  }
  postReset(name,input,access_token){
    console.log(input);
    console.log(access_token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    };
    return this.http.post(this.url+"/"+name,this.getFormUrlEncoded(input),httpOptions)
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  postLogout(name,access_token){
    // console.log(url);
    console.log(access_token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json' ,
        'Authorization' : access_token
      })
    };
    return this.http.post(this.url+" "+name, null, httpOptions)

  }
  addNotes(url,body,access_token){
    // console.log(url);
    // console.log(access_token)
    url= this.url+url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded' ,
        'Authorization' : access_token
      })
    };
    return this.http.post(url,this.getFormUrlEncoded(body), httpOptions)
  }

  getNotes(url,access_token){
    url=this.url+url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded' ,
        'Authorization' : access_token
      })
    };
    return this.http.get(url,httpOptions)
  }
}
  

