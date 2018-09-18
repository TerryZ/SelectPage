<br><br><br><br><br>

<p align="center">
    <a href="https://terryz.github.io/selectpage/" target="_blank">
	    <img src="https://terryz.github.io/image/logo/SelectPage.png" alt="SelectPage" >
    </a>
</p>

<br><br>

<p align="center">
A simple style and powerful selection jQuery plugin, <br>including ajax remote data, autocomplete, pagination, tags, i18n and keyboard navigation features
</p>

<p align="center">
    <a href="https://travis-ci.org/TerryZ/SelectPage"><img src="https://travis-ci.org/TerryZ/SelectPage.svg?branch=master"></a>
	<a href="https://app.fossa.io/projects/git%2Bgithub.com%2FTerryZ%2FSelectPage?ref=badge_shield"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2FTerryZ%2FSelectPage.svg?type=shield"></a>
    <a href="https://www.npmjs.com/package/selectpage"><img src="https://img.shields.io/npm/v/selectpage.svg"></a>
    <a href="https://www.npmjs.com/package/selectpage"><img src="https://img.shields.io/npm/dy/selectpage.svg"></a>
    <a href="https://mit-license.org/"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
    <a href="https://www.npmjs.com/package/selectpage"><img src="https://img.shields.io/badge/language-javascript%20%2F%20jquery-blue.svg"></a>
</p>


<br><br><br><br><br><br>





## Demos and Documents

Explorer on 

