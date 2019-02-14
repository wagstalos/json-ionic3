import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  data:Observable<any>;
  items:any;
  url:string;

  constructor(public toast: NavController, public http: HttpClient, private network: Network) {
    this.url = 'https://wpsgames.com.br/app/prodigium/produtos.json';
    this.getData();

    //online
    this.network.onConnect().subscribe(() => {
      console.log('network was connected :-(');
      this.toast.create({
        message: "Bem-vindo a Prodigium!",
        duration: 3000
      }).present();
    });
    //offline
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.toast.create({
        message: "Você precisa estar conectado para carregar os produtos.",
        duration: 3000
      }).present();
    });
  }
  getData(){
    this.data = this.http.get(this.url)
    this.data.subscribe(data => {
    this.items = data;
    });
    }
  //   doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');
  //   this.data = this.http.get(this.url)
  //   this.data.subscribe(data => {
  //     this.items = this.items.concat(data);
  //     infiniteScroll.complete();
  //   });  
  // }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
      this.data = this.http.get(this.url)
      this.data.subscribe(data => {
      this.items = data;
      refresher.complete();
    });
  }
}