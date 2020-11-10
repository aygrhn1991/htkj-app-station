import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Result } from 'src/app/models/result.model';
import { ToastService } from 'src/app/services/toast.service';
import { UtilService } from 'src/app/services/util.service';
declare var BMap: any;
declare var BMapGL: any;

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
    this.map = new BMapGL.Map(this.mapContainer.nativeElement);
    this.map.enableScrollWheelZoom(false);
    this.map.addEventListener('tilesloaded', () => { this.getData(); });
    this.goBack();
  }
  goBack() {
    // let geolocation = new BMapGL.Geolocation();
    // geolocation.getCurrentPosition((r) => {
    //   let point = r.point;
    //   this.map.centerAndZoom(point, 15);
    // }, { enableHighAccuracy: true })

    this.geolocation.getCurrentPosition().then((resp) => {
      let lng = resp.coords.longitude;
      let lat = resp.coords.latitude;
      let oldPoint = new BMapGL.Point(lng, lat);
      let oldPointArray = [];
      oldPointArray.push(oldPoint);
      let convertor = new BMap.Convertor();
      convertor.translate(oldPointArray, 1, 5, (data) => {
        if (data.status === 0) {
          let newPoint = data.points[0];
          this.map.centerAndZoom(newPoint, 15);
        }
      })
    }).catch((error) => {
      this.toast.show('地图处理异常，请重新进入应用');
    });
  }
  big() {
    this.map.zoomIn();
    this.getData();
  }
  small() {
    this.map.zoomOut();
    this.getData();
  }

  getData() {
    console.log('执行获取数据方法');
    let centerPoint = this.map.getCenter();
    let zoom = this.map.getZoom();
    let lng = centerPoint.lng;
    let lat = centerPoint.lat;
    this.http.post(`/gis/toXzqhXY`, { x: lng, y: lat }).subscribe((data: Result) => {
      console.log('缩放级别', zoom);
      console.log('行政区划', data);
      this.http.post(`/mysql/common/query`, {
        db: 'iov',
        proc: 'bss_xp_findvehs_xzqh',
        inPlat: false,
        inOem: false,
        param: [data.data, (zoom >= 10) ? 1 : (zoom < 10 && zoom > 6) ? 2 : 3]
      }).subscribe((data: any) => {
        console.log('返回数据', data);
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
        if(this.dataList.length>100){
          this.dataList=this.dataList.slice(0,100);
        }
        this.dataList.forEach(x => {
          if (zoom >= 10) {
            this.drawVeh1(x.c_lng, x.c_lat);
          } else if (zoom < 10 && zoom > 6) {
            this.drawVeh2(x.c_lng, x.c_lat, x.cn);
          } else {
            this.drawVeh2(x.c_lng, x.c_lat, x.cn);
          }
        });
      });
    });





  }
  drawVeh1(lng: number, lat: number) {
    let point = new BMapGL.Point(lng, lat);
    let marker = new BMapGL.Marker(point);
    this.map.addOverlay(marker);
  }
  drawVeh2(lng: number, lat: number, count: number) {
    let opts = {
      position: new BMapGL.Point(lng, lat),
      offset: new BMapGL.Size(0, 0)
    };
    let label = new BMapGL.Label(count, opts);
    label.setStyle({
      color: '#fff',
      borderRadius: '5px',
      borderColor: '#f00',
      backgroundColor: '#f00',
      padding: '2px',
      fontSize: '12px'
    });
    this.map.addOverlay(label);
  }



}
