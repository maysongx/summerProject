<?php

//创建Site类
class Site
{
    //定义成员方法
    var $url;
    var $title;

    //构造函数
    function __construct($par1, $par2)
    {
        $this->url = $par1;
        $this->title = $par2;
    }

    //定义成员方法
    function setUrl($par)
    {
        $this->url = $par;
    }

    function getUrl($par)
    {
        echo $this->url . PHP_EOL;
    }

    function setTitle($par)
    {
        $this->title = $par;
    }

    function getTitle($par)
    {
        echo $this->title . PHP_EOL;
    }
}


//实例化类
//$runoob = new Site;
//$taobao = new Site;
//$google = new Site;
////调用成员函数，设置标题和URL
//$runoob->setTitle("菜鸟教程");
//$taobao->setTitle("淘宝");
//$google->setTitle("谷歌");
//
//$runoob->setUrl("www.runoob.com");
//$taobao->setUrl("www.taobao.com");
//$google->setUrl("www.google.com");
$runoob = new Site('菜鸟教程', 'www.runoob.com');
$taobao = new Site('淘宝', 'www.taobao.com');
$google = new Site('谷歌', 'www.google.com');


// 调用成员函数，获取标题
$runoob->getTitle();
$taobao->getTitle();
$google->getTitle();

//获取url
$runoob->getUrl();
$taobao->getUrl();
$google->getUrl();
