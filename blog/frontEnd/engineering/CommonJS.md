---
icon: pen-to-square
date: 1970-01-01
category:
  - 前端
# tag:
#  - 页面配置
#star: 1
#article: true
#cover: 
---
 
# CommonJS
CMJ 是一个社区标准
<!-- more -->

## CommonJS如何实现模块化

node天生支持CommonJS模块化标准

node规定：

1. node中的每个js文件都是一个CMJ模块，通过node命令运行的模块，叫做入口模块，一般是 `index.js`

2. 模块中的所有全局定义的变量、函数，都不会污染到其他模块

3. 模块可以暴露（导出）一些内容给其他模块使用，需要暴露什么内容，就在模块中给`module.exports`赋值

4. 一个模块可以导入其他模块，使用函数`require("要导入的模块路径")`即可完成，该函数返回目标模块的导出结果

   1. 导入模块时，可以省略`.js`
   2. 导入模块时，必须以`./`或`../`开头

5. 一个模块在被导入时会**运行一次**，然后它的导出结果会被node**缓存**起来，后续对该模块导入时，不会重新运行，直接使用缓存结果

``` JavaScript
// index.js
// 启动文件  通过node命令运行的文件
console.log('index start');

// 导入模块
const math = require('./math'); // 返回 { isOdd: fn,  sum: fn }
console.log(math.sum(1, 2));

require('./math');
require('./math');
require('./math');
require('./math');
require('./math');
```

``` JavaScript
// math.js
// 提供一些数学相关的函数给别的Js文件使用
console.log('math run');
function isOdd(n) {
  return n % 2 !== 0;
}

function sum(a, b) {
  return a + b;
}

module.exports = {
  isOdd,
  sum,
};

```
