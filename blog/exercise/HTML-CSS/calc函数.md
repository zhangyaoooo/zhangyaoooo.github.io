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
 
# calc 函数
css的计算属性是什么
<!-- more -->
calc是CSS3新增的函数。
MDN解释是可以用在任何 长度、数值、时间、角度、频率 等处。  
语法：
```css
width: calc(100% - 80px);
```

可以用常见的 + - * / 符号来进行运算，但需要注意的是 + 和 - 必须用空格隔开，原因很简单，如果 - 号和计算的数字挨在一起，则浏览器在解析时会认为这可能是一个负值。

## 案例
::: normal-demo 水平垂直居中案例

```html
<div class="container">
  <div class="item"></div>
</div>
```
```css
.container{
  width: 500px;
  height: 250px;
  background-color: skyblue;
  margin: 10px;
  position: relative;
}
.item{
  width: 100px;
  height: 100px;
  background-color: pink;
  position: absolute;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
}
```
:::
