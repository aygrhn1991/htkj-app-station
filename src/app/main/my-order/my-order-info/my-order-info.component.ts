import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order-info',
  templateUrl: './my-order-info.component.html',
  styleUrls: ['./my-order-info.component.scss'],
})
export class MyOrderInfoComponent implements OnInit {

  step: number = 1;
  list: Array<any> = [];

  constructor() { }

  ngOnInit() { 
    for (let i = 0; i < 10; i++) {
      this.list.push(i);
    }
  }

}
