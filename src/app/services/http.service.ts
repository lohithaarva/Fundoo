import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
  // getService(){
  //   this.http.get<any>(this.url);
  // }
  
}
