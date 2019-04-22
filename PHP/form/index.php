<?php
//姓名（input）
echo '姓名：' . $_POST['userName'] . '<br>';
//年龄（input）
echo '年龄：' . $_POST['age'] . '<br>';

//站点（下拉框单选）
$site = isset($_POST['site']) ? $_POST['site'] : '';
echo '下拉框选择的值：'.convertSite($site);

//多个站点（下拉框多选）
$siteMore = isset($_POST['siteMore']) ? $_POST['siteMore'] : '';
if (is_array($siteMore)) {
    $siteArray = array(
        'RUNOOB' => '菜鸟教程: http://www.runoob.com',
        'GOOGLE' => 'Google 搜索: http://www.google.com',
        'TAOBAO' => '淘宝: http://www.taobao.com',
    );
    $desc = '多个站点：';
    foreach ($siteMore as $item) {
        echo $desc . $siteArray[$item] . '<br>';
    }
}

//单选站点（单选按钮）
$radioSite = isset($_POST['radioSite']) ? $_POST['radioSite'] : '';
if ($radioSite) {
    echo '单选按钮站点：' . convertSite($radioSite);
}






function convertSite($name)
{
    if ($name == 'RUNOOB') {
        return '菜鸟教程--http://www.runoob.com' . '<br>';
    } else if ($name == 'GOOGLE') {
        return 'Google--http://www.google.com' . '<br>';
    } else if ($name == 'TAOBAO') {
        return '淘宝--http://www.taobao.com' . '<br>';
    }
}





