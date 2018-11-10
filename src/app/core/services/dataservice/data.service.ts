import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();
  currentDelete = this.messageSource.asObservable();
  

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeDelete(message:boolean){
    this.messageSource.next(message);
  }
  

  private gridToList = new Subject<boolean>();
  currentView = this.gridToList.asObservable();

  changeView(message:boolean){
    this.gridToList.next(message);
  }

  private msgSource = new BehaviorSubject(false);
  currentMsg = this.msgSource.asObservable();

  changeMsg(message: boolean) {
  this.msgSource.next(message);
  }

}
