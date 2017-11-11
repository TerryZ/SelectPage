# ![SelectPageLogo](https://terryz.github.io/image/logo/SelectPage.png)

A simple style and powerful selection jQuery plugin, including ajax remote data, autocomplete, pagination, tags, i18n and keyboard navigation features

[简体中文文档](README-CN.md)

## Docs、Demo、Guide

Explorer on 

- [English official site](https://TerryZ.github.io/selectpage/index.html)（translation unfinished）

- [中文官网](https://terryz.oschina.io/selectpage/index.html)


## Status

[![travis ci](https://travis-ci.org/TerryZ/SelectPage.svg?branch=master)](https://travis-ci.org/TerryZ/SelectPage)
[![npm version](https://img.shields.io/npm/v/selectpage.svg)](https://www.npmjs.com/package/selectpage)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)
[![npm](https://img.shields.io/npm/dy/selectpage.svg)](https://www.npmjs.com/package/selectpage)
[![language](https://img.shields.io/badge/language-javascript%20%2F%20jquery-blue.svg)]()

## Plugin Preview

*Multiple Select by Tags mode*

![SelectPage1](https://terryz.github.io/image/SelectPage1.png)

*Normal select mode ( single select )*

![SelectPage](https://terryz.github.io/image/SelectPage.png)

*List only mode ( pagination bar close, disable typing to quick search, select only )*

![SelectPageList](https://terryz.github.io/image/SelectPageList.png)

<br><br>


## What

SelectPage is a jquery library multifunction drop list paging selector, as a powerful one form element, it will have a lot of shortcoming, welcome to submit your suggestions to the project, let's make SelectPage better

### Key Features

- a jQuery plugin
- a item selection plugin for bootstrap2、3
- compatible with no UI framework of the program, but it is recommended to use at least normalize.css
- quick search item by input autocomplete
- use keybord to quick navigate
- multiple select by tag form
- The result list automatically determines the edge of the screen to avoid content beyond the visible range
- brower support IE8+, chrome, firefox

### License

MIT

<br><br>


## How

### Install  
  download SelectPage plugin zip file by last release, or [click me](https://github.com/TerryZ/SelectPage/archive/master.zip) to download SelectPage  
  or use **NPM**
  ```
  npm install selectpage
  ```
### Usage
  As you can see in the [Demo Page](https://terryz.github.io/selectpage/demo.html), you will need to include:
  - [jQuery library](http://jquery.com) (1.10.2+), untest on jquery2.x & 3.x
  - The JavaScript file `selectpage.js` (or its minified version `selectpage.min.js`)
  - The css file `selectpage.bootstrap3.css` for bootstrap3.x , `selectpage.css` for bootstrap2.x , `selectpage.base.css` for no css framework
  
  **Including files**  
  ```html
  <!-- SelectPage depend on font-awesome icon -->
  <link rel="stylesheet" href="font-awesome.min.css" type="text/css">
  <!-- jQuery library 1.6+ -->
  <script type="text/javascript" src="jquery.min.js" >< /script>

  <!-- include for Bootstrap2.x -->
  <link rel="stylesheet" href="selectpage.css" type="text/css">
  <!-- include for Bootstrap3.x -->
  <link rel="stylesheet" href="selectpage.bootstrap3.css" type="text/css">
  <!-- include for no css framework -->
  <link rel="stylesheet" href="selectpage.base.css" type="text/css">
  <!-- Above the css file under your css framework choose one of them to include -->
  
  <script type="text/javascript" src="selectpage.js" >< /script>
  ```

  **HTML input element set**  
  the SelectPage plugin just need put a input tag in the page  
  ```html
  <input type="text" id="selectpage" >
  ```

  **Javascript init plugin**
  ```js
  //defined a array, the data returned at the server side is also used that format：Array[{Object},{...}]
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

**If you think this project is helpful, please star it.**
