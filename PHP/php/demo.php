<h1>PHP基础操作</h1>
<?php
echo '<h1>打印输出：echo和print</h1>';
echo "echo方式输出：hello word</br>";
print "print方式输出：hello world</br>";

echo '<h1></h1>';
echo '<h1></h1>';
echo '<h1></h1>';
echo '<h1></h1>';
echo '<h1>数组</h1>';
$names = array("宋霞", "理工", "经济", "英语");
var_dump($names);
echo "<br>";
/*
 * 对象数据类型也可以用于存储数据。
   在 PHP 中，对象必须声明。
   首先，你必须使用class关键字声明类对象。类是可以包含属性和方法的结构。
   然后我们在类中定义数据类型，然后在实例化的类中使用数据类型：
 */

//使用class声明对象
class Car
{
    var $color;

    function Car($color = "green")
    {
        $this->color = $color;
    }

    function what_color($color)
    {
        return $this->color;
    }
}

function print_Car($obj)
{
    foreach (get_object_vars($obj) as $prop => $val) {
        echo "\t$prop = $val\n";
    }
}

$newCar = new Car("white");
echo "This car ";
print_Car($newCar);
echo '<br>';
//常量的定义
//区分大小写的常量的定义
define("GREETING", "欢迎访问 Runoob.com");
echo GREETING;    // 输出 "欢迎访问 Runoob.com"
echo '<br>';
echo greeting;   // 输出 "greeting"
echo '<br>';
//不区分大小写
define("greeting", "欢迎您", true);
echo '<br>';
echo Greeting;  //输出 欢迎您   输出 欢迎您 输出 欢迎您   欢迎您
echo '<br>';
//字符串变量
$color = "My favorite color is Red";
echo $color;
//. 是字符串变量中的并置运算符：将2个字符串连接起来
echo '<br>';
$txt1 = "Hello Summer";
$txt2 = "Have a nice day !";
$txt3 = $txt1 . ":::" . $txt2;
echo $txt3;
echo '<br>';
//strlen计算字符串的长度
$txt = "Hello,I am Summer";
echo "这个字符串的长度是" . strlen($txt);
echo '<br>';


//strpos函数用户检索字符在字符串中的位置，如果存在，则返回位置；如果不存在，则返回false;
$txt = "Hello World";
echo strpos($txt, "W");
echo '<br>';
//if...else..条件语句
$date = Date("H");//当前时间
if ($date > 20) {
    echo "Have a nice day";

} else {
    echo "have a good day";
}
echo "<br>";
//数组
$names = array("宋", "霞", "欢迎您");
echo $names[1]; //打印第二个数组数据
echo '<br>';
echo "数组的长度是" . count($names);
echo '<br>';
//遍历数组
$namesLength = count($names);
for ($x = 0; $x < $namesLength; $x++) {
    if ($x == $namesLength - 1) {
        echo $names[$x];
    } else {
        echo $names[$x] . ",";
    }
}
echo '<br>';
//关联数组--第一种创建方法 建方法
$age1 = array("Peter" => "20岁", "Can" => "20岁", "Summer" => "27岁", "Jason" => "23岁", "Lary" => "22岁");
echo " my age is" . $age1["Summer"] . "years old !";
echo '<br>';
//关联数组--第二种创建方法
$age2 = array("Peter", "Can", "Summer", "Json");
$age2["Peter"] = "20岁";
$age2["Summer"] = "30岁";
echo " my age is" . $age2["Summer"] . "years old !";
echo '<br>';

//遍历关联数组
echo "遍历打印数据";
echo '<br>';
$age3 = array("Summer" => "30岁", "Can" => "22岁", "Jurmay" => "10岁", "Json" => "20岁", "Arm" => "33岁");
foreach ($age3 as $Name => $Name_value) {
    echo "Key=" . $Name . ", Value=" . $Name_value;
    echo '<br>';
}
//数组排序
//sort() - 对数组进行升序排列
//rsort() - 对数组进行降序排列
//asort() - 根据关联数组的值，对数组进行升序排列
//ksort() - 根据关联数组的键，对数组进行升序排列
//arsort() - 根据关联数组的值，对数组进行降序排列
//krsort() - 根据关联数组的键，对数组进行降序排列
$FirstNames = array("Summer", "Song", "any");
echo "打印数组排序的数据";
echo '<br>';
sort($FirstNames);
print_r($FirstNames);
echo '<br>';
//自定义函数
function printName($name)
{
    echo "My English name is：" . $name;
}

