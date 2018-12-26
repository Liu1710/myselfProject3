const express = require("express");
const pool = require("./pool");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const  bcryptjs = require("bcryptjs");

//实例化express
let app = express();

//使用跨域中间件解决跨域问题
app.use(cors({
    origin:"*",
    credentials:true
}));

//请求消息体中间件
app.use(bodyParser.json());

//创建服务器
http.createServer(app).listen(3000);

/***
 * 用户注册功能
 */
app.post("/signUp",(req,res)=>{
    //接受请求
    let email = req.body.email;
    let password = req.body.password;
    //拼接sql1语句
    let sql1 = `SELECT * FROM user WHERE email=?`;
    //查询sql语句并执行结果，判断注册的邮箱是否存在
    pool.query(sql1,[email],(err,result)=>{
        if(err) throw err;
        if(result.length===1){
            res.json({status:"exists"})
        }
    });

    //拼接sql2语句
    let sql2 =`INSERT INTO user(email,password) VALUE(?,?)`;
    //对注册的密码进行加密,以防外漏
    let encryptedPassword = bcryptjs.hashSync(password,bcryptjs.genSaltSync(10));
    //查询sql语句并执行结果，注册新的邮箱
    //处理请求
    pool.query(sql2,[email,encryptedPassword],(err,result)=>{
        if(err) throw err;
        //返回响应
        if(result.affectedRows===1){
            res.json({status:"ok",id:result.insertId})
        }else{
           res.json({status:"err"})
        }
    });
});

/***
 * 用户登录功能
 */
app.post("/signIn",(req,res)=>{
    let user = req.body.user;
    //拼接sql语句
    let sql = `SELECT * FROM user WHERE email=?`;
    //对登录密码进行加密
    //查询sql语句,执行结果,查询数据库中是否有要登录的邮箱和密码
    pool.query(sql,[user.email],(err,result)=>{
        //console.log(result[0])
    if(err) throw err;
    if(result.length===1){
        //取出加密后的密码
        let encryptedPassword = result[0].password;
        //用明文密码和加密后的密码做对比
        if(bcryptjs.compareSync(user.password,encryptedPassword)){
            res.json({status:"ok",user:result[0]})
        }else{
            res.json({status:"err"})
        }
    }else{
        res.json({status:"error"})
    }
  });
});

/***
 * 用户信息更新功能
 */
app.post("/saveUserInfo",(req,res)=>{
    let user = req.body.user;
    let sql1 = `SELECT * FROM user WHERE username=? OR nick=?`;
    pool.query(sql1,[user.username,user.nick],(err,result)=>{
        if(err) throw err;
        if(result.length === 2){
            res.json({status:"usernameAndNickExist"});
        }else if(result.length === 1){
            let username = result[0].username;
            let nick = result[0].nick;
            if(username ===user.username && nick === user.nick){
                 res.json({status:"usernameAndNickExist"});
            }else if(username === user.username){
                res.json({status:"usernameExist"});
            }else{
                res.json({status:"nickExist"});
            }
        }
        let sql2 = `UPDATE user SET username=?,nick=?,gender=?,dob=? WHERE id=?`;
        pool.query(sql2,[user.username,user.nick,user.gender,user.dob,user.id],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows === 1){
                res.json({status:"ok"});
            }else{
                res.json({status:"err"});
            }
        });
    });
});

/***
 * 分页查询
 */
app.get("/products/:page",(req,res)=>{
    let page = req.params.page;
    const pageSize = 20;
    let sql = `SELECT * FROM product LIMIT ${pageSize} offset ?`;
    pool.query(sql,[(page-1)*pageSize],(err,result)=>{
       if(err) throw err;
       res.json(result);
    });
});

/**
 *商品详情
 */
app.get("/details",(req,res)=>{
   let id = req.query.id;
   let sql = `SELECT * FROM product WHERE id=?`;
   pool.query(sql,[id],(err,result)=>{
       if(err) throw err;
       if(result.length===1){
           res.json({status:"ok",detail:result[0]})
       }
   });
});

/**
 * 分类查询
 */
app.get("/synthesize",(req,res)=>{
    let sql = `SELECT * FROM product WHERE count>900 AND price>8000`;
    pool.query(sql,(err,result)=>{
        //console.log(result);
        if(err) throw err;
        if(result.length>0){
            res.json({statue:"ok",synthesize:result})
        }
    });
});
app.get("/list",(req,res)=>{
    let sql = `SELECT * FROM product WHERE count>900`;
    pool.query(sql,(err,result)=>{
        //console.log(result);
        if(err) throw err;
        if(result.length>0){
            res.json({statue:"ok",list:result})
        }
    });
});
app.get("/price",(req,res)=>{
    let sql = `SELECT * FROM product ORDER BY price desc`;
    pool.query(sql,(err,result)=>{
        //console.log(result);
        if(err) throw err;
        if(result.length>0){
            res.json({statue:"ok",price:result})
        }
    });
});


