import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient} from "@angular/common/http";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  id="";
  detail={};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient
  ) {
    this.id = this.navParams.get("id");
    //console.log(this.id)
  }

  ionViewDidLoad() {
    let url = `/details?id=${this.id}`;
    this.httpClient.get(url).subscribe(
      res=>{
        let pDetail = res['detail'];
        let status = res['status'];
        if(status==="ok"){
          this.detail = pDetail;
          console.log(this.detail)
        }
        //console.log(res)
      },
      err=>{
        console.log(err)
      }
      )

  }

}
