import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {

  constructor(private myHttpService : HttpService) { }
  @Input() noteDeleteCard;
  @Output() delete = new EventEmitter();
  ngOnInit() {
   
  }
  token = localStorage.getItem("token");

  deleteCard(id){
    console.log(this.noteDeleteCard);
    this.myHttpService.deleteNotes('/notes/trashNotes',{
      "isDeleted": true,
      "noteIdList":[this.noteDeleteCard.id]
    }, this.token).subscribe(
      (data) =>{
        console.log("Post Request is successful", data);
        this.delete.emit({})
        },error=>{
        console.log("Error", error);
      })
  }

}
