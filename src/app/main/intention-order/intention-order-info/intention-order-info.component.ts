import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intention-order-info',
  templateUrl: './intention-order-info.component.html',
  styleUrls: ['./intention-order-info.component.scss'],
})
export class IntentionOrderInfoComponent implements OnInit {

  queue: boolean = true;
  
  constructor() { }

  ngOnInit() { }

}
