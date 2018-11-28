import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { httpService } from '../httpservice/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  baseUrl = environment.baseUrl;
  public url;
  public access_token = localStorage.getItem('id');
  public httpOptions;
  public httpO;
  public httpImage;
  constructor(private service: httpService) { }

askQuestionAnswer(noteId){
  this.url = this.baseUrl + "/notes/getNotesDetail/" + noteId;
  return this.service.getJson(this.url);
}
addQuestionToNote(RequestBody){
  this.url = this.baseUrl + "/questionAndAnswerNotes/addQuestionAndAnswer/";
  return this.service.PostJson(this.url , RequestBody)

}
}
