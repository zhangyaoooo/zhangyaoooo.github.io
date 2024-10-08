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
 
# CSS属性的计算过程
请简述css中属性的计算过程
<!-- more -->

首先有一段最简单的代码
```css
p {
  color: red;
}
```
设置一个段落的字体颜色为红色。  
那么这个段落就只有一个color属性吗？

很明显不是，打开控制台选中这个段落，会发现其他所有的CSS属性都在，只不过全部设置的默认值。

## 计算顺序
+ 确定声明值
+ 层叠冲突
+ 使用继承
+ 使用默认值

### 确定声明值
在样式表中对某一个元素写样式声明时，这个声明就会被当做css的属性值。  
比如：
```html
<h1>test</h1>
```
上面代码没有写样式，就使用浏览器的默认样式。
```css
font-size: 32px;
font-weight: 700;
```
那么现在我们给它设置一下 `font-size: 20px;`  
这时我们写的样式和浏览器默认样式中的声明值有冲突了，会优先把我们设置的值作为css属性值，这个很好理解。  
我们没有写的其他的样式还是使用默认值。

### 层叠冲突
当样式表声明值有冲突时，就会使用层叠规则来确定 *CSS* 的属性值

例如：

```html
<div class="test">
  <h1>test</h1>
</div>
```

```css
.test h1{
  font-size: 50px;
}

h1 {
  font-size: 20px;
}
```

在上面的代码中，两个选择器都选中了 *h1*，并且都设置了 *font-size* 属性值，同属于作者样式，这显然就属于层叠冲突了。

当发送层叠冲突时，这时就要根据选择器的 **权重值** 来计算究竟运用哪一条作者样式。

权重低的作者样式在 *Elements>Styles* 中会被划掉

在后面记录层叠冲突权重计算规则。

### 使用继承
如果有一条属性我们没有设置，那么还不会着急去使用默认样式，还会看一下有没有存在继承。
```html
<div class="test">
  <p>this is a test</p>
</div>
```

```css
.test{
  color:red
}
```
上述代码中，虽然没有给p标签设置颜色，但是它依然会继承父元素div的color属性，最后显示的字体颜色就是红色。

### 使用默认样式
经过以上几个阶段之后，如果没有作者样式，也没有继承，则会使用浏览器的默认样式。

## 层叠规则
CSS全称是 Cascading Style Sheets，层叠样式表。其中cascade 层叠 这个概念很重要。

权重计算中的三个大因素，按重量级排列：
+ 重要性 Importance
+ 专用型 Specificity
+ 源代码次序 Source order

### 重要性
在css中，有一个特别的语法可以让一个样式永远优先： `!important`  
但是不建议使用，当代码非常复杂时不利于调试。  
有一个使用场景是：当需要修改某个组件的样式，但是又动不了该组件的核心代码时。

### 专用性（权重）
专用型是衡量 选择器的**具体控制元素的程度** 的一种方法，主要是指它能匹配到多少元素。可能有点抽象，换句话说： 如果这个选择器能匹配到的元素越少，那么就说明它的专用型越高，权重也就越高。

元素选择器 < 类选择器 < ID选择器 < 标签内联样式 < !important 

一个选择器具有的专用性的量可以用四种不同的值（或组件）来衡量的，它们可以被认为是千位，百位，十位和个位，在四个列中的四个简单数字：

- 千位：如果声明是在 *style* 属性中该列加 *1* 分（这样的声明没有选择器，所以它们的专用性总是 *1000*）否则为 *0*。
- 百位：在整个选择器中每包含一个 *ID* 选择器就在该列中加 *1* 分。
- 十位：在整个选择器中每包含一个类选择器、属性选择器、或者伪类就在该列中加 *1* 分。
- 个位：在整个选择器中每包含一个元素选择器或伪元素就在该列中加 *1* 分。



> 注：通用选择器（*）, 复合选择器（+、>、~、空格）和否定伪类（:not）在专用性中无影响。



举个例子：

| **选择器**                                  | 千位 | 百位 | 十位 | 个位 | 合计值 |
| ------------------------------------------- | ---- | ---- | ---- | ---- | ------ |
| h1                                          | 0    | 0    | 0    | 1    | 0001   |
| #indentifier                                | 0    | 1    | 0    | 0    | 0100   |
| h1 + p::first-letter                        | 0    | 0    | 0    | 3    | 0003   |
| li > a[href*=” zh-CN”] > .inline-warning    | 0    | 0    | 2    | 2    | 0022   |
| 没有选择器, 规则在一个元素的 *style* 属性里 | 1    | 0    | 0    | 0    | 1000   |

### 源代码次序
如果有竞争关系的两组选择器有相同的重要性和权重的话，那么就看源代码的顺序，后面的覆盖前面的。

## 继承规则
应用于某个元素的一些属性值可以由它的子元素继承，有些属性不能继承。  
具体规则参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

CSS为处理继承提供了四个特殊的通用属性值
- *inherit*：该值将应用到选定元素的属性值设置为与其父元素一样。
- *initial*：该值将应用到选定元素的属性值设置为与浏览器默认样式表中该元素设置的值一样。如果浏览器默认样式表中没有设置值，并且该属性是自然继承的，那么该属性值就被设置为 *inherit*。
- *unset*：该值将属性重置为其自然值，即如果属性是自然继承的，那么它就表现得像 *inherit*，否则就是表现得像 *initial*。
- *revert*：如果当前的节点没有应用任何样式，则将该属性恢复到它所拥有的值。换句话说，属性值被设置成自定义样式所定义的属性（如果被设置）， 否则属性值被设置成用户代理的默认样式。
> IE 不支持 initial 和 unset

### 继承的就近原则
```html
<div class="one">
  <div class="two">
    <p>Lorem ipsum dolor sit amet.</p>
  </div>
</div>
```

```css
.two {
  color: blue;
}

.one {
  color: red;
}
```

在上面的示例中，*two* 比 *one* 更加接近 *p*，所以最终采用的是 *two* 的 *color* 值。段落呈现蓝色。

