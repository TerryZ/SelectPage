# SelectPage

> A jQuery plugin include autocomplete,pagination,tags,keybord navigation functions

[简体中文文档](README-CN.md)

## Plugin Preview

*Multiple Select Tags Mode*

![SelectPage1](https://terryz.github.io/image/SelectPage1.png)

*Normal Select Mode ( single select )*

![SelectPage](https://terryz.github.io/image/SelectPage.png)


## What

SelectPage is a jquery library multifunction drop list paging selector, as a powerful one form element, it will have a lot of shortcoming, welcome to submit your suggestions to the project,let's make SelectPage better

### Key Features

<ul>
	<li>jQuery plugin</li>
	<li>A item select plugin for bootstrap2、3</li>
	<li>Compatible with no UI framework of the program, but it is recommended to use at least normalize.css</li>
	<li>quick search item by input autocomplete</li>
	<li>use keybord to quick pagination</li>
	<li>multiple select by tag form</li>
	<li>The result list automatically determines the edge of the screen to avoid content beyond the visible range</li>
	<li>brower supper IE8+,chrome,firefox</li>
</ul>

## Why

## How

### Install
### Usage

## Options

- **data** `string | object`  
  defaut : undefined
  data source (String：ajax search URL | Object：JSON format array)  
  **example**  
  *string* : serverside request url address  
  *object* : JSON format array，format like : [{a:1,b:2,c:3},{...}]

- **lang** `string`  
  default : 'cn'  
  插件显示语言 ('ja', 'en', 'es', 'pt-br')

- **multiple** `boolean`  
  default : false  
  是否为多选模式（标签模式）

- **pagination** `boolean`  
  default : true  
  paging or not

- **listSize** `number`  
  default : 10  
  列表显示的项目个数，其它的项目以滚动条滚动方式展现,it only work on `pagination : false`

- **multipleControlbar** `boolean`  
  default : true  
  是否启用多选模式的控制按钮区域,仅multiple: true模式下可用

- **maxSelectLimit** `number`  
  default : 0  
  多选模式下最大选择个数，0 is unlimited

- **selectToCloseList** `boolean`  
  default : true  
  is close list after item select,it only work on `multiple:true`

- **initRecord** `string`  
  default : undefined  
  插件初始值指定，该值会与option.keyField字段进行匹配，若匹配到，则自动设置选中并高亮

- **dbTable** `string`  
  default : 'tbl'  
  使用ajax方式获取数据时，使用该参数设置对应的数据表名

- **keyField** `string`  
  default : 'id'  
  值字段，通常该字段的内容会自动保存在隐藏域中

- **showField** `string`  
  default : 'name'  
  结果集中用于显示的属性名

- **searchField** `string`  
  default : undefined  
  查询字段，仅为使用URL(ajax)方式查询服务端时，设置后端查询的字段，不设置则默认使用showField设置的字段

- **andOr** `string`  
  default : 'AND'  
  查询方式 ('AND' or 'OR')

- **orderBy** `array`  
  default : undefined  
  数据排序方式,若不设置则默认对showField指定的字段进行排序  
  **example**  
  `orderBy : ['id desc']//对ID字段进行降序排序`

- **pageSize** `number`  
  default : 10  
  每页显示的记录数

- **params** `function`  
  default : undefined  
  return : object  
  使用URL进行AJAX查询时，可传递查询参数  
  **example**  
  `params : function(){return {'name':'aa','sex':1};}`

- **formatItem** `function`  
  default : undefined  
  **param**  
  data `object` 行数据object格式  
  return : string  
  列表项目显示内容格式化  
  **example**
  `formatItem : function(data){return data.a + '(' + data.b + ')';}`


- **focusDropList** `boolean`  
  default : true  
  是否在输入框获得焦点时，展开下拉窗口

- **autoSelectFirst** `boolean`  
  default : true  
  是否自动选择列表中的第一项内容(输入关键字查询模式，直接使用鼠标下拉并不触发)

- **autoFillResult** `boolean`  
  default : true  
  是否自动填充内容,若有列表项目被高亮显示，在焦点离开控件后，自动设置该项为选中内容

- **noResultClean** `boolean`  
  default : true  
  是否清空输入关键字,在输入框中输入内容进行查询，但没有匹配的内容返回，在焦点离开控件后，自动清空输入框输入的内容

- **selectOnly** `boolean`  
  default : false  
  只选择模式

- **inputDelay** `number`  
  default : 0.5(second)  
  输入关键字查询延迟（仅ajax数据源模式下可用）

- **eSelect** `function`  
  default : undefined  
  **param**  
  data `object | array` selected row or rows data(json)

- **eAjaxSuccess** `function`  
  default : undefined  
  ajax请求模式，请求成功后的数据处理回调,回调的功能用于自定义处理服务端返回的数据  
  **param**  
  data `object` ajax服务端返回的json数据  
  return `object` convert to SelectPage required data format  
  **return data format**  
  ```js
  {
	  list : [{name:'aa',sex:1},{name:'bb',sex:1}...],
	  totalRow : 100
  }
  ```

- **eTagRemove** `function`  
  default : undefined  
  多选模式下，关闭标签是的回调函数
  **param**  
  removeCount `number` 被移除的个数

## Docs、Demo、Guide

Explorer on [TerryZ.github.io](https://TerryZ.github.io)

## Thank you
terrible english by [TerryZ](https://github.com/TerryZ)