- [English site](https://TerryZ.github.io/selectpage)（translation unfinished）

- [国内站点](https://terryz.gitee.io/selectpage)

[简体中文文档](README-CN.md)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FTerryZ%2FSelectPage.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FTerryZ%2FSelectPage?ref=badge_large)

The Vuejs version: [v-selectpage](https://github.com/TerryZ/v-selectpage)

<br><br>

## Features

- a jQuery(1.x) plugin
- highly customized
- compatible with no UI framework of the program, but it is recommended to use at least normalize.css
- quick search item by input autocomplete
- use keybord to quick navigate
- multiple select by tag form
- screen edges handle
- custom content render
- i18n supports, provide 6 languages
- server side data supports


<br><br>


## Plugin Preview

*Multiple Selection with Tags form*

![SelectPage1](https://terryz.github.io/image/SelectPage1.png)

*Regular select mode ( single selection )*

![SelectPage](https://terryz.github.io/image/SelectPage.png)

*List only ( pagination bar close, disable typing to quick search, select only )*

![SelectPageList](https://terryz.github.io/image/SelectPageList.png)

**If you think this project is helpful, please star it.**

<br><br>


## Stargazers over time

[![Stargazers over time](https://starcharts.herokuapp.com/TerryZ/SelectPage.svg)](https://starcharts.herokuapp.com/TerryZ/SelectPage)

<br><br>


### Install  
Download SelectPage plugin zip file by last release, or [click me](https://github.com/TerryZ/SelectPage/archive/master.zip) to download SelectPage  

or use **NPM**

```
npm install selectpage
```

<a href="https://nodei.co/npm/selectpage/"><img src="https://nodei.co/npm/selectpage.png"></a>

<br><br>
### Usage
  As you can see in the [Demo Page](https://terryz.github.io/selectpage/demo.html), you will need to include:
  - [jQuery library](http://jquery.com) (1.10.2+), untest on jquery2.x & 3.x
  - The JavaScript file `selectpage.js` (or its minified version `selectpage.min.js`)
  - The css file `selectpage.css`
  
  **Including files**  
  ```html
  <!-- jQuery library -->
  <script type="text/javascript" src="jquery.min.js" >< /script>

  <link rel="stylesheet" href="selectpage.css" type="text/css">
  
  <script type="text/javascript" src="selectpage.js" >< /script>
  ```

  **HTML input element set**  
  the SelectPage plugin just need put a input tag in the page  
  ```html
  <input type="text" id="selectpage" >
  ```

  **Javascript init plugin**
  ```js
  //defined a array (the server side returned data format was same like that)
  //Array[{Object},{...}]
  var data = [
      {id:1 ,name:'Chicago Bulls',desc:'芝加哥公牛'},
      {id:2 ,name:'Cleveland Cavaliers',desc:'克里夫兰骑士'},
      {id:3 ,name:'Detroit Pistons',desc:'底特律活塞'},
      {id:4 ,name:'Indiana Pacers',desc:'印第安纳步行者'}
  ];
  //init SelectPage
  $('#selectpage').selectPage({
      showField : 'desc',
      keyField : 'id',
      data : data
  });
  ```

<br><br>

## Options

- **data** `string | object`  
  default : undefined  
  data source (String：ajax search URL | Object：JSON format array)  
  **example**  
  *string* : serverside request url address  
  *object* : JSON format array，format like : `[{a:1,b:2,c:3},{...}]`

- **lang** `string`  
  default : 'cn'  
  plugin language  

| code | language |
| ------ | ------ |
| cn | chinese |
| en | english |
| de | german |
| es | spanish |
| ja | japanse |
| pt-br | Brazilian Portuguese |

- **multiple** `boolean`  
  default : false  
  whether it is multi-select mode（use tags mode）

- **pagination** `boolean`  
  default : true  
  paging or not

- **listSize** `number`  
  default : 10  
  the list shows the number of items, and the other items are displayed in a scroll bar,it only work on `pagination : false`

- **multipleControlbar** `boolean`  
  default : true  
  whether to enable the multi-select mode control button area,only work on `multiple: true`

- **maxSelectLimit** `number`  
  default : 0  
  maximum number of selections in multi-select mode，0 is unlimited

- **selectToCloseList** `boolean`  
  default : true  
  is close list after item select,it only work on `multiple:true`

- **initRecord** `string`  
  default : undefined  
  the initial value of the plugin, The value will match the option.keyField field, and if it matches, it will be automatically selected and highlighted

- **dbTable** `string`  
  default : 'tbl'  
  use this parameter to set the corresponding data table name in server side(ajax) mode

- **keyField** `string`  
  default : 'id'  
  value field, usually the contents of the field will be automatically saved in the hidden domain

- **showField** `string`  
  default : 'name'  
  the result is used to display the name of the attribute

- **searchField** `string`  
  default : undefined  
  query field, set server side query field when data source is server side mode, if not set default use of option.showField

- **andOr** `string`  
  default : 'AND'  
  multiple keywords search type ('AND' or 'OR')

- **orderBy** `array`  
  default : undefined  
  result data sort type, default use showField specified field  
  **example**  
  `orderBy : ['id desc']//use id field sort desc`

- **pageSize** `number`  
  default : 10  
  the number of records per page

- **params** `function`  
  default : undefined  
  return : object  
  send request params for server side data source(ajax)  
  **example**  
  `params : function(){return {'name':'aa','sex':1};}`

- **formatItem** `function`  
  default : undefined  
  **param**  
  *data* `object` row data object format  
  *return* : string  
  list item display content formatting  
  **example**  
  ```js
  formatItem : function(data){
	  return data.a + '(' + data.b + ')';
  }
  ```


- **focusDropList** `boolean`  
  default : true  
  when input box get focus,drop the list

- **autoSelectFirst** `boolean`  
  default : true  
  whether to automatically select the first item in the list (enter the keyword query mode, use the mouse directly does not trigger)

- **autoFillResult** `boolean`  
  default : true  
  whether to automatically fill the content, if the list item is highlighted, in the focus away from the control, automatically set the item for the selected content

- **noResultClean** `boolean`  
  default : true  
  enter the keyword to query and no item match,when focus leave plugin,whether to clear enter keywords

- **selectOnly** `boolean`  
  default : false  
  select only mode,the input box can not enter any word

- **inputDelay** `number`  
  default : 0.5(second)  
  enter the keyword query delay, work on server side(ajax) mode

- **eSelect** `function`  
  default : undefined  
  item selected callback  
  **param**  
  *data* `object | array` selected row or rows data(json)
  
- **eOpen** `function`  
  default : undefined  
  before show up result list callback  
  **param**  
  *self* `object` plugin object

- **eAjaxSuccess** `function`  
  default : undefined  
  in server side mode,this is the callback function when request success,the role of the callback is used to custom processing of the return  data  
  **param**  
  *data* `object` server side return data(json)  
  *return* `object` convert to SelectPage required data format  
  **return data format**  
  ```js
  {
	  list : [{name:'aa',sex:1},{name:'bb',sex:1}...],
	  totalRow : 100
  }
  ```

- **eTagRemove** `function`  
  default : undefined    
  this callback function is used to close tag, when `multiple : true`  
  **param**  
  *removeCount* `number` removed tag count

<br><br>

## API
- **selectPageClear**  
  clear all select items

  ```js
  $('#selectpage').selectPageClear();
  ```
- **selectPageRefresh**  
  refresh plugin selected items info
  ```js
  $('#selectpage').val(20);//modify selected by id used javascript
  $('#selectpage').selectPageRefresh();//refresh selection item info
  ```
- **selectPageData**  
  change plugin data source,only work on json data source mode  
  **param**  
  *data* `array` new json data,the data format is same to plugin data source
  ```js
  var newdata = [{a:1,b:11,c:111},{a:2,b:22,c:222},{...}];
  $('#selectpage').selectPageData(newdata);
  ```
- **selectPageDisabled**  
  get plugin disabled status and set to `disabled` / `enabled`  
  **param**  
  *disabled* `boolean` set disabled stauts. `true` to disabled, `false` to enabled  
  ```js
  if($('#selectpage').selectPageDisabled()){//get plugin disabled stuats
      $('#selectpage').selectPageDisabled(false);//set plugin to enabled 
  }
  ```
- **selectPageText**  
  get plugin selected items text
  ```js
  alert($('#selectpage').selectPageText());
  ```
