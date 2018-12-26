import { Component } from '@angular/core';
//引入storage
import {Storage} from "@ionic/storage";
import {SignInPage} from "../sign-in/sign-in";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //声明属性
  aboutPage = 'HomePage';
  findPage = 'FindPage';
  catPage = 'CatPage';
  userPage = 'UserPage';
  cartPage = 'CartPage';

  //实例化storage
  constructor(private storage:Storage) {
    //清除storage里面的用户信息
    //this.storage.clear();
    //根据storage做判断,设置userPage要跳到的页面
    //从storage中取出用户信息然后进行判断
    this.storage.get("user").then(value => {
         //如果有user就跳转到UserPage页面,如果没有就跳转到SignInpage页面
          if(!value){
            this.userPage = 'SignInPage';
          }
      }
    )
  }
}
