import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { WeatherProvider } from './../../providers/weather/weather';
import { Storage } from '@ionic/storage';
import { Location } from './../../model/location.interface';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  weather: any;
  location = {} as Location

  constructor(
    public navCtrl: NavController,
    private _weather: WeatherProvider,
    private _storage: Storage
  ) { }

  ionViewWillEnter() {
    this._storage.get('location').then(res => {
      if (res != null) {
        this.location = JSON.parse(res);
      } else {
        //Default location
        this.location.city = "Miami";
        this.location.state = "FL";
      }

      this._weather.getWeather(this.location.city, this.location.state)
        .subscribe(res => {
          console.log(res);
          this.weather = res.current_observation;
        });
    });
  }

}
