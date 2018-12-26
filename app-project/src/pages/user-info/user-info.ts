import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {UserPage} from "../user/user";
import {Storage} from "@ionic/storage";


/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  user:any={};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient,
    private alertCtrl:AlertController,
    private storage:Storage
  ) {
  this.storage.get("user").then(value=>{
       this.user = value;
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }
  saveUserInfo():void{
    let url = "/saveUserInfo";
    this.httpClient.post(url,{user:this.user}).subscribe(
      res=>{
        let status = res['status'];
        let alert = this.alertCtrl.create({
          title:"错误",
          subTitle:"",
          buttons:[
            "确认"
          ]
        });
        if(status==="usernameAndNickExist"){
            alert.setSubTitle("用户名和昵称被占用").present();
        }else if(status === "usernameExist"){
            alert.setSubTitle("用户名被占用").present();
        }else if(status === "nickExist"){
            alert.setSubTitle("昵称被占用").present();
        }else if(status === "err"){
            alert.setSubTitle("服务器错误").present();
        }else if(status === "ok"){
            this.storage.set("user",this.user);
            this.navCtrl.push("UserPage");
        }
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
    //console.log(this.user)
  }

}
