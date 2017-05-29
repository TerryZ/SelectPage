/**
 * 基于ComboSelect功能进行功能封装，使得初始化更加简易
 * 
 * @author Terry
 * created : 2016.03.26
 * 
 * 2016.04.20
 * 增加callback回调，统一返回当前被选中项的key和value
 * 
 * 2016.10.04
 * 增加autoSelectFirst、autoFillResult、noResultClean三个参数开放设置，增加对下拉列表的控制
 */

!function ($) {

	"use strict"; // 使用严格模式Javascript
	
	/**
	 * 默认参数集
	 */
	var _defaults = {
		lang : 'cn',                          //插件语言，默认中文
		showField : 'name',                   //显示在列表中的数据字段，默认设置name字段，它必须在数据源里存在
		keyField : 'id',                      //数据代码列，默认设置id字段
		multiple : false,                    //是否为多选模式，默认为单选模式
		searchField : undefined,              //查询字段，仅为使用URL(ajax)方式查询服务端时，设置后端查询的字段，不设置则默认使用showField设置的字段
		
		focusDropList : true,                 //是否在输入框获得焦点时，展开下拉窗口
		
		autoSelectFirst : true,               //是否自动选择列表中的第一项内容(输入关键字查询模式，直接使用鼠标下拉并不触发)
		
		autoFillResult : true,                //是否自动填充内容
		                                      //若有列表项目被高亮显示，在焦点离开控件后，自动设置该项为选中内容
		
		noResultClean : true,                 //是否清空输入关键字
		                                      //在输入框中输入内容进行查询，但没有匹配的内容返回，在焦点离开控件后，自动清空输入框输入的内容
		
		formatItem : undefined,               //列表项目显示内容格式化
											  //参数类型：function
											  //参数1：data，行数据object格式
											  //返回：string
		
		pageSize : 10,                        //每页显示记录数，默认一页显示10条记录
		navNum : 5,                           //显示页数个数，即在分页栏中最多显示的页码个数，默认为5
		initField : 'data-init',              //初始化数据列，默认设置为data-init属性，该属性设置了初始化插件时默认显示的内容
		                                      //它必须设置在input标签内，例：<input type="text" data-init="20">
		
		data : false,                         //数据源，它可以是一个已经初始化好的JSON数组数据格式，可以是一个URL，返回的也是JSON数组数据格式
		                                      //例如：[{id:1,name:'张三',sex:'男'},{id:2,name:'李四',sex:'男'}]
		                                      //如上所例数据，showField可设置为name或sex，keyField可设置为id
		
		params : undefined,                   //使用URL进行AJAX查询时，可传递查询参数
		                                      //参数类型：function
		                                      //返回结果：{'name':'aa','sex':1}
		                                      //例如：params : function(){return {'name':'aa','sex':1};}
		
		callback : undefined                 //事件回调，响应项目被选中后的事件处理
		                                      //参数：data：选中行的原始JSON数据
	};
	
	var bComboSelect = function(element,options){
		this.init(element,options);
	};
	
	bComboSelect.prototype = {
		/**
		 * 初始化组合下拉列表
		 * @param e  输入控件原生对象
		 * @param p  参数集
		 */
		init : function(e,p){
			if(!e || !p || !p.data) {
				console.error('ComboSelect参数设置不正确！');
				return;
			}
			var $this = $(e);
			var initCode = '';
			if($(e).attr(p.initField)) initCode = $(e).attr(p.initField);
			else initCode = false;
			$(e).comboSelect(p.data, {
				lang : p.lang,
				plugin_type : p.pluginType,
				//button_img : $webroot + 'js/jquery/jquery.ajax-combobox/btn.png',已修改成bootstrap风格的向下键，不再需要设置该参数
				field : p.showField,
				multiple : p.multiple,
				primary_key : p.keyField,
				search_field : p.searchField,
				init_record : initCode,
				per_page : p.pageSize,
				navi_num : p.navNum,
				params : p.params,
				bind_to : 'bComboSelect',
				focus_drop_list : p.focusDropList ? true : false,
				auto_select_first : p.autoSelectFirst ? true : false,
				auto_fill_result : p.autoFillResult ? true : false,
				no_result_clean : p.noResultClean ? true : false,
				format_item : p.formatItem
			}).on('bComboSelect',function(e,data){//项目被选中时的回调函数
				if(p && p.callback && $.isFunction(p.callback)) p.callback(data);
			});
		}
	};
	
	/**
	 * 插件定义
	 */
	$.fn.bComboSelect = function(options){
		return this.each(function () {
			var $this = $(this),
				params = $.extend({}, _defaults, $.isPlainObject(options) && options);

			var comboSelect = new bComboSelect(this, params);
			$this.data('bComboSelect',comboSelect);
		});
	};
	/**
	 * 获得文本内容
	 */
	$.fn.bComboSelectText = function(){
		var id = $(this).attr('id');
		if(!id) id = $(this).attr('name');
		return $('#' + id + '_text').val();
	};
}(window.jQuery);