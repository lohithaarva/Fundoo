import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MoreComponent } from '../more/more.component';
import { HttpService } from '../../services/http.service';
import { DialogData } from '../dialog-component/dialog-component.component';


@Component({
  selector: 'app-trash-dialog',
  templateUrl: './trash-dialog.component.html',
  styleUrls: ['./trash-dialog.component.scss']
})
export class TrashDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<MoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private myHttpService: HttpService) {}
  ngOnInit() {
  }

}
