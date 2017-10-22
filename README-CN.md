![SelectPageLogo](https://terryz.github.io/image/logo/SelectPage.png)
# SelectPage

> 支持autocomplete、键盘操作、分页、标签多选等多功能的选择器插件


## 插件运行效果预览

*多选Tags模式*

![SelectPage1](https://terryz.github.io/image/SelectPage1.png "SelectPage")

*单选模式*

![SelectPage](https://terryz.github.io/image/SelectPage.png "SelectPage")


## 入门指南、DEMO、文档

*项目GitHub地址：*

[https://github.com/TerryZ/SelectPage](https://github.com/TerryZ/SelectPage)

*插件官方首页（入门指南、DEMO、文档）：*

[https://terryz.github.io](https://terryz.github.io)


### 如果您觉得项目还不错，还请给项目（ [Github](https://github.com/TerryZ/SelectPage) / [码云](https://gitee.com/TerryZ/selectpage) ）加个Star，同时欢迎Follow [Github个人主页](https://github.com/TerryZ)

<br><br><br><br>


## 什么是SelectPage

SelectPage是一个基于jQuery开发的多功能下拉分页选择器，作为一个功能强大的表单控件，它一定会有很多缺点和不足，欢迎您 [提交](https://github.com/TerryZ/SelectPage/issues) 对项目的意见和建议，让我们一起让SelectPage变得更好

### 功能特点


* 基于jQuery、Bootstrap2、3开发

* 也可应用于无任何UI框架的原生HTML环境

* Autocomplete输入自动查找功能

* 结果列表分页展示

* 允许使用静态json数据源或ajax动态请求的数据源

* 使用键盘快速操作基本功能及分页功能

* 多项选择以标签（Tag）形式展现

* 结果列表自动判断屏幕边缘，避免内容超出可视范围

* 丰富的参数设置及功能API调用

浏览器兼容：IE8+、Chrome、Firefox等

插件基于jQuery开发，可在Bootstrap2、3环境下使用，亦可在原生无UI框架的环境下直接使用

## 为什么要有SelectPage

有时候我们需要有一个插件，它可以输入关键字进行快速查找，可以下拉进行选择，可以在展示大量数据时进行分页显示，可以使用键盘进行快速操作，可以适应各种UI环境，可以被灵活定制，而上述的情况就真的出现在现实项目的需求里了

这就是为什么会有SelectPage插件的原因

## 怎么使用SelectPage

在 [Github](https://github.com/TerryZ/SelectPage) 或 [码云](https://gitee.com/TerryZ/selectpage) 上下载最新版本，解压后并放入需要使用的项目中

### 引用文件

```html
<!-- 基础环境引用说明 -->
<!-- Bootstrap的UI框架基础样式 -->
<link rel="stylesheet" href="bootstrap.min.css" type="text/css">
<!-- 插件使用了部分font-awesome的图标，所以需要引入该样式 -->
<link rel="stylesheet" href="font-awesome.min.css" type="text/css">
<!-- jQuery，Bootstrap的基础脚本引用 -->
<script type="text/javascript" src="bootstrap.min.js" >< /script>
<script type="text/javascript" src="jquery.min.js" >< /script>
 
 
<!-- 插件使用的样式表文件，根据使用环境的Bootstrap版本进行引用 -->
<!-- Bootstrap2使用 -->
<link rel="stylesheet" href="selectpage.css" type="text/css">
<!-- Bootstrap3使用 -->
<link rel="stylesheet" href="selectpage.bootstrap3.css" type="text/css">
<!-- 非Bootstrap生态下引用该样式 -->
<link rel="stylesheet" href="selectpage.base.css" type="text/css">
<!-- 以上的样式文件根据实际使用的环境进行引用，引用其中一项即可 -->
 
<!-- 插件核心脚本 -->
<script type="text/javascript" src="selectpage.js" >< /script>
```

### HTML页面元素设置

```html
<!-- 设置文本框为插件基本元素 -->
<input type="text" id="selectPage" >
```

### 脚本初始化插件

```js
//定义数组，在服务端返回的数据也以该格式返回：Array[{Object},{...}]
var tag_data = [
    {id:1 ,name:'Chicago Bulls',desc:'芝加哥公牛'},
    {id:2 ,name:'Cleveland Cavaliers',desc:'克里夫兰骑士'},
    {id:3 ,name:'Detroit Pistons',desc:'底特律活塞'},
    {id:4 ,name:'Indiana Pacers',desc:'印第安纳步行者'}
];
//初始化插件
$('#selectPage').selectPage({
    showField : 'desc',
    keyField : 'id',
    data : tag_data
});
```

