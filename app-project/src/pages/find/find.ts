import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find',
  templateUrl: 'find.html',
})
export class FindPage {
  // items=[];
  products;
  page:number = 1;
  hasMoreData:boolean=true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpClient:HttpClient
  ) {
    //数据库查询的第一页数据
    //for(let i=0;i<30;i++){
    //this.items.push(this.items.length)
    // }
  }

  ionViewDidLoad() {
    //第一页数据
    let url = "/products/1";
    this.httpClient.get(url).subscribe(
      res=>{
        this.products = res;
        //console.log(res)
      },
      err=>{
        console.log(err)
      }
    );
  }
  //每次滚动到底部就触发事件在原来的页面基础上先加1后赋值page,滚动到底部时显示第二页、第三页。。。。数据
  loadMoreData(event):void{
    let url = `/products/${++this.page}`;
    //console.log(this.page);
    this.httpClient.get(url).subscribe(
      res=>{
        let length = res['length'];
        if(length<20 || length===0){
          this.hasMoreData = false;
        }else{
          this.products = this.products.concat(res);
        }
        //事件对象调用complete函数，告诉组件新数据加载完成，如果不调用就无法加载后面的数据
        //滚动到头就会触发此事件
        event.complete();
        //console.log(res)
      },
      err=>{
        console.log(err)
      }
    );
  }
  toDetailPage(id):void{
    console.log(id);
    this.navCtrl.push("DetailPage",{id:id});
  }

  //分类查询
  synthesize():void{
    let url = "/synthesize";
    this.httpClient.get(url).subscribe(
      res=>{
        this.products = res['synthesize'];
      },
      err=>{
        console.log(err)
      }
    )
  }
  sales():void{
    let url = "/list";
    this.httpClient.get(url).subscribe(
      res=>{
        //console.log(res);
        this.products = res['list'];
      },
      err=>{
        console.log(err)
      }
    )
  }
  price():void{
    let url = "/price";
    this.httpClient.get(url).subscribe(
      res=>{
        //console.log(res);
        this.products = res['price'];
      },
      err=>{
        console.log(err)
      }
    )
  }
  newest():void{
    let url = "/newest";
    this.httpClient.get(url).subscribe(
      res=>{
        //console.log(res);
        this.products = res['newest'];
      },
      err=>{
        console.log(err)
      }
    )
  }

  /*doInfinite(infiniteScroll):void{
      console.log("开始")
     //模拟请求的时间
      setTimeout(()=>{
        //查询下一页数据
        for(let i=0;i<30;i++){
          this.items.push(this.items.length)
        }
        console.log("结束")
        //告诉组件新数据加载完成
        infiniteScroll.complete();
      },500);
  }*/
}
