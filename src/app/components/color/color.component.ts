import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import { HttpService } from '../../core/services/httpservice/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  constructor(private myHttpService : HttpService) { }
  @Input() noteColorCard;
  @Output() emitColor = new EventEmitter;
  @Output() emitColorNotes = new EventEmitter<string>()
  token = localStorage.getItem("token");
  colorArray=[['#fafafa','#ff8a80','#ffd180','#ffff8d'],['#ccff90','#a7ffeb','#80d8ff','#82b1ff'],['#b388ff','#f8bbd0','#d7ccc8','#cfd8dc']];
  ngOnInit() {
  }

  changeColor(colorcode){
    this.emitColorNotes.emit(colorcode)
    if(this.noteColorCard != undefined){
      this.myHttpService.setColors('/notes/changesColorNotes',{
        "color":colorcode,
      "noteIdList":[this.noteColorCard.id]
      },this.token).subscribe(
        (data) =>{
          LoggerService.log("Color Request is successful", data);
          this.emitColor.emit()
          localStorage.setItem('color', colorcode);
  
          },error=>{
          LoggerService.log("Error", error);
        })
    }
   

      
  }

}
