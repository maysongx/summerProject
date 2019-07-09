<?php
//直接执行此文件，即可发送邮件
//$to = '1149499639@qq.com';
//$subject = '邮件的主题：测试发送邮件';
//$message = '邮件的内容：您好呀';
//$headers = '来自宋宋宋的邮件';
//mail($to, $subject, $message, $headers);
//echo '发送成功！';


if (isset($_REQUEST['email'])) { // 如果接收到邮箱参数则发送邮件
    // 发送邮件
    $to = '1149499639@qq.com';
    $email = $_REQUEST['email'];
    $subject = $_REQUEST['subject'];
    $message = $_REQUEST['message'];
    $headers = '来自宋宋宋的邮件';
    mail($to, $subject, $message, $headers);
    echo "邮件发送成功";
} else { // 如果没有邮箱参数则显示表单
    echo "<form method='post' action='sendEmail.php'>
    Email: <input name='email' type='text'><br>
    Subject: <input name='subject' value='邮件的主题：测试发送邮件' type='text'><br>
    Message:<input name='message' type='text' value='邮件的内容：您好呀'><br>
    <input type='submit'>
    </form>";
}
