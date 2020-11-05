import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss'],
})
export class MyOrderComponent implements OnInit {

  tab: number = 1;
  list: Array<any> = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.list.push(i);
    }
  }

}
