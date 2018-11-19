import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  url = 'http://34.213.106.173/api/';

  constructor(private http: HttpClient) { }
  getData(url) {
    url = this.url + url;
    return this.http.get(url);
  }
  postData(url, body) {
    url = this.url + url;
    return this.http.post(url, body);
  }
  postpassword(url, body) {
    url = this.url + url;
    return this.http.post(url, body);
  }
  postlogin(url, body) {
    url = this.url + url;
    return this.http.post(url, body);
  }
  postReset(name, input, access_token) {
    console.log(input);
    console.log(access_token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    };
    return this.http.post(this.url + "/" + name, this.getFormUrlEncoded(input), httpOptions)
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

  postLogout(name, access_token) {
    // console.log(url);
    console.log(access_token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': access_token
      })
    };
    return this.http.post(this.url + name, null, httpOptions)

  }
  addNotes(url, body, access_token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    };
    return this.http.post(url, this.getFormUrlEncoded(body), httpOptions)
  }

  getNotes(url, access_token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    };
    return this.http.get(url, httpOptions)
  }

  deleteNotes(url, body, access_token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': access_token
      })
    };
    return this.http.post(url, body, httpOptions)

  }

  trashNotes(url, access_token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': access_token
      })
    };
    return this.http.get(url, httpOptions)
  }

  setColors(url, body, access_token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': access_token
      })
    };
    return this.http.post(url, body, httpOptions)
  }

  postArchive(url, body, access_token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': access_token
      })
    };
    return this.http.post(url, body, httpOptions)

  }
  getArchive(url, access_token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': access_token
      })
    };
    return this.http.get(url, httpOptions)
  }
  noteUpdate(url, body, access_token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    };
    return this.http.post(url, this.getFormUrlEncoded(body), httpOptions)
  }

  postLabel(url, body, access_token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    }
    return this.http.post(url, this.getFormUrlEncoded(body), httpOptions)
  }

  access_token = localStorage.getItem('token')
  deleteLabel(url, body) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.access_token
      })
    }
    return this.http.delete(url, body);
  }

  postDel(url, body, access_token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': access_token
      })
    };
    // console.log(this.getFormUrlEncoded(input))
    return this.http.post(url, body, httpOptions)
  }

  delete(name, token) {
    // var url = `${this.URL + "/" + name}/${id}/${"deleteNoteLabel"}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.delete(this.url + "/" + name, httpOptions)

  }

  get(name, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    }
    return this.http.get(this.url + "/" + name, httpOptions);
  }

  httpAddImage(nexturl, body, token) {
    console.log(token);
    var httpOptions = {
      headers: new HttpHeaders({

        'Authorization': token
      })
    };
    return this.http.post(this.url + "/" + nexturl, body, httpOptions)
  }

  // pin(nexturl, body, token) {
  //   console.log(token);
  //   var httpOptions = {
  //     headers: new HttpHeaders({

  //       'Authorization': token
  //     })
  //   };
  //   return this.http.post(this.url + "/" + nexturl, body, httpOptions)
  // }
  // pin(RequestBody){
  //   this.url = this.url +"/notes/pinUnpinNotes";
  //   return this.my.NewPost(this.url, RequestBody, this.httpO)

  // }

}
