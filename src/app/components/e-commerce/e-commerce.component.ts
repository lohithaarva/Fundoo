import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../core/services/cartService/cart.service';
import { UserService } from '../../core/services/userService/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ECommerceDialogComponent } from '../e-commerce-dialog/e-commerce-dialog.component';
import { MatDialog } from '@angular/material';



@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  colorEvent: boolean = true;
  
  constructor(private cartService: CartService, private userService: UserService,private dialog: MatDialog) { }


private cartArray=[];

  ngOnInit() {
    this.userService.getCards()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      var data = response["data"];
      for (var i = 0; i < data.data.length; i++) {
        this.cartArray.push(data.data[i]);
      }
    })
    // this.cartArray.push({index:1,select:false})
    // this.cartArray.push({ index: 2, select: false })
  }

  
  clicked(cart){
    
    cart.select = true;
    for (let i = 0; i < this.cartArray.length; i++) {
      if (cart.index == this.cartArray[i].index) {
        continue;
      }
      this.cartArray[i].select = false;
    }
  }


  openEcommerceDialog(cart): void {
    console.log('cart', cart);
    const dialogRef = this.dialog.open(ECommerceDialogComponent, {
      width: '500px',
      data: cart
     
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
