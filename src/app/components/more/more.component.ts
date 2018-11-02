import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
checkboxLabel = [];
search : any;
  constructor(private myHttpService : HttpService) { }
  @Input() noteDeleteCard;
  @Output() delete = new EventEmitter();
  @Output() labelEvent = new EventEmitter();
  
  ngOnInit() {
  
    
   this.getLabels();
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

  getLabels() {
  
    this.myHttpService.get("noteLabels/getNoteLabelList", localStorage.getItem('token')).subscribe(
      response => {
        this.checkboxLabel = response['data']['details'];
      })
    }

    selectLabel(id){
      this.labelEvent.emit(id);
        console.log("selected label is", id);
        console.log( 'Id is here', id.label);
        
        // if (this.noteDeleteCard!= null && markLabel.isChecked==null){    
          console.log(id)
          this.myHttpService.addNotes("/notes/" + this.noteDeleteCard.id + "/addLabelToNotes/" + id.id + "/add",{"noteId" : this.noteDeleteCard.id,
        "lableId" : id.id}, localStorage.getItem('token'))
            .subscribe(Response => {
              console.log(Response);
              this.delete.emit({})
            }, error => {
              console.log(error)
            })
          // }
}
}
