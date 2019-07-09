var fs = require("fs");

function readFile() {
    return new Promise(function(resolve, reject) {
        fs.readFile('txt.txt', 'utf-8', function(error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

function writeFile(message) {
    return new Promise(function(resolve, reject) {
        fs.writeFile("txt2.txt", message, function(error) {
            if (error) {
                reject(error);
            } else {
                resolve('写入成功');
            }
        });
    })
}

var promise = readFile();
promise.then(function(message) {
    return message;
}).then(function(message) {
    writeFile(message);
})