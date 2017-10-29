/**
 * @summary     SelectPage
 * @desc        Simple and powerful selection plugin
 * @file        selectpage.js
 * @version     2.12
 * @author      TerryZeng
 * @contact     https://terryz.github.io/
 * @license     MIT License
 *
 */
;(function($){
	"use strict";
	/**
	 * Default options
	 */
	var defaults = {
		/**
		 * @desc 数据源(String：Ajax查询的URL|Object：JSON格式的数据源)
		 * @type {string|Object}
		 * @example
		 * string：服务端请求的URL地址
		 * Object：JSON格式数组，推荐格式：[{a:1,b:2,c:3},{...}]
		 */
		data: undefined,
		/**
		 * @desc 插件显示语言 ('ja', 'en', 'es', 'pt-br'等)
		 * @type string 默认'cn'
		 */
		lang: 'cn',
		/**
		 * @desc 是否为多选模式（标签模式）
		 * @type boolean 默认值false
		 */
		multiple: false,
        /**
         * @desc 是否分页
         * @type boolean 默认值 true
         */
        pagination: true,
        /**
         * @desc 关闭分页的状态下，列表显示的项目个数，其它的项目以滚动条滚动方式展现
         * @type number 默认值 10
         */
        listSize : 10,
		/**
		 * @desc 是否启用多选模式的控制按钮区域
		 * 仅multiple: true模式下可用
		 * @type boolean 默认值true
		 */
		multipleControlbar: true,
		/**
		 * @desc 多选模式下最大选择个数，0为不限制
		 * @type number 默认0
		 */
		maxSelectLimit: 0,
		/**
		 * @desc 选中项目后关闭列表
		 * 该设置仅在多选模式下multiple:true有效
		 * @type boolean 默认值true
		 */
		selectToCloseList: true,
		/**
		 * @desc 插件初始值指定，该值会与option.keyField字段进行匹配，若匹配到，则自动设置选中并高亮
		 * @type string 
		 */
		initRecord: undefined,
		/**
		 * @desc 使用ajax方式获取数据时，使用该参数设置对应的数据表名
		 * @type string
		 */
		dbTable: 'tbl',
		/**
		 * @desc 值字段，通常该字段的内容会自动保存在隐藏域中
		 * @type string 默认值为'id'
		 */
		keyField: 'id',
		/**
		 * @desc 结果集中用于显示的属性名
		 * @type string 默认字段为'name'
		 */
		showField: 'name',
		/**
		 * @desc 查询字段，仅为使用URL(ajax)方式查询服务端时，设置后端查询的字段，不设置则默认使用showField设置的字段
		 * @type string
		 */
		searchField : undefined,
		/**
		 * @desc 查询方式 ('AND' or 'OR')
		 * @type string 默认为'AND'
		 */
		andOr: 'AND',
        /**
         * @desc 数据排序方式
         * @type array 若不设置则默认对showField指定的字段进行排序
         * @example
         * orderBy : ['id desc']//对ID字段进行降序排序
         */
        orderBy: undefined,
		/**
		 * @desc 每页显示的记录数
		 * @type number
		 */
		pageSize: 10,
		/**
		 * @desc 使用URL进行AJAX查询时，可传递查询参数
		 * @type function
		 * @return object
		 * @example params : function(){return {'name':'aa','sex':1};}
		 */
		params : undefined,
		/**
		 * 列表项目显示内容格式化
		 * 参数类型：function
		 * @type boolean
		 * @param data {object} 行数据object格式
		 * @return string
		 */
		formatItem : undefined,
		/**
		 * 是否在输入框获得焦点时，展开下拉窗口
		 * @type boolean 默认值true
		 */
		focusDropList : true,
		/**
		 * 是否自动选择列表中的第一项内容(输入关键字查询模式，直接使用鼠标下拉并不触发)
		 * @type boolean 默认值false
		 */
		autoSelectFirst: false,
		/**
		 * 是否自动填充内容
		 * 若有列表项目被高亮显示，在焦点离开控件后，自动设置该项为选中内容
		 * @type boolean 默认值false
		 */
		autoFillResult: false,
		/**
		 * 是否清空输入关键字
		 * 在输入框中输入内容进行查询，但没有匹配的内容返回，在焦点离开控件后，自动清空输入框输入的内容
		 * @type boolean 默认值false
		 */
		noResultClean: true,
		/**
		 * @desc 只选择模式
		 * @type boolean
		 */
		selectOnly: false,
        /**
         * @desc 输入关键字查询延迟（仅ajax数据源模式下可用）
         * @type number 默认值：0.5秒
         */
        inputDelay: 0.5,
		/**
		 * -----------------------------------------事件回调--------------------------------------------
		 */
		/**
		 * @type function
		 * @param object
		 * @param dom
		 */
		eSelect : undefined,
		/**
		 * ajax请求模式，请求成功后的数据处理回调
		 * 回调的功能用于自定义处理服务端返回的数据
		 * @type function
		 * @param data {object} ajax服务端返回的json数据
		 * @return {object} 函数返回的数据结构如下：
		 * @example 
		 * {
		 *   list : [{name:'aa',sex:1},{name:'bb',sex:1}...],
		 *   totalRow : 100
		 * }
		 */
		eAjaxSuccess : undefined,
		/**
		 * 多选模式下，关闭标签是的回调函数
		 * @type function
		 * @param removeCount 被移除的个数
		 */
		eTagRemove : undefined,
        /**
         * 单选模式下，选中项目后的清除按钮功能回调
         * @type function
         */
        eClear : undefined
	};


	/**
     * SelectPage class definition
	 * @constructor
	 * @param {Object} input - input element
	 * @param {Object} option
	 */
	var SelectPage = function(input, option) {
		this.setOption(option);
		this.setLanguage();
		this.setCssClass();
		this.setProp();
		this.setElem(input);

		this.setButtonAttrDefault();
		this.setInitRecord();

		this.eDropdownButton();
		this.eInput();
		this.eWhole();
		return this;
	};
	/**
	 * Plugin version number
	 */
	SelectPage.version = '2.12';
	/**
	 * Plugin object cache key
	 */
	SelectPage.dataKey = 'selectPageObject';
	/**
	 * @desc 参数初始化
	 * @param {Object} option - 参数集
	 */
	SelectPage.prototype.setOption = function(option) {
		//若没有设置搜索字段，则使用显示字段作为搜索字段
		option.searchField = (option.searchField === undefined) ? option.showField: option.searchField;
		
		//统一大写
		option.andOr = option.andOr.toUpperCase();
		if(option.andOr!=='AND' && option.andOr!=='OR') option.andOr = 'AND';

		//将参数内容从使用","分隔的字符串转换为数组
		var arr = ['searchField'];
		for (var i = 0; i < arr.length; i++) {
			option[arr[i]] = this.strToArray(option[arr[i]]);
		}

		//设置排序字段
		option.orderBy = (option.orderBy === undefined) ? option.searchField: option.orderBy;

		//设置多字段排序
		//例:  [ ['id', 'ASC'], ['name', 'DESC'] ]
		option.orderBy = this.setOrderbyOption(option.orderBy, option.showField);
		//多选模式下，若设置了选择项目不关闭列表功能，则强制关闭自动选择第一项功能和自动选中高亮的项目功能
		//原因是打开了会总是莫明选择了第一项，体验不佳
		if(option.multiple && !option.selectToCloseList){
			option.autoFillResult = false;
			option.autoSelectFirst = false;
		}

		if($.type(option.data) === 'string'){
		    option.autoSelectFirst = false;
        }
        //若不需要分页功能，则将所有数据都显示出来，上限200项
        if(!option.pagination) option.pageSize = 200;
		if($.type(option.listSize) !== 'number' || option.listSize < 0) option.listSize = 10;

		this.option = option;
	};

	/**
	 * @desc 字符串转换为数组
	 * @param str {string} - 字符串
	 * @return {Array} - 数组
	 */
	SelectPage.prototype.strToArray = function(str) {
		if(!str) return '';
		return str.replace(/[\s　]+/g, '').split(',');
	};

	/**
	 * @desc 设置多字段排序
	 * @param {Array} arg_order - 排序顺序
	 * @param {string} arg_field - 字段
	 * @return {Array} - 处理后的排序字段内容
	 */
	SelectPage.prototype.setOrderbyOption = function(arg_order, arg_field) {
		var arr = [],orders = [];
		if (typeof arg_order == 'object') {
			for (var i = 0; i < arg_order.length; i++) {
				orders = $.trim(arg_order[i]).split(' ');
				arr[i] = (orders.length == 2) ? orders: [orders[0], 'ASC'];
			}
		} else {
			orders = $.trim(arg_order).split(' ');
			arr[0] = (orders.length == 2) ? orders: (orders[0].match(/^(ASC|DESC)$/i)) ? [arg_field, orders[0]] : [orders[0], 'ASC'];
		}
		return arr;
	};

	/**
	 * i18n
	 */
	SelectPage.prototype.setLanguage = function() {
		var message, p = this.option;
		switch (p.lang) {
		// German
		case 'de':
			message = {
				add_btn: 'Hinzufügen-Button',
				add_title: 'Box hinzufügen',
				del_btn: 'Löschen-Button',
				del_title: 'Box löschen',
				next: 'Nächsten',
				next_title: 'Nächsten' + p.pageSize + ' (Pfeil-rechts)',
				prev: 'Vorherigen',
				prev_title: 'Vorherigen' + p.pageSize + ' (Pfeil-links)',
				first_title: 'Ersten (Umschalt + Pfeil-links)',
				last_title: 'Letzten (Umschalt + Pfeil-rechts)',
				get_all_btn: 'alle (Pfeil-runter)',
				get_all_alt: '(Button)',
				close_btn: 'Schließen (Tab)',
				close_alt: '(Button)',
				loading: 'lade...',
				loading_alt: '(lade)',
				page_info: 'num_page_top - num_page_end von cnt_whole',
				select_ng: 'Achtung: Bitte wählen Sie aus der Liste aus.',
				select_ok: 'OK : Richtig ausgewählt.',
				not_found: 'nicht gefunden',
				ajax_error: 'Bei der Verbindung zum Server ist ein Fehler aufgetreten.'
			};
			break;

		// English
		case 'en':
			message = {
				add_btn: 'Add button',
				add_title: 'add a box',
				del_btn: 'Del button',
				del_title: 'delete a box',
				next: 'Next',
				next_title: 'Next' + p.pageSize + ' (Right key)',
				prev: 'Prev',
				prev_title: 'Prev' + p.pageSize + ' (Left key)',
				first_title: 'First (Shift + Left key)',
				last_title: 'Last (Shift + Right key)',
				get_all_btn: 'Get All (Down key)',
				get_all_alt: '(button)',
				close_btn: 'Close (Tab key)',
				close_alt: '(button)',
				loading: 'loading...',
				loading_alt: '(loading)',
				page_info: 'num_page_top - num_page_end of cnt_whole',
				select_ng: 'Attention : Please choose from among the list.',
				select_ok: 'OK : Correctly selected.',
				not_found: 'not found',
				ajax_error: 'An error occurred while connecting to server.'
			};
			break;

		// 中文
		case 'cn':
			message = {
				add_btn: '添加按钮',
				add_title: '添加区域',
				del_btn: '删除按钮',
				del_title: '删除区域',
				next: '下一页',
				next_title: '下' + p.pageSize + ' (→)',
				prev: '上一页',
				prev_title: '上' + p.pageSize + ' (←)',
				first_title: '首页 (Shift + ←)',
				last_title: '尾页 (Shift + →)',
				get_all_btn: '获得全部 (↓)',
				get_all_alt: '(按钮)',
				close_btn: '关闭 (Tab键)',
				close_alt: '(按钮)',
				loading: '读取中...',
				loading_alt: '(读取中)',
				page_info: 'num_page_top - num_page_end (共 cnt_whole)',
				select_ng: '请注意：请从列表中选择.',
				select_ok: 'OK : 已经选择.',
				not_found: '无查询结果',
				ajax_error: '连接到服务器时发生错误！'
			};
			break;

		// Spanish
		case 'es':
			message = {
				add_btn: 'Agregar boton',
				add_title: 'Agregar una opcion',
				del_btn: 'Borrar boton',
				del_title: 'Borrar una opcion',
				next: 'Siguiente',
				next_title: 'Proximas ' + p.pageSize + ' (tecla derecha)',
				prev: 'Anterior',
				prev_title: 'Anteriores ' + p.pageSize + ' (tecla izquierda)',
				first_title: 'Primera (Shift + Left)',
				last_title: 'Ultima (Shift + Right)',
				get_all_btn: 'Ver todos (tecla abajo)',
				get_all_alt: '(boton)',
				close_btn: 'Cerrar (tecla TAB)',
				close_alt: '(boton)',
				loading: 'Cargando...',
				loading_alt: '(Cargando)',
				page_info: 'num_page_top - num_page_end de cnt_whole',
				select_ng: 'Atencion: Elija una opcion de la lista.',
				select_ok: 'OK: Correctamente seleccionado.',
				not_found: 'no encuentre',
				ajax_error: 'Un error ocurrió mientras conectando al servidor.'
			};
			break;

		// Brazilian Portuguese
		case 'pt-br':
			message = {
				add_btn: 'Adicionar botão',
				add_title: 'Adicionar uma caixa',
				del_btn: 'Apagar botão',
				del_title: 'Apagar uma caixa',
				next: 'Próxima',
				next_title: 'Próxima ' + p.pageSize + ' (tecla direita)',
				prev: 'Anterior',
				prev_title: 'Anterior ' + p.pageSize + ' (tecla esquerda)',
				first_title: 'Primeira (Shift + Left)',
				last_title: 'Última (Shift + Right)',
				get_all_btn: 'Ver todos (Seta para baixo)',
				get_all_alt: '(botão)',
				close_btn: 'Fechar (tecla TAB)',
				close_alt: '(botão)',
				loading: 'Carregando...',
				loading_alt: '(Carregando)',
				page_info: 'num_page_top - num_page_end de cnt_whole',
				select_ng: 'Atenção: Escolha uma opção da lista.',
				select_ok: 'OK: Selecionado Corretamente.',
				not_found: 'não encontrado',
				ajax_error: 'Um erro aconteceu enquanto conectando a servidor.'
			};
			break;

		// Japanese
		case 'ja':
			message = {
				add_btn: '追加ボタン',
				add_title: '入力ボックスを追加します',
				del_btn: '削除ボタン',
				del_title: '入力ボックスを削除します',
				next: '次へ',
				next_title: '次の' + p.pageSize + '件 (右キー)',
				prev: '前へ',
				prev_title: '前の' + p.pageSize + '件 (左キー)',
				first_title: '最初のページへ (Shift + 左キー)',
				last_title: '最後のページへ (Shift + 右キー)',
				get_all_btn: '全件取得 (下キー)',
				get_all_alt: '画像:ボタン',
				close_btn: '閉じる (Tabキー)',
				close_alt: '画像:ボタン',
				loading: '読み込み中...',
				loading_alt: '画像:読み込み中...',
				page_info: 'num_page_top - num_page_end 件 (全 cnt_whole 件)',
				select_ng: '注意 : リストの中から選択してください',
				select_ok: 'OK : 正しく選択されました。',
				not_found: '(0 件)',
				ajax_error: 'サーバとの通信でエラーが発生しました。'
			};
			break;
		}
		this.message = message;
	};

	/**
	 * Css classname defined
	 */
	SelectPage.prototype.setCssClass = function() {
		var css_class = {
			container: 'sp_container',
			// SelectPage最外层DIV的打开状态
			container_open: 'sp_container_open',
			re_area: 'sp_result_area',
            result_open: 'sp_result_area_open',
			control_box: 'sp_control_box',
			//标签及输入框的
			element_box: 'sp_element_box',
			// 分页导航
			navi: 'sp_navi',
			// 下拉结果列表
			results: 'sp_results',
			re_off: 'sp_results_off',
			select: 'sp_over',
			select_ok: 'sp_select_ok',
			select_ng: 'sp_select_ng',
            selected: 'sp_selected',
			input_off: 'sp_input_off',
			message_box: 'sp_message_box',
            // 多选模式的禁用状态样式
            disabled: 'sp_disabled',
			
			button: 'sp_button',
			btn_on: 'sp_btn_on',
			btn_out: 'sp_btn_out',
			input: 'sp_input',
            clear_btn : 'sp_clear_btn'
		};
		this.css_class = css_class;
	};

	/**
	 * Plugin inner properties
	 */
	SelectPage.prototype.setProp = function() {
		this.prop = {
		    // input disabled status
		    disabled : false,
			//当前页
			current_page: 1,
			//总页数
			max_page: 1,
			//是否正在Ajax请求
			is_loading: false,
			xhr: false,
			//使用键盘进行分页
			key_paging: false,
			//使用键盘进行选择
			key_select: false,
			//上一个选择的项目值
			prev_value: '',
            //选中项目的文本内容
            selected_text : '',
			//上一次键盘输入的时间
			last_input_time: undefined
		};
		this.template = {
			tag : {
				content : '<li class="selected_tag" itemvalue="#item_value#">#item_text#<span class="tag_close">×</span></li>',
				textKey : '#item_text#',
				valueKey : '#item_value#'
			}
		};
	};

	/**
	 * Dom building
	 * @param {Object} combo_input - input element
	 */
	SelectPage.prototype.setElem = function(combo_input) {
		// 1. build Dom object
		var elem = {}, p = this.option, css = this.css_class;
		var orgWidth = $(combo_input).outerWidth();
		if(orgWidth < 150) orgWidth = 150;

		elem.combo_input = $(combo_input).attr({'autocomplete':'off'}).addClass(css.input).wrap('<div>');
		//只选择模式设置输入框为只读状态
		if(p.selectOnly) elem.combo_input.prop('readonly',true);
        elem.container = elem.combo_input.parent().addClass(css.container);
		if(elem.combo_input.prop('disabled')) {
		    if(p.multiple) elem.container.addClass(css.disabled);
            else elem.combo_input.addClass(css.input_off);
        }

		elem.container.width(orgWidth);

		elem.button = $('<div>').addClass(css.button);
		//bootstrap风格的向下三角箭头
		elem.dropdown = $('<span class="bs-caret"><span class="caret"></span></span>');
		//单选模式下清除的按钮X
		elem.clear_btn = $('<div>').append('×').addClass(css.clear_btn).attr('title','清除内容');
		
		//多选模式下带标签显示及文本输入的组合框
		elem.element_box = $('<ul>').addClass(css.element_box);
		if(p.multiple && p.multipleControlbar)
			elem.control = $('<div>').addClass(css.control_box);
		//结果集列表
		elem.result_area = $('<div>').addClass(css.re_area);
		//列表中的分页栏pagination
        if(p.pagination) elem.navi = $('<div>').addClass('pagination').append('<ul>');
		elem.results = $('<ul>').addClass(css.results);
		
		/**
		 * 将原输入框的Name交换到Hidden中，因为具体需要保存传递到后端的是ID，而非Title
		 */
		var namePrefix = '_text',
		    //将keyField的值放入"input:hidden"
		    input_id = (elem.combo_input.attr('id') !== undefined) ? elem.combo_input.attr('id') : elem.combo_input.attr('name'),
		    input_name = (elem.combo_input.attr('name') !== undefined) ? elem.combo_input.attr('name') : 'selectPage',
		    hidden_name = input_name,
		    hidden_id = input_id;

		//将输入框的Name与Hidden的Name进行交换，使得可以将项目的具体ID被保存到后端进行处理
		elem.hidden = $('<input type="hidden" class="sp_hidden" />').attr({
			name: hidden_name,
			id: hidden_id
		}).val('');
		elem.combo_input.attr({
			name: input_name + namePrefix,
			id: input_id + namePrefix
		});

		// 2. DOM element put
		elem.container.append(elem.button).append(elem.hidden);
		$(document.body).append(elem.result_area);
		elem.button.append(elem.dropdown);
		elem.result_area.append(elem.results);
        if(p.pagination) elem.result_area.append(elem.navi);
		
		//Multiple select mode
		if(p.multiple){
			if(p.multipleControlbar){
				elem.control.append('<button type="button" class="btn btn-default sp_select_all" ><i class="iconfont if-select-all"></i> 全选本页</button>');
				elem.control.append('<button type="button" class="btn btn-default sp_unselect_all" ><i class="iconfont if-unselect-all"></i> 取消本页</button>');
				elem.control.append('<button type="button" class="btn btn-default sp_clear_all" ><i class="iconfont if-clear"></i> 清除全部</button>');
				elem.result_area.prepend(elem.control);
			}				
			elem.container.addClass('sp_container_combo');
			elem.combo_input.addClass('sp_combo_input').before(elem.element_box);
			var li = $('<li>').addClass('input_box');
			li.append(elem.combo_input);
			elem.element_box.append(li);
			if(elem.combo_input.attr('placeholder')) elem.combo_input.attr('placeholder_bak',elem.combo_input.attr('placeholder'));
		}
        p.container = elem.container;
		this.elem = elem;
	};

	/**
	 * @desc 将控件的部分内容设置为默认状态
	 */
	SelectPage.prototype.setButtonAttrDefault = function() {
	    /*
		if (this.option.selectOnly) {
			if ($(this.elem.combo_input).val() !== '') {
				if ($(this.elem.hidden).val() !== '') {
					//选择条件
					$(this.elem.combo_input).attr('title', this.message.select_ok).removeClass(this.css_class.select_ng).addClass(this.css_class.select_ok);
				} else {
					//输入方式
					$(this.elem.combo_input).attr('title', this.message.select_ng).removeClass(this.css_class.select_ok).addClass(this.css_class.select_ng);
				}
			} else {
				$(this.elem.hidden).val('');
				$(this.elem.combo_input).removeAttr('title').removeClass(this.css_class.select_ng);
			}
		}
		*/
		//this.elem.button.attr('title', this.message.get_all_btn);
		this.elem.button.attr('title', this.message.close_btn);
	};

	/**
	 * Set item need selected after init
     * set selected item ways:
     * <input value="key">
     * <input data-init="key">
	 */
	SelectPage.prototype.setInitRecord = function(refresh) {
		var self = this, p = self.option, el = self.elem, key = '';
        if($.type(el.combo_input.data('init')) != 'undefined')
            p.initRecord = String(el.combo_input.data('init'));
        //若在输入框中放入了初始化值，则将它放到隐藏域中进行选中项目初始化
        //若输入框设置了初始值，同时又设置了data-init属性，那么以data-init属性为优先选择
        if(!refresh && !p.initRecord && el.combo_input.val())
            p.initRecord = el.combo_input.val();
        el.combo_input.val('');
        if(!refresh) el.hidden.val(p.initRecord);
        key = refresh && el.hidden.val() ? el.hidden.val() : p.initRecord;
		if(key){
			if (typeof p.data === 'object') {
				var data = new Array();
				var keyarr = key.split(',');
				$.each(keyarr,function(index,row){
					for (var i = 0; i < p.data.length; i++) {
						if (p.data[i][p.keyField] == row) {
							data.push(p.data[i]);
							break;
						}
					}
				});
				//在单选模式下，若使用了多选模式的初始化值（“key1,key2,...”多选方式），则选用第一项
				if(!p.multiple && data.length > 1) data = [data[0]];
				self.afterInit(self, data);
			} else {//ajax data source mode to init selected item
				$.ajax({
					dataType: 'json',
                    type: 'POST',
					url: p.data,
					data: {
						searchTable: p.dbTable,
						searchKey: p.keyField,
						searchValue: key
					},
					success: function(json) {
					    var d = null;
					    if(p.eAjaxSuccess && $.isFunction(p.eAjaxSuccess))
					        d = p.eAjaxSuccess(json, self);
						self.afterInit(self, d.list);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						self.ajaxErrorNotify(self, errorThrown);
					}
				});
			}
		}
	};

	/**
	 * Selected item set to plugin
	 * @param {Object} self
	 * @param {Object} data - selected item data
	 */
	SelectPage.prototype.afterInit = function(self, data) {
		if(!data) return;
		if(!$.isArray(data)) data = [data];
		var p = self.option, css = self.css_class;

		var getText = function(row){
            var text = row[p.showField];
            if(p.formatItem && $.isFunction(p.formatItem)){
                try{
                    text = p.formatItem(row);
                }catch(e){}
            }
            return text;
        };
		
		if(p.multiple){
			self.clearAll(self);
			$.each(data,function(i,row){
				var item = {text:getText(row),value:row[p.keyField]};
				if(!self.isAlreadySelected(self,item)) self.addNewTag(self,item);
			});
			self.tagValuesSet(self);
			self.inputResize(self);
		}else{
			var row = data[0];
			self.elem.combo_input.val(getText(row));
			self.elem.hidden.val(row[p.keyField]);
			self.prop.prev_value = getText(row);
            self.prop.selected_text = getText(row);
			if (p.selectOnly) {
				self.elem.combo_input.attr('title', self.message.select_ok).removeClass(css.select_ng).addClass(css.select_ok);
			}
			self.putClearButton();
		}
	};

	/**
	 * Drop down button event bind
	 */
	SelectPage.prototype.eDropdownButton = function() {
		var self = this;
		self.elem.button.mouseup(function(ev) {
            ev.stopPropagation();
			if (self.elem.result_area.is(':hidden') && !self.elem.combo_input.prop('disabled')) {
				self.elem.combo_input.focus();
			} else self.hideResults(self);
		}).mouseout();
	};

	/**
	 * Events bind
	 */
	SelectPage.prototype.eInput = function() {
		var self = this,p = self.option, el = self.elem;
		var showList = function(){
			self.prop.page_move = false;
			self.suggest(self);
			self.setCssFocusedInput(self);
		};
		el.combo_input.keyup(function(e) {
			self.processKey(self, e);
		}).keydown(function(e) {
            self.processControl(self, e);
        }).focus(function(e) {
			//When focus on input, show the result list
			if (el.result_area.is(':hidden')) {
				e.stopPropagation();
				self.prop.first_show = true;
				showList();
			}
		});
		el.container.on('click.SelectPage','div.'+self.css_class.clear_btn,function(e){
            e.stopPropagation();
            if(!self.disabled(self)){
                self.clearAll(self);
                if(p.eClear && $.isFunction(p.eClear)) p.eClear(self);
            }
        });
		el.result_area.on('mousedown.SelectPage',function(e){
		    e.stopPropagation();
        });
		if(p.multiple){
			if(p.multipleControlbar){
				//Select all item of current page
                el.control.find('.sp_select_all').on('click.SelectPage',function(e){
					self.selectAllLine(self);
				});
				//Cancel select all item of current page
                el.control.find('.sp_unselect_all').on('click.SelectPage',function(e){
					self.unSelectAllLine(self);
				});
				//Clear all selected item
                el.control.find('.sp_clear_all').on('click.SelectPage',function(e){
					self.clearAll(self);
				});
			}
			el.element_box.on('click.SelectPage',function(e){
				var srcEl = e.target || e.srcElement;
				if($(srcEl).is('ul')) el.combo_input.focus();
			});
			//Tag close
			el.element_box.on('click.SelectPage','span.tag_close',function(){
				var li = $(this).closest('li');
				self.removeTag(self,li);
				showList();
				if(p.eTagRemove && $.isFunction(p.eTagRemove))
					p.eTagRemove(1);
			});
			self.inputResize(self);
		}
	};

	/**
	 * Out of plugin area click event handler
	 */
	SelectPage.prototype.eWhole = function() {
		var self = this, css = self.css_class;
        var cleanContent = function(obj){
            obj.elem.combo_input.val('');
            if(!obj.option.multiple) obj.elem.hidden.val('');
            obj.prop.selected_text = '';
        };

		//Out of plugin area
		$(document).off('mousedown.selectPage').on('mousedown.selectPage',function(e) {
            var ele = e.target || e.srcElement;
            var sp = $(ele).closest('div.' + css.container);

            //Open status result list
            $('div.' + css.container + '.' + css.container_open).each(function(){
                if(this == sp[0]) return;
                var $this = $(this), d = $this.find('input.' + css.input).data(SelectPage.dataKey);


                //若控件已有选中的的项目，而文本输入框中清空了关键字，则清空控件已选中的项目
                if(!d.elem.combo_input.val() && d.elem.hidden.val() && !d.option.multiple){
                    d.prop.current_page = 1;//重置当前页为1
                    cleanContent(d);
                    d.hideResults(d);
                    return true;
                }
                if (d.elem.results.find('li').size()) {
                    if(d.option.autoFillResult) {//打开自动内容填充功能
                        //若已有选中项目，则直接隐藏列表
                        if (d.elem.results.find('li.sp_selected').size()) {
                            d.hideResults(d);
                        }else if(d.elem.results.find('li.sp_over').size()){
                            //若控件已有选中的值，则忽略高亮的项目
                            if(d.elem.hidden.val()) d.hideResults(d);
                            //若没有已选中的项目，且列表中有高亮项目时，选中当前高亮的行
                            else d.selectCurrentLine(d, true);
                        }else if(d.option.autoSelectFirst){
                            //若控件已有选中的值，则忽略自动选择第一项的功能
                            if(d.elem.hidden.val()) d.hideResults(d);
                            else{
                                //对于没有选中，没有高亮的情况，若插件设置了自动选中第一项时，则选中第一项
                                d.nextLine(d);
                                //self.nextLine(self);
                                d.selectCurrentLine(d, true);
                            }
                        }else d.hideResults(d);
                    }else d.hideResults(d);
                } else {
                    //when no one item match, clear search keywords
                    if (d.option.noResultClean) cleanContent(d);
                    else{
                        if(!d.option.multiple) d.elem.hidden.val('');
                    }
                    d.hideResults(d);
                }
            });
		});
	};

	/**
	 * Result list event bind
	 */
	SelectPage.prototype.eResultList = function() {
		var self = this, css = this.css_class;
		self.elem.results.children('li').mouseenter(function() {
			if (self.prop.key_select) {
				self.prop.key_select = false;
				return;
			}
			if(!$(this).hasClass(css.selected) && !$(this).hasClass('sp_message_box')){
                $(this).addClass(css.select);
                self.setCssFocusedResults(self);
            }
		}).mouseleave(function(){
		    $(this).removeClass(css.select);
        }).click(function(e) {
			if (self.prop.key_select) {
				self.prop.key_select = false;
				return;
			}
			e.preventDefault();
			e.stopPropagation();

            if(!$(this).hasClass(css.selected)) self.selectCurrentLine(self, false);
		});
	};

    /**
     * Reposition result list when list beyond the visible area
     */
	SelectPage.prototype.eScroll = function(){
	    var self = this, css = this.css_class;
	    $(window).on('scroll.SelectPage',function(e){
            $('div.' + css.container + '.' + css.container_open).each(function(){
                var $this = $(this), d = $this.find('input.'+css.input).data(SelectPage.dataKey),
                    offset = d.elem.result_area.offset(),
                    screenScrollTop = $(window).scrollTop(),
                    docHeight = $(document).height(),
                    viewHeight = $(window).height(),
                    listHeight = d.elem.result_area.outerHeight(),
                    listBottom = offset.top + listHeight,
                    hasOverflow = docHeight > viewHeight,
                    down = d.elem.result_area.hasClass('shadowDown');
                if(hasOverflow){
                    if(down){//open down
                        if(listBottom > (viewHeight + screenScrollTop)) d.calcResultsSize(d);
                    }else{//open up
                        if(offset.top < screenScrollTop) d.calcResultsSize(d);
                    }
                }
            });
        });
    };

	/**
	 * Page bar button event bind
	 */
	SelectPage.prototype.ePaging = function() {
		var self = this;
		if(!self.option.pagination) return;
        self.elem.navi.find('li.csFirstPage').off('click').on('click',function(ev) {
			//$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.firstPage(self);
		});

        self.elem.navi.find('li.csPreviousPage').off('click').on('click',function(ev) {
			//$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.prevPage(self);
		});

        self.elem.navi.find('li.csNextPage').off('click').on('click',function(ev) {
			//$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.nextPage(self);
		});

        self.elem.navi.find('li.csLastPage').off('click').on('click',function(ev) {
			//$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.lastPage(self);
		});
	};

	/**
	 * Ajax request fail
	 * @param {Object} self
	 * @param {string} errorThrown
	 */
	SelectPage.prototype.ajaxErrorNotify = function(self, errorThrown) {
		self.showMessage(self.message.ajax_error);
	};
	
	/**
	 * Message box
	 * @param {Object} self
	 * @param msg {string} the text need to show
	 */
	SelectPage.prototype.showMessage = function(self,msg){
		if(!msg) return;
		var msgLi = '<li class="sp_message_box"><i class="iconfont if-warning"></i> '+msg+'</li>';
		self.elem.results.empty().append(msgLi).show();
		self.calcResultsSize(self);
		self.setOpenStatus(self, true);
		self.elem.control.hide();
		if(self.option.pagination) self.elem.navi.hide();
	};

	/**
	 * @desc 窗口滚动处理
	 * @param {Object} self - 插件内部对象
	 * @param {boolean} enforce - 是否定位到输入框的位置
	 */
	SelectPage.prototype.scrollWindow = function(self, enforce) {
		var current_result = self.getCurrentLine(self),
            target_top = (current_result && !enforce) ? current_result.offset().top: self.elem.container.offset().top,
            target_size;

		self.prop.size_li = self.elem.results.children('li:first').outerHeight();
		target_size = self.prop.size_li;
		
		var gap, client_height = $(window).height(),
            scroll_top = $(window).scrollTop(),
            scroll_bottom = scroll_top + client_height - target_size;
        // 滚动处理
		if (current_result.length) {
			if (target_top < scroll_top || target_size > client_height) {
				//滚动到顶部
				gap = target_top - scroll_top;
			} else if (target_top > scroll_bottom) {
				//向下滚动
				gap = target_top - scroll_bottom;
			} else return; //不进行滚动
		} else if (target_top < scroll_top) gap = target_top - scroll_top;
		window.scrollBy(0, gap);
	};
    /**
     * 设置控件的打开/关闭状态
     * @param self
     * @param status {boolean} true: open, false: close
     */
	SelectPage.prototype.setOpenStatus = function(self, status){
	    var el = self.elem, css = self.css_class;
	    if(status){
            el.container.addClass(css.container_open);
            el.result_area.addClass(css.result_open);
        }else{
            el.container.removeClass(css.container_open);
            el.result_area.removeClass(css.result_open);
        }
    };

	/**
	 * @desc 输入框获得焦点的样式设置
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.setCssFocusedInput = function(self) {
		//$(self.elem.results).addClass(self.css_class.re_off);
		//$(self.elem.combo_input).removeClass(self.css_class.input_off);
	};

	/**
	 * @desc 设置结果列表高亮，输入框失去焦点
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.setCssFocusedResults = function(self) {
		//$(self.elem.results).removeClass(self.css_class.re_off);
		//$(self.elem.combo_input).addClass(self.css_class.input_off);
	};

	/**
	 * Quick search input keywords listener
	 * @param {Object} self
	 */
	SelectPage.prototype.checkValue = function(self) {
		var now_value = self.elem.combo_input.val();
		if (now_value != self.prop.prev_value) {
			self.prop.prev_value = now_value;
			self.prop.first_show = false;

			if(self.option.selectOnly) self.setButtonAttrDefault();
            if(!self.option.multiple && !now_value){
                self.elem.combo_input.val('');
                self.elem.hidden.val('');
                self.elem.clear_btn.remove();
            }

			self.suggest(self);
		}
	};

    /**
     * Input handle（regular input）
     * @param {Object} self
     * @param {Object} e - event object
     */
    SelectPage.prototype.processKey = function(self, e) {
        if($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9, 13]) === -1){
            if(e.keyCode != 16) self.setCssFocusedInput(self); // except Shift(16)
            self.inputResize(self);
            if($.type(self.option.data) === 'string'){
                self.prop.last_input_time = e.timeStamp;
                setTimeout(function(){
                    if((e.timeStamp - self.prop.last_input_time) === 0)
                        self.checkValue(self);
                },self.option.inputDelay * 1000);
            }else{
                self.checkValue(self);
            }
        }
    }

	/**
	 * Input handle（control key）
	 * @param {Object} self
	 * @param {Object} e - event object
	 */
	SelectPage.prototype.processControl = function(self, e) {
		if (($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9]) > -1 && self.elem.result_area.is(':visible')) ||
			($.inArray(e.keyCode, [13, 9]) > -1 && self.getCurrentLine(self))) {
			e.preventDefault();
			e.stopPropagation();
			e.cancelBubble = true;
			e.returnValue = false;
			switch (e.keyCode) {
			case 37:
				// left
				if (e.shiftKey) self.firstPage(self);
				else self.prevPage(self);
				break;

			case 38:
				// up
				self.prop.key_select = true;
				self.prevLine(self);
				break;

			case 39:
				// right
				if (e.shiftKey) self.lastPage(self);
				else self.nextPage(self);
				break;

			case 40:
				// down
				if (self.elem.results.children('li').length) {
					self.prop.key_select = true;
					self.nextLine(self);
				} else self.suggest(self);
				break;

			case 9:
				// tab
				self.prop.key_paging = true;
				self.selectCurrentLine(self, true);
				//self.hideResults(self);
				break;

			case 13:
				// return
				self.selectCurrentLine(self, true);
				break;

			case 27:
				//  escape
				self.prop.key_paging = true;
				self.hideResults(self);
				break;
			}
		}
	};

	/**
	 * Abort Ajax request
	 * @param {Object} self
	 */
	SelectPage.prototype.abortAjax = function(self) {
		if (self.prop.xhr) {
			self.prop.xhr.abort();
			self.prop.xhr = false;
		}
	};

	/**
	 * @desc 数据查询
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.suggest = function(self) {
		//搜索关键字
		var q_word, val = $.trim(self.elem.combo_input.val());
        if(self.option.multiple) q_word = val;
        else{
            if(val && val === self.prop.selected_text) q_word = '';
            else q_word = val;
        }
		q_word = q_word.split(/[\s　]+/);
		self.abortAjax(self);
		//self.setLoading(self);
		var which_page_num = self.prop.current_page > 0 ? self.prop.current_page : 1;
		
		// 数据查询
		if (typeof self.option.data == 'object') self.searchForJson(self, q_word, which_page_num);
		else self.searchForDb(self, q_word, which_page_num);
	};

	/**
	 * Loading
	 * @param {Object} self
	 */
	SelectPage.prototype.setLoading = function(self) {
		if (self.elem.results.html() === '') {
			//self.calcResultsSize(self);
			self.setOpenStatus(self, true);
		}
	};

	/**
	 * Search for json data source
	 * @param {Object} self
	 * @param {Array} q_word - query keyword
	 * @param {number} which_page_num - target page number
	 */
	SelectPage.prototype.searchForDb = function(self, q_word, which_page_num) {
	    var p = self.option;
		if(!p.eAjaxSuccess || !$.isFunction(p.eAjaxSuccess)) self.hideResults(self);
		var _paramsFunc = p.params, _params = {}, searchKey = p.searchField;
		//when have query keyword, then reset page number to 1.
		if(q_word.length && q_word[0] && q_word[0] !== self.prop.prev_value) which_page_num = 1;
		var _orgParams = {
			q_word: q_word,
			pageNumber: which_page_num,
			pageSize: p.pageSize,
			andOr: p.andOr,
			orderBy: p.orderBy,
			searchTable: p.dbTable,
            searchKey: q_word[0]
		};
		if (_paramsFunc && $.isFunction(_paramsFunc)) {
			var result = _paramsFunc(self);
			if (result && $.isPlainObject(result)) {
				_params = $.extend({},_orgParams, result);
			} else _params = _orgParams;
		} else _params = _orgParams;
		self.prop.xhr = $.ajax({
			dataType: 'json',
			url: p.data,
			type: 'POST',
			data: _params,
			success: function(returnData) {
				if (!returnData || !$.isPlainObject(returnData)) {
					self.hideResults(self);
					self.ajaxErrorNotify(self, errorThrown);
					return;
				}
				var data = p.eAjaxSuccess(returnData, self), json = {};
				json.originalResult = data.list;
				json.cnt_whole = data.totalRow;

				json.candidate = [];
				json.keyField = [];
				if (typeof json.originalResult != 'object') {
					self.prop.xhr = null;
					self.notFoundSearch(self);
					return;
				}
				json.cnt_page = json.originalResult.length;
				for (var i = 0; i < json.cnt_page; i++) {
					for (var key in json.originalResult[i]) {
						if (key == p.keyField) {
							json.keyField.push(json.originalResult[i][key]);
						}
						if (key == p.showField) {
							json.candidate.push(json.originalResult[i][key]);
						}
					}
				}
				self.prepareResults(self, json, q_word, which_page_num);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				if (textStatus != 'abort') {
					self.hideResults(self);
					self.ajaxErrorNotify(self, errorThrown);
				}
			},
			complete: function() {
				self.prop.xhr = null;
			}
		});
	};

	/**
	 * Search for ajax
	 * @param {Object} self
	 * @param {Array} q_word
	 * @param {number} which_page_num
	 */
	SelectPage.prototype.searchForJson = function(self, q_word, which_page_num) {
		var p = self.option, matched = [], esc_q = [], sorted = [], json = {}, i = 0, arr_reg = [];
		
		//query keyword filter
		do {
			//'/\W/g'正则代表全部不是字母，数字，下划线，汉字的字符
			//将非法字符进行转义
			esc_q[i] = q_word[i].replace(/\W/g, '\\$&').toString();
			arr_reg[i] = new RegExp(esc_q[i], 'gi');
			i++;
		} while ( i < q_word.length );

		// SELECT * FROM data WHERE field LIKE q_word;
		for (i = 0; i < p.data.length; i++) {
			var flag = false, row = p.data[i], itemText;
			for (var j = 0; j < arr_reg.length; j++) {					
				itemText = row[p.showField];//默认获取showField字段的文本
				if(p.formatItem && $.isFunction(p.formatItem))
					itemText = p.formatItem(row);
				if (itemText.match(arr_reg[j])) {
					flag = true;
					if (p.andOr == 'OR') break;
				} else {
					flag = false;
					if (p.andOr == 'AND') break;
				}
			}
			if (flag) matched.push(row);
		}
		
		// (CASE WHEN ...) then く order some column
		var reg1 = new RegExp('^' + esc_q[0] + '$', 'gi'),
            reg2 = new RegExp('^' + esc_q[0], 'gi'),
            matched1 = [], matched2 = [], matched3 = [];
		for (i = 0; i < matched.length; i++) {
		    var orderField = p.orderBy[0][0];
            var orderValue = String(matched[i][orderField]);
			if (orderValue.match(reg1)) {
				matched1.push(matched[i]);
			} else if (orderValue.match(reg2)) {
				matched2.push(matched[i]);
			} else {
				matched3.push(matched[i]);
			}
		}

		if (p.orderBy[0][1].match(/^asc$/i)) {
			matched1 = self.sortAsc(self, matched1);
			matched2 = self.sortAsc(self, matched2);
			matched3 = self.sortAsc(self, matched3);
		} else {
			matched1 = self.sortDesc(self, matched1);
			matched2 = self.sortDesc(self, matched2);
			matched3 = self.sortDesc(self, matched3);
		}
		sorted = sorted.concat(matched1).concat(matched2).concat(matched3);

        /*
        if (sorted.length === undefined || sorted.length === 0 ) {
            self.notFoundSearch(self);
            return;
        }
        */
        json.cnt_whole = sorted.length;
		//page_move参数用于区别数据加载是在初始化列表还是在进行分页的翻页操作
		if(!self.prop.page_move){
			//仅单选模式进行选中项目定位页功能
			if(!p.multiple){
				//若控件当前已有选中值，则获得该项目所在的页数，并跳转到该页进行显示
				var currentValue = self.elem.hidden.val();
				if($.type(currentValue) !== 'undefined' && $.trim(currentValue) !== ''){
					var index = 0;
					$.each(sorted,function(i,row){
						if(row[p.keyField] == currentValue){
							index = i + 1;
							return false;
						}
					});
					which_page_num = Math.ceil(index / p.pageSize);
					if(which_page_num < 1) which_page_num = 1;
					self.prop.current_page = which_page_num;
				}
			}
		}else{
			//过滤后的数据个数不足一页显示的个数时，强制设置页码
			if(sorted.length <= ((which_page_num - 1) * p.pageSize)){
				which_page_num = 1;
				self.prop.current_page = 1;
			}
		}
		
		// LIMIT xx OFFSET xx
		var start = (which_page_num - 1) * p.pageSize, end = start + p.pageSize;
		//save original data
		json.originalResult = [];
		// after data filter handle
		for (i = start; i < end; i++) {
			if (sorted[i] === undefined) break;
			json.originalResult.push(sorted[i]);
			for (var key in sorted[i]) {
				if (key == p.keyField) {
					if (json.keyField === undefined) json.keyField = [];
					json.keyField.push(sorted[i][key]);
				}
				if (key == p.showField) {
					if (json.candidate === undefined) json.candidate = [];
					json.candidate.push(sorted[i][key]);
				}
			}
		}

		if (json.candidate === undefined) json.candidate = [];
		json.cnt_page = json.candidate.length;
		self.prepareResults(self, json, q_word, which_page_num);
	};

	/**
	 * @desc 升序排序
	 * @param {Object} self - 插件内部对象
	 * @param {Array} arr - 结果集数组
	 */
	SelectPage.prototype.sortAsc = function(self, arr) {
		arr.sort(function(a, b) {
		    var valA = a[self.option.orderBy[0][0]], valB = b[self.option.orderBy[0][0]];
            return $.type(valA) === 'number' ? valA - valB : String(valA).localeCompare(String(valB));
		});
		return arr;
	};

	/**
	 * @desc 降序排序
	 * @param {Object} self - 插件内部对象
	 * @param {Array} arr - 结果集数组
	 */
	SelectPage.prototype.sortDesc = function(self, arr) {
		arr.sort(function(a, b) {
            var valA = a[self.option.orderBy[0][0]], valB = b[self.option.orderBy[0][0]];
            return $.type(valA) === 'number' ? valB - valA : String(valB).localeCompare(String(valA));
		});
		return arr;
	};

	/**
	 * @desc 查询无结果的处理
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.notFoundSearch = function(self) {
		self.elem.results.empty();
		self.calcResultsSize(self);
		self.setOpenStatus(self, true);
		self.setCssFocusedInput(self);
	};

	/**
	 * Prepare data to show
	 * @param {Object} self
	 * @param {Object} json - data result
	 * @param {Array} q_word - query keyword
	 * @param {number} which_page_num - target page number
	 */
	SelectPage.prototype.prepareResults = function(self, json, q_word, which_page_num) {
		if(self.option.pagination) self.setNavi(self, json.cnt_whole, json.cnt_page, which_page_num);

		if (!json.keyField) json.keyField = false;

		if (self.option.selectOnly && json.candidate.length === 1 && json.candidate[0] == q_word[0]) {
			self.elem.hidden.val(json.keyField[0]);
			this.setButtonAttrDefault();
		}
		var is_query = false;
		if (q_word && q_word.length && q_word[0]) is_query = true;
		self.displayResults(self, json, is_query);
	};

	/**
	 * Build page bar
	 * @param {Object} self
	 * @param {number} cnt_whole - total record count
	 * @param {number} cnt_page
	 * @param {number} page_num - current page number
	 */
	SelectPage.prototype.setNavi = function(self, cnt_whole, cnt_page, page_num) {
		/**
		 * build bar
		 */
		var buildPageNav = function(self, pagebar, page_num, last_page) {
			if (pagebar.find('li').size() === 0) {
				pagebar.hide().empty();
				var btnclass = '',
                    iconFist='iconfont if-first',
                    iconPrev='iconfont if-previous',
                    iconNext='iconfont if-next',
                    iconLast='iconfont if-last';

				if (page_num == 1) btnclass = ' disabled ';
				pagebar.append('<li class="csFirstPage' + btnclass + '" title="' + self.message.first_title + '" ><a href="javascript:void(0);"> <i class="'+iconFist+'"></i> </a></li>');
				pagebar.append('<li class="csPreviousPage' + btnclass + '" title="' + self.message.prev_title + '" ><a href="javascript:void(0);"><i class="'+iconPrev+'"></i></a></li>');
				var pageInfo = '第 ' + page_num + ' 页 ( 共' + last_page + '页 ) ';
				//pagination information
				pagebar.append('<li class="pageInfoBox"><a href="javascript:void(0);"> ' + pageInfo + ' </a></li>');

				btnclass = page_num === last_page ? ' disabled ' : '';

				pagebar.append('<li class="csNextPage' + btnclass + '" title="' + self.message.next_title + '" ><a href="javascript:void(0);"><i class="'+iconNext+'"></i></a></li>');
				pagebar.append('<li class="csLastPage' + btnclass + '" title="' + self.message.last_title + '" ><a href="javascript:void(0);"> <i class="'+iconLast+'"></i> </a></li>');
                pagebar.show();
			}
		};

		var pagebar = self.elem.navi.find('ul'),
            last_page = Math.ceil(cnt_whole / self.option.pageSize); //calculate total page
		if(last_page === 0) page_num = 0;
		else{
			if(last_page < page_num) page_num = last_page;
			else if(page_num === 0) page_num = 1;
		}
		self.prop.current_page = page_num;//update current page number
        self.prop.max_page = last_page;//update page count
		buildPageNav(self, pagebar, page_num, last_page);
		var pageInfoBox = pagebar.find('li.pageInfoBox'),
            pageInfo = '第 ' + page_num + ' 页(共' + last_page + '页)';

		pageInfoBox.html('<a href="javascript:void(0);"> ' + pageInfo + ' </a>');
		//update paging status
		var dClass = 'disabled',
            first = pagebar.find('li.csFirstPage'),
            previous = pagebar.find('li.csPreviousPage'),
            next = pagebar.find('li.csNextPage'),
            last = pagebar.find('li.csLastPage');
		//first and previous
		if (page_num === 1 || page_num === 0) {
			if (!first.hasClass(dClass)) first.addClass(dClass);
			if (!previous.hasClass(dClass)) previous.addClass(dClass);
		} else {
			if (first.hasClass(dClass)) first.removeClass(dClass);
			if (previous.hasClass(dClass)) previous.removeClass(dClass);
		}
		//next and last
		if (page_num === last_page || last_page === 0) {
			if (!next.hasClass(dClass)) next.addClass(dClass);
			if (!last.hasClass(dClass)) last.addClass(dClass);
		} else {
			if (next.hasClass(dClass)) next.removeClass(dClass);
			if (last.hasClass(dClass)) last.removeClass(dClass);
		}

		if (last_page > 1) self.ePaging(); //pagination event bind
	};

	/**
	 * Render result list
	 * @param {Object} self
	 * @param {Object} json - result data
	 * @param {boolean} is_query - 是否是通过关键字搜索（用于区分是鼠标点击下拉还是输入框输入关键字进行查找）
	 */
	SelectPage.prototype.displayResults = function(self, json, is_query) {
	    var p = self.option, el = self.elem;
		el.results.hide().empty();
		if(p.multiple && $.type(p.maxSelectLimit) === 'number' && p.maxSelectLimit > 0){
			var selectedSize = el.element_box.find('li.selected_tag').size();
			if(selectedSize > 0 && selectedSize >= p.maxSelectLimit){
				self.showMessage(self,'最多只能选择 '+p.maxSelectLimit+' 个项目');
				return;
			}
		}

		if(json.candidate.length){
            var arr_candidate = json.candidate,
                arr_primary_key = json.keyField,
                keystr = el.hidden.val(),
                keyArr = keystr ? keystr.split(',') : new Array(),
                itemText = '';
            for (var i = 0; i < arr_candidate.length; i++) {
                if(p.formatItem && $.isFunction(p.formatItem)){
                    try {
                        itemText = p.formatItem(json.originalResult[i]);
                    } catch (e) {
                        console.error('formatItem内容格式化函数内容设置不正确！');
                        itemText = arr_candidate[i];
                    }
                }else itemText = arr_candidate[i];
                var list = $('<li>').html(itemText).attr({
                    pkey: arr_primary_key[i],
                    title: itemText
                });

                //Set selected item highlight
                if ($.inArray(arr_primary_key[i].toString(),keyArr) !== -1) {
                    list.addClass(self.css_class.selected);
                }
                //cache item data
                list.data('dataObj',json.originalResult[i]);
                el.results.append(list);
            }
        }else{
		    var li = '<li class="sp_message_box"><i class="iconfont if-warning"></i> ' + self.message.not_found + '</li>';
            el.results.append(li);
        }
        el.results.show();

        if(p.multiple && p.multipleControlbar) el.control.show();
		if(p.pagination) el.navi.show();
		self.calcResultsSize(self);
		self.setOpenStatus(self, true);
		
		//Result item event bind
		self.eResultList();
		//scrolling listen
		self.eScroll();
		//若是键盘输入关键字进行查询且有内容时，列表自动选中第一行(autoSelectFirst为true时)
		if (is_query && json.candidate.length && p.autoSelectFirst) self.nextLine(self);
	};

	/**
	 * Calculate result list size and position
	 * @param {Object} self
	 */
	SelectPage.prototype.calcResultsSize = function(self) {
	    var p = self.option, el = self.elem;
	    var rePosition = function(){
            if (el.container.css('position') === 'static') {
                // position: static
                var offset = el.combo_input.offset();
                el.result_area.css({
                    top: offset.top + el.combo_input.outerHeight() + 'px',
                    left: offset.left + 'px'
                });
            } else {
                if(!p.pagination){
                    var itemHeight = el.results.find('li:first').outerHeight(true),
                        listHeight = itemHeight * p.listSize;
                    el.results.css({
                        'max-height':listHeight,
                        'overflow-y':'auto'
                    });
                }

                //在展示下拉列表时，判断默认与输入框左对齐的列表是否会超出屏幕边界，是则右对齐，否则默认左对齐
                var docWidth = $(document).width(),
                    docHeight = $(document).height(),//文档全部高度
                    viewHeight = $(window).height(),//可视区域高度
                    offset = el.container.offset(),
                    screenScrollTop = $(window).scrollTop(),
                    listWidth = el.result_area.outerWidth(),
                    //当前状态，列表并未被显示，数据未被填充，列表并未展现最终高度，所以只能使用默认一页显示10条数据的固定高度进行计算
                    listHeight = el.result_area.outerHeight(),
                    //默认方向的坐标，在多选模式下，因为外框架是DIV，所以需要向左靠一个像素
                    defaultLeft = offset.left,//p.multiple ? -1 : 0;
                    //输入框高度
                    inputHeight = el.container.outerHeight(),
                    left = (offset.left + listWidth) > docWidth ?
                        defaultLeft - (listWidth - el.container.outerWidth()) :
                        defaultLeft,
                    //控件在全文档范围中的实际TOP（非当前可视区域中的相对TOP）
                    screenTop = offset.top,//$(el.container).scrollTop();//offset.top - screenScrollTop;
                    top = 0,dist = 5,//设置偏移量，让列表与输入框有5px的间距
                    //列表展开后的坐标高度
                    listBottom = screenTop + inputHeight + listHeight + dist,
                    hasOverflow = docHeight > viewHeight;

                if((screenTop - screenScrollTop - dist > listHeight) &&
                    (hasOverflow && listBottom > (viewHeight + screenScrollTop)) ||
                    (!hasOverflow && listBottom > viewHeight)){
                    //open up
                    top = offset.top - listHeight - dist;
                    el.result_area.removeClass('shadowUp shadowDown').addClass('shadowUp');
                }else{
                    //open down
                    top = offset.top + (p.multiple ? el.container.outerHeight() : inputHeight);
                    el.result_area.removeClass('shadowUp shadowDown').addClass('shadowDown');
                    top += dist;
                }
                return {
                    top : top + 'px', left: left + 'px'
                };
            }
        };
        if(el.result_area.is(':visible')){
            el.result_area.css(rePosition());
        }else{
            el.result_area.show(1,function(){
                $(this).css(rePosition());
            });
        }
	};

	/**
	 * hide result list
	 * @param {Object} self
	 */
	SelectPage.prototype.hideResults = function(self) {
		if (self.prop.key_paging) {
			self.scrollWindow(self, true);
			self.prop.key_paging = false;
		}
		self.setCssFocusedInput(self);

		if (self.option.autoFillResult) {
			//self.selectCurrentLine(self, true);
		}

		self.elem.results.empty();
		self.elem.result_area.hide();
		self.setOpenStatus(self, false);
        //unbind window scroll listen
        $(window).off('scroll.SelectPage');

		self.abortAjax(self);
		self.setButtonAttrDefault();
	};

    /**
     * set plugin to disabled / enabled
     * @param self
     * @param disabled
     */
	SelectPage.prototype.disabled = function(self, disabled){
	    var p = self.option, el = self.elem;
	    if($.type(disabled) === 'undefined') return el.combo_input.prop('disabled');
	    if($.type(disabled) === 'boolean'){
            el.combo_input.prop('disabled', disabled);
            if(disabled)
                el.container.addClass(self.css_class.disabled);
            else
                el.container.removeClass(self.css_class.disabled);
        }
    };

	/**
	 * Go fist page
	 * @param {Object} self
	 */
	SelectPage.prototype.firstPage = function(self) {
		if (self.prop.current_page > 1) {
			self.prop.current_page = 1;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};

	/**
	 * Go previous page
	 * @param {Object} self
	 */
	SelectPage.prototype.prevPage = function(self) {
		if (self.prop.current_page > 1) {
			self.prop.current_page--;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};

	/**
	 * Go next page
	 * @param {Object} self
	 */
	SelectPage.prototype.nextPage = function(self) {
		if (self.prop.current_page < self.prop.max_page) {
			self.prop.current_page++;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};

	/**
	 * Go last page
	 * @param {Object} self
	 */
	SelectPage.prototype.lastPage = function(self) {
		if (self.prop.current_page < self.prop.max_page) {
			self.prop.current_page = self.prop.max_page;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};
	/**
	 * @desc 跳转到指定页
	 * @param {Object} self
	 * @param {number} page 目标页数
	 */
	SelectPage.prototype.goPage = function(self,page){
		if(typeof(page) === 'undefined') page = 1;
		if (self.prop.current_page < self.prop.max_page) {
			self.prop.current_page = page;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};
	/**
	 * @desc 操作结束后的一些收尾工作
	 */
	SelectPage.prototype.afterAction = function(self){
		self.inputResize(self);
		self.elem.combo_input.change();
		self.setCssFocusedInput(self);
		if(self.option.multiple){
			if(self.option.selectToCloseList){
				self.hideResults(self);
				self.elem.combo_input.blur();
			}else{
				self.suggest(self);
				self.elem.combo_input.focus();
			}
		}else{
			self.hideResults(self);
			self.elem.combo_input.blur();
		}
	};

	/**
	 * Select current list item
	 * @param {Object} self
	 * @param {boolean} is_enter_key
	 */
	SelectPage.prototype.selectCurrentLine = function(self, is_enter_key) {
		self.scrollWindow(self, true);

		var p = self.option, current = self.getCurrentLine(self);
		if (current) {
			if(!p.multiple){
				self.elem.combo_input.val(current.text());
				self.elem.hidden.val(current.attr('pkey'));
			}else{
				//build tags in multiple selection mode
				self.elem.combo_input.val('');
				var item = {text:current.text(),value:current.attr('pkey')};
				if(!self.isAlreadySelected(self,item)){
					self.addNewTag(self,item);
					self.tagValuesSet(self);
				}
			}

			if (p.selectOnly) self.setButtonAttrDefault();
			
			//Select item callback
			if(p.eSelect && $.isFunction(p.eSelect))
				p.eSelect(current.data('dataObj'), self);
			
			self.prop.prev_value = self.elem.combo_input.val();
			self.prop.selected_text = self.elem.combo_input.val();

			self.putClearButton();
		}
		self.afterAction(self);
	};
    /**
     * Show clear button when item selected in single selection mode
     */
	SelectPage.prototype.putClearButton = function(){
        if(!this.option.multiple && !this.elem.combo_input.prop('disabled')) this.elem.container.append(this.elem.clear_btn);
    };
	/**
	 * Select all list item
	 * @param {Object} self
	 */
	SelectPage.prototype.selectAllLine = function(self){
		var p = self.option, jsonarr = new Array();
        self.elem.results.find('li').each(function(i,row){
            var $row = $(row);
			var item = {text:$row.text(),value:$row.attr('pkey')};
			if(!self.isAlreadySelected(self,item)){
				self.addNewTag(self,item);
				self.tagValuesSet(self);
			}
			jsonarr.push($row.data('dataObj'));
			//若有最大选择数量限制，则添加最大个数后，不再添加
			if($.type(p.maxSelectLimit) === 'number' &&
                p.maxSelectLimit > 0 &&
                p.maxSelectLimit === self.elem.element_box.find('li.selected_tag').size()){
			    return false;
            }
		});
		if(p.eSelect && $.isFunction(p.eSelect))
			p.eSelect(jsonarr, self);
		self.afterAction(self);
	};
	/**
	 * Cancel select all item in current page
	 * @param {Object} self
	 */
	SelectPage.prototype.unSelectAllLine = function(self){
		var p = self.option,size = self.elem.results.find('li').size();
        self.elem.results.find('li').each(function(i,row){
			var key = $(row).attr('pkey');
			var tag = self.elem.element_box.find('li.selected_tag[itemvalue="'+key+'"]');
			self.removeTag(self,tag);
		});
		self.afterAction(self);
		if(p.eTagRemove && $.isFunction(p.eTagRemove))
			p.eTagRemove(size, self);
	};
	/**
	 * Clear all selected items
	 * @param {Object} self
	 */
	SelectPage.prototype.clearAll = function(self){
		var p = self.option, size = 0;
        if(p.multiple){
            size = self.elem.element_box.find('li.selected_tag').size();
            self.elem.element_box.find('li.selected_tag').remove();
        }
        self.elem.combo_input.val('');
		self.elem.hidden.val('');
		self.afterAction(self);
        if(!p.multiple) self.elem.clear_btn.remove();
        if(p.multiple) {
            if (p.eTagRemove && $.isFunction(p.eTagRemove))
                p.eTagRemove(size, self);
        }
	};

	/**
	 * Get current highlight item
	 * @param {Object} self
	 */
	SelectPage.prototype.getCurrentLine = function(self) {
		if (self.elem.result_area.is(':hidden')) return false;
		var obj = self.elem.results.find('li.' + self.css_class.select);
		if (obj.size()) return obj;
		else return false;
	};
	
	/**
	 * @desc 多选模式下判断当前选中项目是否已经存在已选中列表中
	 * @param {Object} self - 插件内部对象
	 * @param {Object} item - 选中行对象
	 */
	SelectPage.prototype.isAlreadySelected = function(self,item){
		var isExist = false;
		if(item.value){
			var keys = self.elem.hidden.val();
			if(keys){
				var karr = keys.split(',');
				if(karr && karr.length && $.inArray(item.value,karr) != -1) isExist = true;
			}
		}
		return isExist;
	};
	
	/**
	 * Add a new tag in multiple selection mode
	 * @param {Object} self
	 * @param {Object} item
	 */
	SelectPage.prototype.addNewTag = function(self,item){
		if(!self.option.multiple || !item) return;
		var tmp = self.template.tag.content,tag;
		tmp = tmp.replace(self.template.tag.textKey,item.text);
		tmp = tmp.replace(self.template.tag.valueKey,item.value);
		tag = $(tmp);
		if(self.elem.combo_input.prop('disabled')) tag.find('span.tag_close').hide();
		self.elem.combo_input.closest('li').before(tag);
	};
	/**
	 * Remove a tag in multiple selection mode
	 * @param {Object} self
	 * @param {Object} item
	 */
	SelectPage.prototype.removeTag = function(self,item){
		var key = $(item).attr('itemvalue');
		var keys = self.elem.hidden.val();
		//从已保存的key列表中删除该标签对应的项目
		if($.type(key)!='undefined' && keys){
			var keyarr = keys.split(','),
                index = $.inArray(key.toString(),keyarr);
			if(index != -1){
				keyarr.splice(index,1);
				self.elem.hidden.val(keyarr.toString());
			}
		}
		$(item).remove();
		self.inputResize(self);
	};
	
	/**
	 * @desc 多选模式下标签结果值放入隐藏域
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.tagValuesSet = function(self){
		if(!self.option.multiple) return;
		var tags = self.elem.element_box.find('li.selected_tag');
		if(tags && tags.size()){
			var result = new Array();
			$.each(tags,function(i,li){
				var v = $(li).attr('itemvalue');
				if($.type(v)!=='undefined') result.push(v);
			});
			if(result.length){
				self.elem.hidden.val(result.join(','));
			}
		}
	};
	
	/**
	 * @desc 多选模式下输入框根据输入内容调整输入框宽度
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.inputResize = function(self){
		if(!self.option.multiple) return;
		var width = '',
            inputLi = self.elem.combo_input.closest('li');
		//设置默认宽度
		var setDefaultSize = function(self,inputLi){
			inputLi.removeClass('full_width');
			var minimumWidth = self.elem.combo_input.val().length + 1,
                width = (minimumWidth * 0.75) + 'em';
			self.elem.combo_input.css('width', width).removeAttr('placeholder');
		};
		if(self.elem.element_box.find('li.selected_tag').size() === 0){
			if(self.elem.combo_input.attr('placeholder_bak')){
				if(!inputLi.hasClass('full_width')) inputLi.addClass('full_width');
				self.elem.combo_input.attr('placeholder',self.elem.combo_input.attr('placeholder_bak')).removeAttr('style');
			}else setDefaultSize(self,inputLi);
		}else setDefaultSize(self,inputLi);
	};

	/**
	 * Move to next line
	 * @param {Object} self
	 */
	SelectPage.prototype.nextLine = function(self) {
		var obj = self.getCurrentLine(self), idx;
		if (!obj) idx = -1;
		else {
			idx = self.elem.results.children('li').index(obj);
			obj.removeClass(self.css_class.select);
		}
		idx++;
		if (idx < self.elem.results.children('li').length) {
			var next = self.elem.results.children('li').eq(idx);
			next.addClass(self.css_class.select);
			self.setCssFocusedResults(self);
		} else self.setCssFocusedInput(self);
		self.scrollWindow(self, false);
	};

	/**
	 * @desc 选择上一行
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.prevLine = function(self) {
		var obj = self.getCurrentLine(self), idx;
		if (!obj) idx = self.elem.results.children('li').length;
		else {
			idx = self.elem.results.children('li').index(obj);
			obj.removeClass(self.css_class.select);
		}
		idx--;
		if (idx > -1) {
			var prev = self.elem.results.children('li').eq(idx);
			prev.addClass(self.css_class.select);
			self.setCssFocusedResults(self);
		} else self.setCssFocusedInput(self);
		self.scrollWindow(self, false);
	};


	/**
	 * SelectPage plugin definition
	 * @global
	 * @param option {Object} init plugin option
	 */
	function Plugin(option) {
		return this.each(function(){
			var $this = $(this),
				data = $this.data(SelectPage.dataKey),
				params = $.extend({}, defaults, $this.data(), data && data.option ,typeof option === 'object' && option);
			if(!data) $this.data(SelectPage.dataKey,(data =  new SelectPage(this,params)));
		});
	}

	/**
	 * Get plugin object
	 * @param {object} obj 
	 * @returns 
	 */
	function getPlugin(obj){
		return $(obj).closest('div.sp_container').find('input.sp_input');
	}

	/**
	 * Clear all selected item
	 */
	function ClearSelected(){
		return this.each(function(){
			var $this = getPlugin(this),
				data = $this.data(SelectPage.dataKey);
			if(data) data.clearAll(data);
		});
	}

	/**
	 * Refresh result list
	 * 使用场景：使用$().val('xxx')修改插件的选中项目ID，此时需要刷新插件在输入框中的显示文本
	 */
	function SelectedRefresh(){
		return this.each(function(){
			var $this = getPlugin(this),
				data = $this.data(SelectPage.dataKey);
			if(data && data.elem.hidden.val())
				data.setInitRecord(true);
		});
	}
	
	/**
	 * Modify plugin datasource, only work on json datasource mode
	 * @param {array} data - new datasource
	 * @example
	 * [{name:'aa',sex:1},{name:'bb',sex:0},{...}]
	 */
	function ModifyDataSource(data){
		return this.each(function(){
			if(data && $.isArray(data) && data.length){
				var $this = getPlugin(this),
					plugin = $this.data(SelectPage.dataKey);
				if(plugin){
					plugin.clearAll(plugin);
					plugin.option.data = data;
				}
			}
		});
	}

    /**
     * Get plugin disabled status or Modify plugin disabled status
     * @param disabled {boolean} set disabled status
     */
	function PluginDisabled(disabled){
	    var status = false;
        this.each(function(){
            var $this = getPlugin(this),
                plugin = $this.data(SelectPage.dataKey);
            if(plugin) {
                if($.type(disabled) !== 'undefined')
                    plugin.disabled(plugin, disabled);
                else
                    status = plugin.disabled(plugin);
            }
        });
        return status;
    }

	/**
	 * Get selected item text
	 * @returns {string}
	 */
	function GetInputText(){
		var str = '';
		this.each(function(){
			var $this = getPlugin(this),data = $this.data(SelectPage.dataKey);
			if(data) str += data.elem.combo_input.val();
		});
		return str;
	}	

	var old = $.fn.selectPage;

	$.fn.selectPage              = Plugin;
	$.fn.selectPage.Constructor = SelectPage;
	$.fn.selectPageClear         = ClearSelected;
	$.fn.selectPageRefresh       = SelectedRefresh;
	$.fn.selectPageData          = ModifyDataSource;
	$.fn.selectPageDisabled      = PluginDisabled;
	$.fn.selectPageText          = GetInputText;
	
	// SelectPage no conflict
	// =================
	$.fn.selectPage.noConflict = function () {
		$.fn.selectPage = old;
		return this;
	};
})(window.jQuery);
