import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async show(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position:'middle',
      cssClass: 'ht-toast'
    });
    toast.present();
  }

}
