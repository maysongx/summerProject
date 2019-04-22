//常用的console命令
console.log("输出信息");
console.info("信息");
console.error("错误");
console.warn("警告");

//占位符
console.log("%年%月%日", 2017, 3, 28);

//查看对象的信息
var info = {
    name: "song",
    age: '20',
    message: '这是使用console.log打印对象的信息'
};
console.dir(info);
