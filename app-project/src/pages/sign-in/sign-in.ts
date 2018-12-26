import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  user={
    email:"",
    password:"",
    avatar:"default.png"
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient,
    private alertCtrl:AlertController,
    private storage:Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  toSignUpPage():void{
    this.navCtrl.push("SignUpPage");
  }
  signIn():void{
   let url = "/signIn";
   this.httpClient.post(url,{user:this.user}).subscribe(
     res=>{
       if(res['status']==="ok"){
           this.storage.set("user",res['user']);
           this.navCtrl.push("UserPage")
       }
       if(res['status']==="err"){
         this.alertCtrl.create({
           title:"错误",
           subTitle:"无效的用户名和密码",
           buttons:[
             "确认"
           ]
         }).present();
       }
       if(res['status']==="error"){
         this.alertCtrl.create({
           title:"错误",
           subTitle:"无效的用户名和密码",
           buttons:[
             "确认"
           ]
         }).present();
       }
       console.log(res)
     },
     err=>{
       console.log(err)
     }
     )
  }
}
