import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntentionOrderComponent } from './intention-order/intention-order.component';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from 'src/app/modules/blank/blank.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  { path: '', redirectTo: 'intention-order' },
  { path: 'intention-order', component: IntentionOrderComponent, },
];

@NgModule({
  declarations: [
    BlankComponent,
    IntentionOrderComponent,
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class IntentionOrderModule { }
