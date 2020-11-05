import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrderComponent } from './my-order/my-order.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BlankComponent } from 'src/app/modules/blank/blank.component';

const routes: Routes = [
  { path: '', redirectTo: 'my-order' },
  { path: 'my-order', component: MyOrderComponent, },
];

@NgModule({
  declarations: [
    BlankComponent,
    MyOrderComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MyOrderModule { }
