//func.js
var script=document.createElement("script");
script.src="javascripts/jquery.js";

var pre = "/resource/likes/";//前缀
var pre2="/resource/dislikes/";
var prefix;
var songNum = 0;//记录当前歌曲的编号
var songName;//存储歌曲名
var songTotal=0;//歌曲总数
var repeat=0;
var isFirst=1;//是否是第一首歌
var audioAddress;
var imageAddress;
var lyricsAddress;

function playNextSong() {
    songNum = songNum + 1;//2
    if (songNum == songTotal) {
        songNum=0;
    }//溢出

    audioAddress=prefix+songName[songNum]+".mp3";
    imageAddress=prefix+songName[songNum]+".png";

    document.getElementById("audioSrc").src =audioAddress;
    document.getElementById("myMusic").load();
    document.getElementById("musicImg").src=imageAddress;
    getLyrics();
}//播放下一首歌
function playLastSong() {
    songNum=songNum-1;
    if (songNum == -1) {
        songNum = songTotal-1;//最后一首
    }//溢出

    audioAddress=prefix+songName[songNum]+".mp3";
    imageAddress=prefix+songName[songNum]+".png";

    document.getElementById("audioSrc").src =audioAddress;
    document.getElementById("myMusic").load();
    document.getElementById("musicImg").src=imageAddress;
    getLyrics();
}//播放上一首歌

function getLyrics() {
    lyricsAddress=prefix+songName[songNum]+".txt";
    var data;
    $(function(){
        $.ajax({
            url: lyricsAddress,
            dataType: 'text',
            success: function(data) {
                document.getElementById("lyrics").innerText=data;//HTML没有保留格式，Text保留格式
            }
        });
    });
}//获取歌词
function hideLyrics(){
    document.getElementById("lyricsHide").style.display="none";
    document.getElementById("lyricsShow").style.display="inline";
    document.getElementById("lyricsBox").style.display="none";
}//隐藏歌词
function showLyrics(){
    if(isFirst==1) {
        getLyrics();
        isFirst=0;
    }
    document.getElementById("lyricsHide").style.display="inline";
    document.getElementById("lyricsShow").style.display="none";
    document.getElementById("lyricsBox").style.display="inline";
}//显示歌词

function getCatalog() {
    var catalog1 = [];
    songName=[];//清空歌曲名数组
    var temp = document.getElementById("test").innerHTML;//由router传入的目录信息
    document.getElementById("cataBox").innerHTML = "";//将原有的信息清空：去除cataBox元素的所有子元素
    prefix=document.getElementById("prefix").innerHTML;//获得前缀
    prefix=prefix+"/";
    prefix=prefix.slice(9);//读取前缀，../public/resource/likes=》/resource/likes

    catalog1 = temp.split(' ');//分割catalog1，即歌曲名字符串
    songTotal = catalog1.length - 1;//歌曲总数

    hideCatalog();//设置初始状态：隐藏目录
    var i = 0;
    for (i = 0; i < songTotal; i++) {
        songName[i]= catalog1[i].slice(0,-4);//存储文件名，slice没问题

        var p = document.createElement("p");//新建元素p
        var t = document.createTextNode(songName[i]);//创建文本节点
        p.appendChild(t);//将文本节点t作为p的子节点
        p.id = i;//赋id值：从0开始，目的是通过这个可以进一步实现点击歌曲名就可以播放该首歌的功能，但还没有实现
        document.getElementById("cataBox").appendChild(p);//将节点p作为cataBox的子节点
    }

    //获取目录的同时自动加载第一首歌的歌词、音乐、图片信息
    audioAddress = prefix + songName[0] + ".mp3";//得到音频地址
    imageAddress = prefix + songName[0] + ".png";//得到图片地址
    getLyrics();
    hideLyrics();//设置歌词初始状态：隐藏
    document.getElementById("audioSrc").src = audioAddress;
    document.getElementById("myMusic").load();
    document.getElementById("musicImg").src = imageAddress;
}//获取目录
function showCatalog(){
    document.getElementById("catalogShow").style.display="none";//设置“显示目录”按钮为不可见
    document.getElementById("catalogHide").style.display="inline";//设置“隐藏目录”按钮可见
    document.getElementById("cataBox2").style.display="inline";//设置目录框可见
}//显示目录
function hideCatalog(){
    document.getElementById("catalogHide").style.display="none";
    document.getElementById("catalogShow").style.display="inline";
    document.getElementById("cataBox2").style.display="none";
}//点击隐藏

function repeatAllSongs(){
    document.getElementById("myMusic").removeAttribute("loop");
    repeat=window.setInterval("isEnded()",1000);//每1秒执行一次

}
function repeatCurrentSong() {
    document.getElementById("myMusic").loop = "loop";
    if(repeat!=0) {
        window.clearInterval(repeat);
        repeat=0;
    }
}
function isEnded(){//检测当前歌曲是否已经播放完毕
    var end=document.getElementById("myMusic").ended;
    end=end.toString();
    if(end=="true")
    {
        playNextSong();
    }
}






