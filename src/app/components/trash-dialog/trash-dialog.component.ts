import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MoreComponent } from '../more/more.component';
import { DialogData } from '../dialog-component/dialog-component.component';
import { NoteService } from 'src/app/core/services/noteservice/note.service';


@Component({
  selector: 'app-trash-dialog',
  templateUrl: './trash-dialog.component.html',
  styleUrls: ['./trash-dialog.component.scss']
})

export class TrashDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private noteService: NoteService) { }
  ngOnInit() {
  }
}
