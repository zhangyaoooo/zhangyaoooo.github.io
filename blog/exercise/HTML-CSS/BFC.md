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
 
# BFC
+ 介绍BFC及其应用
+ 介绍BFC、IFC、GFC、FFC
<!-- more -->
BGC，全称 Block formatting contexts，块级格式上下文。

简单说，就是 **页面中的一块独立渲染区域，有一套自己的渲染规则**，它决定了子元素如何布局，以及与其他元素的关系和相互作用。

简单说，**BFC是一个独立的布局环境，BFC内部的元素布局与外部互不影响**。

就好比在自己家摆家具，想怎么摆都可以都不会影响到邻居家的家具布局。

## BFC布局规则：  
1. 内部的box会在垂直方向堆叠。
2. box垂直方向的距离由margin决定，并且也会出现margin重叠。
3. 每个盒子左边框紧挨着包含块的左边框，即使浮动元素也是如此。
4. BFC的区域不会与浮动box重叠。
5. BFC是独立容器，里面的子元素和外面的元素互不影响。
6. 计算BFC高度时，浮动的子元素也会参与计算。

标准流中的 body 元素就是一个BFC

## 设置BFC

在其他区域，想单独设置一个BFC，有一些方式：
| 元素或属性 | 属性值                     |
| ---------- | -------------------------- |
| 根元素     |                            |
| *float*    | *left、right*              |
| *postion*  | *absolute、fixed*          |
| *overflow* | *auto、scroll、hidden*     |
| *display*  | *inline-block、table-cell* |

> 上面只记录了一些常见的方式，完整的 *BFC* 触发方式可以参阅：*https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context*

## BFC用处
1. 解决父元素高度坍塌问题
在正常情况下，不给父元素设置高度的话，父元素高度会由子元素撑开。  
但是这时如果给子元素设置了浮动，那么父元素高度会变成0，就撑不起来了。 这时就可以给父元素设置成BFC，就可以解决。
2. 非浮动元素被浮动元素覆盖
当一个元素box1设置了浮动，box1就会脱离标准流，后面的盒子box2位置就会变，就会重叠。这时就可以给后面的盒子box2设置成BFC。  
原理是 **BFC的区域不会与浮动box重叠**。  

基于此特点，我们就可以制作两栏自适应布局，方法就是给固定栏设置固定宽度，给不固定栏开启 *BFC*。

```html
<div class="left">导航栏</div>
<div class="right">这是右侧</div>
```

```css
*{
  margin: 0;
  padding: 0;
}
.left {
  width: 200px;
  height: 100vh;
  background-color: skyblue;
  float: left;
}

.right {
  width: calc(100% - 200px); 
  height: 100vh;
  background-color: yellowgreen;
}
```

效果：在上面的代码中，我们要设置两栏布局，左边栏宽度固定，右边栏自适应。结果我们发现右侧出现了空白

究其原因就是右侧区域与浮动盒子重叠了

![image-20210913143033581](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-13-063034.png)



修改 *.right* 部分的代码，添加 *overflow:hidden* 使其成为一个 *BFC*：

```css
.right {
  width: calc(100% - 200px); 
  height: 100vh;
  background-color: yellowgreen;
  overflow: hidden;
}
```



效果：因为 *BFC* 的区域不会与浮动 *Box* 重叠，所以右侧空白没有了

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-09-13-063330.png" alt="image-20210913143330616" style="zoom:50%;" />

3. margin垂直方向重合  
经典的margin坍塌问题，不再赘述。

明白了 *BFC*，其他的 *IFC、GFC* 和 *FFC* 就大同小异了。



- *IFC*（*Inline formatting context*）：翻译成中文就是“行内格式化上下文”，也就是一块区域以行内元素的形式来格式化
- *GFC*（*GrideLayout formatting contexts*）：翻译成中文就是“网格布局格式化上下文”，将一块区域以 *grid* 网格的形式来格式化
- *FFC*（*Flex formatting contexts*）：翻译成中文就是“弹性格式化上下文“，将一块区域以弹性盒的形式来格式化



> 更多关于格式化上下文的内容，可以参阅 *MDN*：
>
> *BFC*：*https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context*
>
> *IFC*：*https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inline_formatting_context*

