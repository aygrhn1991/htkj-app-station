import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPage } from './tabs.page';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from 'src/app/services/guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'my-order', pathMatch: 'full' },
      { path: 'my-order', loadChildren: () => import('../my-order/my-order.module').then(m => m.MyOrderModule), canActivate: [GuardService] },
      { path: 'intention-order', loadChildren: () => import('../intention-order/intention-order.module').then(m => m.IntentionOrderModule), canActivate: [GuardService] },
      { path: 'map', loadChildren: () => import('../map/map.module').then(m => m.MapModule), canActivate: [GuardService] },
      { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule), canActivate: [GuardService] },
    ]
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
