import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DialogData } from '../dialog-component/dialog-component.component';
import { ECommerceComponent } from '../e-commerce/e-commerce.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cartService/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-e-commerce-dialog',
  templateUrl: './e-commerce-dialog.component.html',
  styleUrls: ['./e-commerce-dialog.component.scss']
})
export class ECommerceDialogComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private cartService: CartService, public dialogRef: MatDialogRef<ECommerceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,  private router: Router,) { }


  ngOnInit() {
   
  }
  onClose(){
    this.dialogRef.close();
  }

  onProceed(){
    // cartId = this.data['id'];
      var requestBody =  {
        "productId": this.data['id'],
        
      }
      this.cartService.addToCart(requestBody)    
      .subscribe((data) => {
        localStorage.setItem('cartId',data['data']['details'].id );
        console.log('cartghgvjuygId',data['data']['details'].id);
        
          console.log('success',data);
      },
      error =>
      {
        console.log(error);
      }
        )
    this.router.navigate(['signup']);
    this.dialogRef.close();
  }
  
}