//调用函数
printName("SongXia");
echo '<br>';
echo "当前行是：" . __LINE__;
echo '<br>';

//面向对象
class PersonInfo
{
    //成员变量
    var $title;  //设置标题和url
    var $url;

//构造函数
    function __construct($title, $url)
    {
        $this->title = $title;
        $this->url = $url;
    }

    //成员函数
    function setTitle($title)
    {
        $this->title = $title;
    }


    function getTitle()
    {
        echo $this->title . PHP_EOL;
    }

    function setUrl($url)
    {
        $this->url = $url;
    }

    function getUrl()
    {
        echo $this->url . PHP_EOL;
    }
}

//实例化对象
$name1 = new PersonInfo;
$name2 = new PersonInfo;
//使用构造函数
$name3 = new PersonInfo("JAVA教程", "www.333.com");
//调用成员函数--设置标题
$name1->setTitle("菜鸟教程");
$name1->setUrl("www.111.com");
echo "<br>";
$name2->setTitle("PHP教学课程");
$name2->setUrl("www.222.com");
$name1->getTitle();
$name1->getUrl();
$name2->getTitle();
$name2->getUrl();
//
echo "<br>";
echo "使用构造函数：：";
$name3->getTitle();
$name3->getUrl();
echo "<br>";
//////////////
/// ///////////
/// ////////////
/// 多维数组
$Cars = array(
    array("Volvo", 100, 96),
    array("BMW", 60, 59),
    array("Toyota", 110, 100)
);
print("<pre>"); // 格式化输出数组
print_r($Cars);
print("</pre>");

echo "<br>";
$sites = array
(
    "runoob" => array
    (
        "菜鸟教程",
        "http://www.runoob.com"
    ),
    "google" => array
    (
        "Google 搜索",
        "http://www.google.com"
    ),
    "taobao" => array
    (
        "淘宝",
        "http://www.taobao.com"
    )
);
print("<pre>"); // 格式化输出数组
print_r($sites);
print("</pre>");
//输出其中的一组数据
print("<pre>"); // 格式化输出数组
echo "<h5>输出多维数组中的一组数据</h5>";
echo $sites["taobao"][0] . PHP_EOL . $sites["taobao"][1];
print("</pre>");
echo "<br>";
//Date函数
echo "当前时间是：" . date("Y-m-d");
echo "<br>";
/////s
/// //////////
/// /////
///PHP文件处理
//打开文件 如果文件不可以打开，则显示“无法打开文件”
$file = fopen("welcome.txt", "r") or exit("无法打开文件");
// 读取文件每一行，直到文件结尾
while (!feof($file)) {
    echo fgets($file) . "<br>";
}
fclose($file);
//time()函数
echo "time()函数";
echo "<br>";
$t = time();
echo $t . "<br>";
echo date("Y-m-d", $t);
////////////Cookie
/// 创建一个 值为Summer、名称为user的Cookie,并设置过期时间为一个小时以后
$expire = time() + 60 * 60 * 24 * 1;  //过期时间是一天
setcookie("user", "Summer", $expire);
echo '<br>';
//PHP mail()函数：：发送电子邮件
//定义变量
$to = "1149499639@qq.com";  //定义发送邮件给谁
$subject = "邮件的主题：测试mail()函数";
$message = "这是一条测试信息";
$from = "来自我自己";
$headers = "From：" . $from;
mail($to, $subject, $message, $headers);
echo "邮件发送成功！";
echo "<br>";
$mm = array(
    'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5
);
echo '数组转换为JSON：：' . json_encode($mm);