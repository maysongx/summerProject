<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>表单验证</title>
    <style>
        .error {
            color: red;
        }
    </style>
</head>
<body>
<!--$_SERVER["PHP_SELF"] 会发送表单数据到当前页面，而不是跳转到不同的页面-->
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
    <div class="perItem">
        <div class="tag">名称：</div>
        <input type="text" name="name" value="<?php echo $name; ?>">
        <span class="error">* <?php echo $nameErr; ?></span>
    </div>
    <div class="perItem">
        <div class="tag">E-mail:</div>
        <input type="text" name="email" value="<?php echo $email; ?>">
        <span class="error">* <?php echo $emailErr; ?></span>
    </div>
    <div class="perItem">
        <div class="tag">网址:</div>
        <input type="text" name="website" value="<?php echo $website; ?>">
        <span class="error"><?php echo $websiteErr; ?></span>
    </div>
    <div class="perItem">
        <div class="tag">备注:</div>
        <textarea name="remark" rows="5" cols="40"><?php echo $remark; ?></textarea>
    </div>
    <div class="perItem">
        <div class="tag">性别:</div>
        <input type="radio" name="gender" <?php if (isset($gender) && $gender == "female") echo "checked"; ?>
               value="female">女
        <input type="radio" name="gender" <?php if (isset($gender) && $gender == "male") echo "checked"; ?>
               value="male">男
        <span class="error">* <?php echo $genderErr; ?></span>
    </div>

    <input type="submit" name="submit" value="提交">
</form>

<?php
//定义变量，并默认设置为空
//name 姓名；email 邮箱；gender 性别；remark 备注；website 网址；
$nameErr = $emailErr = $genderErr = $websiteErr = "";
$name = $email = $gender = $remark = $website = "";

//$_SERVER["REQUEST_METHOD"]来检测表单是否被提交
//如果 REQUEST_METHOD 是 POST, 表单将被提交 - 数据将被验证。如果表单未提交将跳过验证并显示空白
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nameContent = $_POST["name"];//姓名
    $emailContent = $_POST["email"];//邮箱
    $websiteContent = $_POST["website"];//网址
    $remarkContent = $_POST["remark"];//备注
    $genderContent = $_POST["gender"];//性别

    if (empty($nameContent)) {
        $nameErr = "名字是必需的";
    } else {
        $name = test_input($nameContent);
        // 检测名字是否只包含字母跟空格
        if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
            $nameErr = "只允许字母和空格";
        }
    }

    if (empty($emailContent)) {
        $emailErr = "邮箱是必需的";
    } else {
        $email = test_input($emailContent);
        // 检测邮箱是否合法
        if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) {
            $emailErr = "非法邮箱格式";
        }
    }

    if (empty($websiteContent)) {
        $website = "";
    } else {
        $website = test_input($websiteContent);
        // 检测 URL 地址是否合法
        if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i", $website)) {
            $websiteErr = "非法的 URL 的地址";
        }
    }

    if (empty($remarkContent)) {
        $remark = "";
    } else {
        $remark = test_input($remarkContent);
    }

    if (empty($genderContent)) {
        $genderErr = "性别是必需的";
    } else {
        $gender = test_input($genderContent);
    }
}

function test_input($data)
{
    $data = trim($data);//去除用户输入数据中不必要的字符 (如：空格，tab，换行)
    $data = stripslashes($data);//去除用户输入数据中的反斜杠 (\)
    $data = htmlspecialchars($data);
    return $data;
}

?>
<?php
echo "<h2>您输入的内容是:</h2>";
echo '姓名：'.$name.'  ==  '.'邮箱：'.$email.'  ==  '.'网址：'.$website.'  ==  '.'备注：'.$remark.'  ==  '.'性别：'.$gender;
?>
</body>
</html>