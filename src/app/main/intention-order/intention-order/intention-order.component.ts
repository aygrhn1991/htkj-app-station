import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intention-order',
  templateUrl: './intention-order.component.html',
  styleUrls: ['./intention-order.component.scss'],
})
export class IntentionOrderComponent implements OnInit {

  tab: number = 1;
  list: Array<any> = [
    { order: '2020110610490001', state: '进行中', vm: '解放J6L 4x2', vno: '黑A67R01', time: '2020-11-06 13:00', user: '陈玉锋', phone: '15645100192', money: 300, item: '发动机异响，换机油' },
    { order: '2020110610490002', state: '进行中', vm: '解放新J6P 6x2', vno: '黑A32ET3', time: '2020-11-06 09:00', user: '姜海峰', phone: '18945035587', money: 230, item: '转向助力过紧' },
    { order: '2020110610490003', state: '已完成', vm: '一汽解放J6P 8x2', vno: '黑A66592', time: '2020-11-05 10:00', user: '刘明月', phone: '18655981208', money: 150, item: '补胎，轮胎校正' },
  ];

  constructor() { }

  ngOnInit() { }

}
