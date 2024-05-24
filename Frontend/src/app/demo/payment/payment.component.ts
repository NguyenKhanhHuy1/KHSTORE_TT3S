/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderdetailService } from 'src/app/services/orderdetail/orderdetail.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  order: Order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private location: Location,
    private orderdetailService: OrderdetailService
  ) {}
  ngOnInit(): void {
    this.getDetailOrder(this.route.snapshot.params['id']);
  }
  getDetailOrder(id: any): void {
    this.orderService.get(id).subscribe({
      next: (data) => {
        this.order = data;
        console.log(data);
        console.log(this.order);
      },
      error: (e) => console.error(e)
    });
  }
}
