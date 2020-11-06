import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { UtilService } from 'src/app/services/util.service';
declare var BMap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @ViewChild('map', null) mapContainer: ElementRef;
  map: any;
  dataList: Array<any>;
  dataTotal: number;

  constructor(private geolocation: Geolocation,
    private toast: ToastService,
    private http: HttpClient,
    private util: UtilService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.map = new BMap.Map(this.mapContainer.nativeElement);
    this.map.addEventListener('tilesloaded', () => {
      let centerPoint = this.map.getCenter();
      this.getData(centerPoint.lng, centerPoint.lat);
    });
    this.goBack();
  }
  goBack() {
    // let geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition((r) => {
    //   let point = r.point;
    //   let marker = new BMap.Marker(point);
    //   this.map.addOverlay(marker);
    //   this.map.centerAndZoom(point, 15);
    // }, { enableHighAccuracy: true })

    this.geolocation.getCurrentPosition().then((resp) => {
      let lng = resp.coords.longitude;
      let lat = resp.coords.latitude;
      let oldPoint = new BMap.Point(lng, lat);
      let oldPointArray = [];
      oldPointArray.push(oldPoint);
      let convertor = new BMap.Convertor();
      convertor.translate(oldPointArray, 1, 5, (data) => {
        if (data.status === 0) {
          let newPoint = data.points[0];
          let marker = new BMap.Marker(newPoint);
          this.map.addOverlay(marker);
          this.map.centerAndZoom(newPoint, 15);
        }
      })
    }).catch((error) => {
      this.toast.show('地图处理异常，请重新进入应用');
    });
  }
  big() {
    this.map.zoomIn();
  }
  small() {
    this.map.zoomOut();
  }
  getData(lng: number, lat: number) {
    this.http.post(`/mysql/common/query`, {
      db: 'iov',
      proc: 'bss_xp_findvehs',
      inPlat: false,
      inOem: false,
      param: [lng, lat]
    }).subscribe((data: any) => {
      data.data.forEach(x => {
        let itemNum = this.util.getIntRandom(1, 5);
        x.item = itemNum == 1 ? '胎压异常' : itemNum == 2 ? '转向助力异常' : itemNum == 3 ? '大灯故障' : itemNum == 4 ? '发动机异响' : '补胎';
        x.score = this.util.getIntRandom(35, 50) / 10;
        x.mile = this.util.getIntRandom(0, 50) / 10;
        x.img = this.util.getIntRandom(1, 10);
      });
      this.map.clearOverlays();
      this.dataList = data.data;
      this.dataTotal = data.data.length;
      this.dataList.forEach(x => {
        this.drawVeh(x.c_lng, x.c_lat);
      });
    });
  }
  drawVeh(lng: number, lat: number) {
    let point = new BMap.Point(lng, lat);
    let marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
  }



}
