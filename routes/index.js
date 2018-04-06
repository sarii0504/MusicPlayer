var express = require('express');

var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {//用于进入主页
  res.render('index.jade', { title: '音乐播放器' });//渲染页面并传递参数
});
router.get('/likes',function(req,res){
    readDirSync(root1);
    res.render('likes.jade',{title:"喜欢的歌",catalog:titles,getPrefix:root1});//返回信息
     });
router.get('/dislikes',function(req,res){
    readDirSync(root2);
    res.render('dislikes.jade',{title:"不喜欢的歌",catalog:titles,getPrefix:root2});//返回信息
});

var fs = require('fs');
var path=require("path");

var root1 = "../public/resource/likes";//当前文件夹
var root2="../public/resource/dislikes";//当前文件夹

var titles=null;



function readDirSync(path){
    var cnt=0;
    titles=null;

    var pa = fs.readdirSync(path);
    pa.forEach(function(ele,index){
        var info = fs.statSync(path+"/"+ele);
        if(getdir(ele)=="mp3"){//只获取后缀为mp3的文件
            //console.log("file: "+ele);  //ele即文件全名
            if(cnt++==0)
                titles=ele+' ';
            else {
                titles = titles + ele + ' ';//titles是一个字符串，格式如001.mp3 002.mp3，并发送给likes/dislikes页面
            }
        }
    });
}
function getdir(url){
    var arr = url.split('.');
    var len = arr.length;
    return arr[len-1];
}

module.exports = router;

