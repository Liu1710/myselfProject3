import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
//引入请求模块
import {HttpClient,HttpParams} from "@angular/common/http";  //依赖注入
//引入storage，类似于session
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  user={
    email:"",
    password:"",
    gender:"male",
    avatar:"default.png",
    nick:"",
    dob:"",
    username:"",
    mobile:""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private storage:Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  signUp():void{
    let url="/signUp";
    //let params = new HttpParams().set("email",this.user.email).set("password",this.user.password);
    this.httpClient.post(url,{email:this.user.email,password:this.user.password}).subscribe(
      res=>{
          if(res['status']==="exists"){
              this.alertCtrl.create({
                title:"错误",
                subTitle:"邮箱已经存在",
                buttons:[
                  "确认"
                ]
              }).present();
          }
          if(res['status']==="ok"){
              this.toastCtrl.create({
                message:"注册成功",
                duration:1500
              }).present();
              let id = res["id"];
              this.user['id']=id;
              this.storage.set("user",this.user);
              this.navCtrl.push("UserPage");
          }
          if(res['status']==="err"){
            this.toastCtrl.create({
              message:"服务器错误",
              duration:2000
            }).present();
          }
      },
      error=>{
          console.log(error)
      }
    );
  }
}
