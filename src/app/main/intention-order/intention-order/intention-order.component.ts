import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intention-order',
  templateUrl: './intention-order.component.html',
  styleUrls: ['./intention-order.component.scss'],
})
export class IntentionOrderComponent implements OnInit {

  tab: number = 1;
  list: Array<any> = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.list.push(i);
    }
  }

}
