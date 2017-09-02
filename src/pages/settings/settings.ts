import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Location } from './../../model/location.interface';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city: string;
  state: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _storage: Storage,
    private _toast: ToastController
  ) {

    this._storage.get('location').then( res => {
      if( res != null){
        let location: Location = JSON.parse(res);
        this.city = location.city;
        this.state = location.state;
      } else {
        this.city = "Miami";
        this.state = "FL";
      }
    })
  }

  saveForm() {
    let location: Location = {
      city: this.city,
      state: this.state
    }
    this._storage.set('location', JSON.stringify(location));
    this.mostrarToast(this.city + " updated!");
  }

  mostrarToast(msg: string){
    let toast = this._toast.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
