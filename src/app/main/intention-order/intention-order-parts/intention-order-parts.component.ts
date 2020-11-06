import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intention-order-parts',
  templateUrl: './intention-order-parts.component.html',
  styleUrls: ['./intention-order-parts.component.scss'],
})
export class IntentionOrderPartsComponent implements OnInit {

  list1: Array<any> = [
    { icon: 'albums', name: '节气阀门', select: false },
    { icon: 'analytics', name: '水箱', select: false },
    { icon: 'aperture', name: '活塞环', select: true },
    { icon: 'archive', name: '皮带', select: false },
    { icon: 'attach', name: '油封', select: false },
    { icon: 'bandage', name: '燃油泵', select: false },
    { icon: 'barbell', name: '滤清器', select: true },
    { icon: 'barcode', name: '电喷', select: false },
    { icon: 'baseball', name: '汽油泵', select: false },
    { icon: 'bonfire', name: '散热器', select: false },
    { icon: 'bulb', name: '自动波箱', select: false },
    { icon: 'cash', name: '增压器', select: false },
    { icon: 'cog', name: '消声器', select: false },
    { icon: 'color-filter', name: '气缸垫', select: false },
    { icon: 'crop', name: '链条', select: false },
  ];
  list2 = [
    { icon: 'cube', name: '转向节', select: false },
    { icon: 'disc', name: '转向盘', select: false },
    { icon: 'ear', name: '助力器', select: false },
    { icon: 'easel', name: '助力泵', select: false },
    { icon: 'film', name: '转向拉杆', select: true },
    { icon: 'flashlight', name: '球头', select: false },
  ];
  list3 = [
    { icon: 'git-branch', name: '雨刮片', select: false },
    { icon: 'hardware-chip', name: '汽车玻璃', select: false },
    { icon: 'help-buoy', name: '汽车空调', select: false },
    { icon: 'infinite', name: '安全带', select: false },
    { icon: 'link', name: '遮阳板', select: false },
  ];
  list = [
    { name: '发动机配件', list: this.list1 },
    { name: '转向配件', list: this.list2 },
    { name: '车身附件', list: this.list3 },
  ]

  constructor() { }

  ngOnInit() { }

}
