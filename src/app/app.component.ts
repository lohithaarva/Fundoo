import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from './core/services/message-service/message-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fundoo';

  message;
  messaging;

  constructor(private msgService: MessageServiceService){
  }
   
  ngOnInit() {
     
    this.msgService.getPermission()
    // this.message = this.msgService.currentMessage
  }
  }

