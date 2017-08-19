/**
 * @summary     SelectPage
 * @desc        基于jQuery及使用Bootstrap环境开发的，下拉列表带输入快速查找及结果分页展示的多功能选择器
 * @file        selectpage.js
 * @version     2.0
 * @author      TerryZeng
 * @contact     https://terryz.github.io/
 * @license     MIT License
 * 
 * 插件的部分功能使用、借鉴了
 * jQuery Plugin: jquery.ajax-combobox
 * 作者：Yuusaku Miyazaki <toumin.m7@gmail.com>(宮崎 雄策)
 * 
 * 基本要求：
 * 插件基于Bootstrap2、3版本进行开发
 * 
 * 基本功能：
 * 可实时搜索的下拉列表
 * 对待选择的下拉项目可进行分页
 * 可使用键盘快捷分页操作
 * 使用标签的方式支持下拉项目多选
 * 
 * 修改记录：
 * 2016.04.20
 * 增加参数autoSelectFirst(是否自动选择列表中的第一项内容)
 * 解决下拉分页有初始化内容，并删除部分关键字时显示的结果集列表不足一页时，分页栏没有被生成的问题
 * 增加参数autoFillResult(是否自动填充内容)
 * 增加参数noResultClean(是否清空无匹配结果的输入关键字)
 * 2016.06.29
 * 修复分页栏鼠标点击时跳转的页数不正常的问题
 * 2016.08.04
 * 修复因宽度变化导致下拉触发按钮位置在出现下拉列表后发生偏移，原因是原控件的触发按钮是在输入框外部扩展，现已移入输入框内部
 * 2016.08.10
 * 弹出下拉列表时，若有已选中的项目，则将已选中的项目进行高亮，否则对第一行进行高亮
 * 下拉列表展开时，鼠标点击列表区域外，若当前列表已有选中项目，则直接隐藏列表；若当前列表没有默认选中项目，则使用当前高亮项目的内容进行设置
 * 2016.08.12
 * 解决控件对于原始input设置的样式(bootstrap原生提供的宽度样式)，宽度显示不正常的问题
 * 增加若设置了formatItem格式函数，则进行匹配的数据源从showField改为formatItem后的结果进行匹配
 * 2016.10
 * 增加光标进入输入框时，打开下拉列表的功能
 * 2017.01.16
 * 解决输入关键进行搜索并有匹配结果时，失去焦点后，没有自动选中第一项
 * 2017.01.19
 * 取消在输入状态时，判断到输入框里内容为空时，隐藏下拉列表的操作
 * 在展示下拉列表时，判断默认与输入框左对齐的列表是否会超出屏幕边界，是则右对齐，否则默认左对齐
 * 2017.01.20
 * 增加下拉列表展示之前判断列表的面板是否会超出底部区域，若超出则将列表向上对齐展示
 * 处理下拉列表显示一次操作显示多次的问题
 * 增加控件已有选中值时，在显示下拉列表时，直接跳转到该项目所在的页
 * 修复一些点击输入框出现下拉列表的Bug
 * 2017.03.24
 * 解决下拉分页插件向上浮动时位置不正确的问题
 * 解决下拉分页插件在已有选中值时，再次点击输入框后，打开的列表分页栏翻页功能无效的问题
 * 2017.04.21
 * 解决打开noResultClean参数，没有匹配输入关键词的项目时，列表不隐藏的问题
 * 2017.04.24
 * 解决控件在设置disabled="disabled"禁用状态时，点击向下的三角尖也可以打开列表的问题
 * 增加控件在已有选中项目时，直接删除输入框中的内容，作为清空控件内容的功能
 * 修改失去焦点的范围从document.body到document
 * 优化键盘输入捕捉的方式
 * 原列表有多页的情况下，再输入关键字，没有匹配到任何项目时，分页条的下一页，最后一页为可点击的样式，且分页信息的内容也不正确
 * 2017.05
 * 代码重构
 * 增加多项选择东西，并以标签（Tag）的形式展现在输入框中
 * 修正插件外框宽度问题
 * 修改选中事件回调的入参从key,value改为选中行的原始数据对象，以便更灵活的数据处理
 * 2017.06
 * 修复部分样式问题
 * 2017.06.13
 * 改名SelectPage
 * 2017.06.24
 * 增加Bootstrap3样式支持
 * 2017.08.08
 * 修复界面上排版内容较少时，列表会向上展示开的问题
 * 增加多选模式下的控制按钮区域，功能：“全选本页”、“取消本页”、“清空全部”
 * 修复最大宽度下超出父容器的宽度问题
 * 修复ajax模式报错的问题
 * 增加eAjaxSuccess请求成功后的数据处理回调
 * 2017.08.13
 * 代码重构
 * 修改默认样式，使用更简洁的风格
 * 增加maxSelectLimit参数，设置多选模式下最大选择个数限制
 * 增加eTagRemove回调函数，在多选模式下，移除标签时触发的回调
 * 优化错误信息展示的交互方式
 * 增加初始化选中项目时（多选模式），允许设置多个内容，例如：data-init="1,2,3,4"
 * 修复键盘操作分页部分情况下会失效的问题
 * 增加selectToCloseList参数，用于设置在多选模式下，选择项目后不关闭列表
 * 修复selectToCloseList:false状态下，键盘操作会失去焦点，操作不连贯的问题
 * 增加$.fn.selectPageClear的API，用于清空控件所有已选中的项目
 * 增加$.fn.selectPageText的API，用于获得已选择的项目文本内容
 * 增加$.fn.selectPageData的API，用于动态修改插件数据源
 * 增加$.fn.SelectedRefresh的API，用于在使用.val()的方式修改了插件的选中项目后，刷新显示在输入框中的文本内容
 * 优化控件内部对象缓存机制
 * 去除快速使用脚本b.selectpage.js
 * 初始化入口从原来的$('').bSelectPage({})修改为$('').selectPage({})
 * 重新调整参数名称
 * 修正Bootstrap3下控件宽度、高度应用的BUG
 * 2017.08.19
 * 增加为原始输入框的value属性设置初始化值，以初始化插件选中项目
 * 修复多选模式下关闭标签出错的问题
 * 修复输入查询关键字后失去焦点，再次获得焦点时，插件没有根据已存在的关键进行过滤
 * 增加inputDelay配置项目，设置ajax数据源模式下，延迟输入查询的时间，避免在单位时间内连续输入发起的连续ajax查询，单位：秒，默认值：0.5
 */
;(function($){
	"use strict";
	/**
	 * @desc 默认参数集
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
		autoSelectFirst: true,
		/**
		 * 是否自动填充内容
		 * 若有列表项目被高亮显示，在焦点离开控件后，自动设置该项为选中内容
		 * @type boolean 默认值false
		 */
		autoFillResult: true,
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
		eTagRemove : undefined
	};


	/**
	 * @global
	 * @constructor
	 * @classdesc 插件初始化
	 * @param {Object} input - 插件的初始化输入框元素。
	 * @param {Object} option - 初始化参数
	 */
	var SelectPage = function(input, option) {
		this.setOption(option);
		this.setLanguage();
		this.setCssClass();
		this.setProp();
		this.setElem(input,option);

		this.setButtonAttrDefault();
		this.setInitRecord();

		this.eDropdownButton();
		this.eInput();
		this.eWhole();
	};
	/**
	 * 插件版本号
	 */
	SelectPage.version = '2.2';
	/**
	 * 插件缓存内部对象的KEY
	 */
	SelectPage.dataKey = 'selectPageObject';
	/**
	 * 全局范围设置当前点击是否为插件自身的标识
	 */
	SelectPage.objStatusKey = 'selectPage-self-mark';
	/**
	 * 全局范围设置当前点击的selectpage的索引下标
	 */
	SelectPage.objStatusIndex = 'selectPage-self-index';
	/**
	 * @private
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

		if($.type(option.init) != 'undefined') option.initRecord = String(option.init);
		this.option = option;
	};

	/**
	 * @private
	 * @desc 字符串转换为数组
	 * @param str {string} - 字符串
	 * @return {Array} - 数组
	 */
	SelectPage.prototype.strToArray = function(str) {
		if(!str) return '';
		return str.replace(/[\s　]+/g, '').split(',');
	};

	/**
	 * @private
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
	 * @private
	 * @desc 界面文字国际化
	 */
	SelectPage.prototype.setLanguage = function() {
		var message;
		switch (this.option.lang) {
		// German
		case 'de':
			message = {
				add_btn: 'Hinzufügen-Button',
				add_title: 'Box hinzufügen',
				del_btn: 'Löschen-Button',
				del_title: 'Box löschen',
				next: 'Nächsten',
				next_title: 'Nächsten' + this.option.pageSize + ' (Pfeil-rechts)',
				prev: 'Vorherigen',
				prev_title: 'Vorherigen' + this.option.pageSize + ' (Pfeil-links)',
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
				ajax_error: 'Bei der Verbindung zum Server ist ein Fehler aufgetreten. (ajax-combobox)'
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
				next_title: 'Next' + this.option.pageSize + ' (Right key)',
				prev: 'Prev',
				prev_title: 'Prev' + this.option.pageSize + ' (Left key)',
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
				ajax_error: 'An error occurred while connecting to server. (ajax-combobox)'
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
				next_title: '下' + this.option.pageSize + ' (→)',
				prev: '上一页',
				prev_title: '上' + this.option.pageSize + ' (←)',
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
				next_title: 'Proximas ' + this.option.pageSize + ' (tecla derecha)',
				prev: 'Anterior',
				prev_title: 'Anteriores ' + this.option.pageSize + ' (tecla izquierda)',
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
				ajax_error: 'Un error ocurrió mientras conectando al servidor. (ajax-combobox)'
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
				next_title: 'Próxima ' + this.option.pageSize + ' (tecla direita)',
				prev: 'Anterior',
				prev_title: 'Anterior ' + this.option.pageSize + ' (tecla esquerda)',
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
				ajax_error: 'Um erro aconteceu enquanto conectando a servidor. (ajax-combobox)'
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
				next_title: '次の' + this.option.pageSize + '件 (右キー)',
				prev: '前へ',
				prev_title: '前の' + this.option.pageSize + '件 (左キー)',
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
				ajax_error: 'サーバとの通信でエラーが発生しました。(ajax-combobox)'
			};
			break;
		}
		this.message = message;
	};

	/**
	 * @private
	 * @desc CSS样式表名称字义
	 */
	SelectPage.prototype.setCssClass = function() {
		var css_class = {
			container: 'sp_container',
			// SelectPage最外层DIV的打开状态
			container_open: 'sp_container_open',
			re_area: 'sp_result_area',
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
			
			button: 'sp_button',
			btn_on: 'sp_btn_on',
			btn_out: 'sp_btn_out',
			input: 'sp_input'
		};
		this.css_class = css_class;
	};

	/**
	 * @private
	 * @desc 设置属性默认值
	 */
	SelectPage.prototype.setProp = function() {
		this.prop = {
			is_suggest: false,
			//当前页
			page_all: 1,
			page_suggest: 1,
			//总页数
			max_all: 1,
			max_suggest: 1,
			//正在分页状态
			is_paging: false,
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
				content : '<li class="selected_tag" itemvalue="#item_value#">#item_text#<span class="tag_close">x</span></li>',
				textKey : '#item_text#',
				valueKey : '#item_value#'
			}
		};
	};

	/**
	 * @private
	 * @desc 插件HTML结构生成
	 * @param {Object} combo_input - 输入框源对象
     * @param {Object} option - 插件参数
	 */
	SelectPage.prototype.setElem = function(combo_input,option) {
		// 1. 生成、替换DOM对象
		var elem = {};//本体
		var orgWidth = $(combo_input).outerWidth();
		//修复输入控件设置了input-block-level时，显示效果不正确的问题
		//if($(combo_input).hasClass('input-block-level')) $(elem.container).css('width','100%');
		//else $(elem.container).width($(combo_input).outerWidth());

		elem.combo_input = $(combo_input).attr({'autocomplete':'off'}).addClass(this.css_class.input).wrap('<div>'); // This "div" is "container".
		elem.container = $(elem.combo_input).parent().addClass(this.css_class.container);

		$(elem.container).width(orgWidth);

		elem.button = $('<div>').addClass(this.css_class.button);
		//bootstrap风格的向下三角箭头
		elem.dropdown = $('<span class="bs-caret"><span class="caret"></span></span>');
		
		//多选模式下带标签显示及文本输入的组合框
		elem.element_box = $('<ul>').addClass(this.css_class.element_box);
		if(option.multiple && option.multipleControlbar)
			elem.control = $('<div>').addClass(this.css_class.control_box);
		//结果集列表
		elem.result_area = $('<div>').addClass(this.css_class.re_area);
		//elem.navi        = $('<div>').addClass(this.css_class.navi);
		//使用Bootstrap分页风格
		elem.navi = $('<div>').addClass('pagination').append('<ul>');
		elem.results = $('<ul>').addClass(this.css_class.results);
		
		/**
		 * 将原输入框的Name交换到Hidden中，因为具体需要保存传递到后端的是ID，而非Title
		 */
		var namePrefix = '_text';
		//将keyField的值放入"input:hidden"
		var input_id = ($(elem.combo_input).attr('id') !== undefined) ? $(elem.combo_input).attr('id') : $(elem.combo_input).attr('name');
		var input_name = ($(elem.combo_input).attr('name') !== undefined) ? $(elem.combo_input).attr('name') : 'selectPage';
		var hidden_name = input_name,
		hidden_id = input_id;

		// CakePHP使用的措施 例:data[search][user] -> data[search][user_primary_key]
		if (input_name.match(/\]$/)) input_name = input_name.replace(/\]?$/, namePrefix);
		else input_name += namePrefix;
		if (input_id.match(/\]$/)) input_id = input_id.replace(/\]?$/, namePrefix);
		else input_id += namePrefix;

		//将输入框的Name与Hidden的Name进行交换，使得可以将项目的具体ID被保存到后端进行处理
		elem.hidden = $('<input type="hidden" class="sp_hidden" />').attr({
			name: hidden_name,
			id: hidden_id
		}).val('');
		$(elem.combo_input).attr({
			name: input_name,
			id: input_id
		});

		//若在输入框中放入了初始化值，则将它放到隐藏域中进行选中项目初始化
        //若输入框设置了初始值，同时又设置了data-init属性，那么以data-init属性为优先选择
		if(!option.initRecord){
		    if($(elem.combo_input).val()){
                option.initRecord = $(elem.combo_input).val();
                $(elem.combo_input).val('');
            }
        }else $(elem.combo_input).val('');

		// 2. DOM内容放置
		$(elem.container).append(elem.button).append(elem.result_area).append(elem.hidden);
		$(elem.button).append(elem.dropdown);
		$(elem.result_area).append(elem.results).append(elem.navi);
		
		//多选模式下的特殊处理
		if(option.multiple){
			if(option.multipleControlbar){
				$(elem.control).append('<button type="button" class="btn btn-default sp_select_all" ><i class="fa fa-check-square-o"></i> 全选本页</button>');
				$(elem.control).append('<button type="button" class="btn btn-default sp_unselect_all" ><i class="fa fa-square-o"></i> 取消本页</button>');
				$(elem.control).append('<button type="button" class="btn btn-default sp_clear_all" ><i class="fa fa-ban"></i> 清除全部</button>');
				$(elem.result_area).prepend(elem.control);
			}				
			$(elem.container).addClass('sp_container_combo');
			$(elem.combo_input).addClass('sp_combo_input').before($(elem.element_box));
			var li = $('<li>').addClass('input_box');
			$(li).append($(elem.combo_input));
			$(elem.element_box).append($(li));
			if($(elem.combo_input).attr('placeholder')) $(elem.combo_input).attr('placeholder_bak',$(elem.combo_input).attr('placeholder'));
		}

		this.elem = elem;
	};

	/**
	 * @private
	 * @desc 将控件的部分内容设置为默认状态
	 */
	SelectPage.prototype.setButtonAttrDefault = function() {
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
		$(this.elem.button).attr('title', this.message.get_all_btn);
		//按钮的title属性修改
		$(this.elem.button).attr('title', this.message.close_btn);
	};

	/**
	 * @private
	 * @desc 为插件设置初始化的选中值（若有指定的话），执行第一步，数据匹配
	 */
	SelectPage.prototype.setInitRecord = function(refresh) {
		var self = this;
		if((refresh && $(self.elem.hidden).val()) || $.type(self.option.initRecord) === 'string'){
			// 初始的KEY值放入隐藏域
			if(!refresh) $(self.elem.hidden).val(self.option.initRecord);
			//将初始值放入控件
			if (typeof self.option.data === 'object') {//json数据源模式
				var data = new Array();
				var keyarr = refresh ? $(self.elem.hidden).val().split(',') : self.option.initRecord.split(',');
				$.each(keyarr,function(index,row){
					for (var i = 0; i < self.option.data.length; i++) {
						if (self.option.data[i][self.option.keyField] == row) {
							data.push(self.option.data[i]);
							break;
						}
					}
				});
				//在单选模式下，若使用了多选模式的初始化值（“key1,key2,...”多选方式），则不进行初始化选中操作
				if(!self.option.multiple && data.length > 1) data = null;
				self.afterInit(self, data);
			} else {//ajax数据源模式
				$.ajax({
					dataType: 'json',
                    type: 'POST',
					url: self.option.data,
					data: {
						searchTable: self.option.dbTable,
						searchKey: self.option.keyField,
						searchValue: self.option.initRecord
					},
					success: function(json) {
					    var d = null;
					    if(self.option.eAjaxSuccess && $.isFunction(self.option.eAjaxSuccess))
					        d = self.option.eAjaxSuccess(json);
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
	 * @private
	 * @desc 匹配后的数据在插件中进行展示
	 * @param {Object} self - 插件的内部对象
	 * @param {Object} data - 列表数据
	 */
	SelectPage.prototype.afterInit = function(self, data) {
		if(!data) return;
		if(!$.isArray(data)) data = [data];
		
		if(self.option.multiple){//多选模式初始化
			$(self.elem.combo_input).val('');
			$.each(data,function(i,row){
				var item = {text:row[self.option.showField],value:row[self.option.keyField]};
				if(!self.isAlreadySelected(self,item)) self.addNewTag(self,item);
			});
			self.tagValuesSet(self);
			self.inputResize(self);
		}else{//单选模式初始化
			var row = data[0];
			$(self.elem.combo_input).val(row[self.option.showField]);
			$(self.elem.hidden).val(row[self.option.keyField]);
			self.prop.prev_value = row[self.option.showField];
            self.prop.selected_text = row[self.option.showField];
			if (self.option.selectOnly) {
				$(self.elem.combo_input).attr('title', self.message.select_ok).removeClass(self.css_class.select_ng).addClass(self.css_class.select_ok);
			}
		}
	};

	/**
	 * @private
	 * @desc 下拉按钮的事件处理
	 */
	SelectPage.prototype.eDropdownButton = function() {
		var self = this;
		$(self.elem.button).mouseup(function(ev) {
			if ($(self.elem.result_area).is(':hidden') && !$(self.elem.combo_input).prop('disabled')) {
				//self.prop.is_suggest = false;
				//self.checkValue(self);
				//self.suggest(self);
				$(self.elem.combo_input).focus();
			} else self.hideResults(self);
			ev.stopPropagation();
		}).mouseover(function() {
			$(self.elem.button).addClass(self.css_class.btn_on).removeClass(self.css_class.btn_out);
		}).mouseout(function() {
			$(self.elem.button).addClass(self.css_class.btn_out).removeClass(self.css_class.btn_on);
		}).mouseout(); // default: mouseout
	};

	/**
	 * @private
	 * @desc 输入框的事件绑定
	 */
	SelectPage.prototype.eInput = function() {
		var self = this;
		var showList = function(){
			self.prop.page_move = false;
			self.prop.is_suggest = false;
			self.suggest(self);
			self.setCssFocusedInput(self);
		};
		$(self.elem.combo_input).keyup(function(e) {
			self.processKey(self, e);
		}).focus(function(e) {
			//增加输入框获得焦点后，显示数据列表
			if ($(self.elem.result_area).is(':hidden')) {
				e.stopPropagation();
				self.prop.first_show = true;
				showList();
			}
		});
		if(self.option.multiple){
			if(self.option.multipleControlbar){
				//全选本页按钮
				$('.sp_select_all',self.elem.control).on('click.SelectPage',function(e){
					self.selectAllLine(self);
				});
				//取消全选本页按钮
				$('.sp_unselect_all',self.elem.control).on('click.SelectPage',function(e){
					self.unselectAllLine(self);
				});
				//清除全部按钮
				$('.sp_clear_all',self.elem.control).on('click.SelectPage',function(e){
					self.clearAll(self);
				});
			}
			$(self.elem.element_box).on('click.SelectPage',function(e){
				var srcEl = e.target || e.srcElement;
				if($(srcEl).is('ul')) $(self.elem.combo_input).focus();
			});
			//标签关闭操作
			//关闭同时需要将该标签的key从已保存的隐藏域中删除
			$(self.elem.element_box).on('click.SelectPage','span.tag_close',function(){
				var li = $(this).closest('li');
				self.removeTag(self,li);
				showList();
				if(self.option.eTagRemove && $.isFunction(self.option.eTagRemove))
					self.option.eTagRemove(1);
			});
			self.inputResize(self);
		}
	};

	/**
	 * @private
	 * @desc 插件整体的事件处理
	 */
	SelectPage.prototype.eWhole = function() {
		var self = this;
		//如果是点击了控件本身则不响应外部鼠标点击事件
		$(self.elem.container).mousedown(function() {
			var thisindex = $('div.sp_container').index(this);
			var lastindex = $(document.body).data(SelectPage.objStatusIndex);
			if(lastindex != undefined && thisindex != lastindex)
				$(document.body).data(SelectPage.objStatusKey,false);
			else
				$(document.body).data(SelectPage.objStatusKey,true);
			$(document.body).data(SelectPage.objStatusIndex,thisindex);
		});
		//控件外部的鼠标点击事件处理
		$(document).off('mousedown.selectPage').on('mousedown.selectPage',function(e) {
			if ($(document.body).data(SelectPage.objStatusKey)) $(document.body).data(SelectPage.objStatusKey,false);
			else {
				//清除内容
				var cleanContent = function(obj){
					$(obj.elem.combo_input).val('');
					if(!obj.option.multiple) $(obj.elem.hidden).val('');
					obj.prop.selected_text = '';
				};
				//列表是打开的状态
				$('div.' + self.css_class.container + '.' + self.css_class.container_open).each(function(){
					var d = $('input.'+self.css_class.input,this).data(SelectPage.dataKey);
					
					//若控件已有选中的的项目，而文本输入框中清空了关键字，则清空控件已选中的项目
					if(!$(d.elem.combo_input).val() && $(d.elem.hidden).val() && !d.option.multiple){
						d.prop.page_all = 1;//重置当前页为1
						cleanContent(d);
						d.hideResults(d);
						return true;
					}
					//匹配项且高亮时，下拉分页控件失去焦点后，自动选择该项目
					if ($('li', $(d.elem.results)).size() > 0) {
						if(d.option.autoFillResult) {//打开自动内容填充功能
							//若已有选中项目，则直接隐藏列表
							if ($('li.sp_selected', $(d.elem.results)).size() > 0) {
								d.hideResults(d);
							}else if($('li.sp_over', $(d.elem.results)).size() > 0){
								//若控件已有选中的值，则忽略高亮的项目
								if($(d.elem.hidden).val()) d.hideResults(d);
								//若没有已选中的项目，且列表中有高亮项目时，选中当前高亮的行
								else d.selectCurrentLine(d, true);
							}else if(d.option.autoSelectFirst){
								//若控件已有选中的值，则忽略自动选择第一项的功能
								if($(d.elem.hidden).val()) d.hideResults(d);
								else{
									//对于没有选中，没有高亮的情况，若插件设置了自动选中第一项时，则选中第一项
									d.nextLine(d);
									//self.nextLine(self);
									d.selectCurrentLine(d, true);
								}
							}else d.hideResults(d);
						}else d.hideResults(d);
					} else {
						//无匹配项目时，自动清空用户输入的关键词
						if (d.option.noResultClean) cleanContent(d);
						else{
							if(!d.option.multiple) $(d.elem.hidden).val('');
						}
						d.hideResults(d);
					}
				});
			}
		});
	};

	/**
	 * @private
	 * @desc 结果列表的事件处理
	 */
	SelectPage.prototype.eResultList = function() {
		var self = this;
		$(self.elem.results).children('li').mouseover(function() {
			if (self.prop.key_select) {
				self.prop.key_select = false;
				return;
			}

			$(self.elem.results).children('li').removeClass(self.css_class.select);
			$(this).addClass(self.css_class.select);
			self.setCssFocusedResults(self);
		}).click(function(e) {
			if (self.prop.key_select) {
				self.prop.key_select = false;
				return;
			}
			e.preventDefault();
			e.stopPropagation();
			self.selectCurrentLine(self, false);
		});
	};

	/**
	 * @private
	 * @desc 分页导航按钮的事件处理
	 */
	SelectPage.prototype.ehNaviPaging = function() {
		var self = this;
		$('li.csFirstPage', $(self.elem.navi)).off('click').on('click',function(ev) {
			$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.firstPage(self);
		});

		$('li.csPreviousPage', $(self.elem.navi)).off('click').on('click',function(ev) {
			$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.prevPage(self);
		});

		$('li.csNextPage', $(self.elem.navi)).off('click').on('click',function(ev) {
			$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.nextPage(self);
		});

		$('li.csLastPage', $(self.elem.navi)).off('click').on('click',function(ev) {
			$(self.elem.combo_input).focus();
			ev.preventDefault();
			self.lastPage(self);
		});
	};

	/**
	 * @private
	 * @desc Ajax请求失败的处理
	 * @param {Object} self - 插件内部对象
	 * @param {string} errorThrown - Ajax的错误输出内容
	 */
	SelectPage.prototype.ajaxErrorNotify = function(self, errorThrown) {
		self.showMessage(self.message.ajax_error);
	};
	
	/**
	 * @desc 交互消息显示
	 * @param {Object} self - 插件内部对象
	 * @param msg {string} 需要提示的文本
	 */
	SelectPage.prototype.showMessage = function(self,msg){
		if(!msg) return;
		var msgLi = '<li class="sp_message_box"><i class="fa fa-exclamation-triangle"></i> '+msg+'</li>';
		$(self.elem.results).empty().append(msgLi);
		self.calcWidthResults(self);
		$(self.elem.container).addClass(self.css_class.container_open);
		$(self.elem.control).hide();
		$(self.elem.navi).hide();
	};

	/**
	 * @private
	 * @desc 窗口滚动处理
	 * @param {Object} self - 插件内部对象
	 * @param {boolean} enforce - 是否定位到输入框的位置
	 */
	SelectPage.prototype.scrollWindow = function(self, enforce) {
		var current_result = self.getCurrentLine(self);

		var target_top = (current_result && !enforce) ? current_result.offset().top: $(self.elem.container).offset().top;
		var target_size;

		self.prop.size_li = $(self.elem.results).children('li:first').outerHeight();
		target_size = self.prop.size_li;
		
		var client_height = $(window).height();
		var scroll_top = $(window).scrollTop();
		var scroll_bottom = scroll_top + client_height - target_size;

		// 滚动处理
		var gap;
		if ($(current_result).length) {
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
	 * @private
	 * @desc 输入框获得焦点的样式设置
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.setCssFocusedInput = function(self) {
		$(self.elem.results).addClass(self.css_class.re_off);
		$(self.elem.combo_input).removeClass(self.css_class.input_off);
	};

	/**
	 * @private
	 * @desc 设置结果列表高亮，输入框失去焦点
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.setCssFocusedResults = function(self) {
		$(self.elem.results).removeClass(self.css_class.re_off);
		$(self.elem.combo_input).addClass(self.css_class.input_off);
	};

	/**
	 * @private
	 * @desc 输入框输入值的变化监控
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.checkValue = function(self) {
		var now_value = $(self.elem.combo_input).val();
		if (now_value != self.prop.prev_value) {
			self.prop.prev_value = now_value;
			self.prop.first_show = false;

			if (self.option.selectOnly) self.setButtonAttrDefault();

			//重置页数
			self.prop.page_suggest = 1;
			self.prop.is_suggest = true;
			self.suggest(self);				
		}
	};

	/**
	 * @private
	 * @desc 文本输入框键盘事件处理
	 * @param {Object} self - 插件内部对象
	 * @param {Object} e - 事件event对象
	 */
	SelectPage.prototype.processKey = function(self, e) {
		if (($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9]) > -1 && $(self.elem.result_area).is(':visible')) || 
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
				if ($(self.elem.results).children('li').length) {
					self.prop.key_select = true;
					self.nextLine(self);
				} else {
					self.prop.is_suggest = false;
					self.suggest(self);
				}
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
		} else {
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
	};

	/**
	 * @private
	 * @desc 中断Ajax请求
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.abortAjax = function(self) {
		if (self.prop.xhr) {
			self.prop.xhr.abort();
			self.prop.xhr = false;
		}
	};

	/**
	 * @private
	 * @desc 数据查询
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.suggest = function(self) {
		//搜索关键字
		var q_word;
		
		//q_word = (self.prop.is_suggest) ? $.trim($(self.elem.combo_input).val()) : '';
		//q_word = $.trim($(self.elem.combo_input).val());
		//q_word = (self.prop.first_show) ? '' : $.trim($(self.elem.combo_input).val());
        var val = $.trim($(self.elem.combo_input).val());
        if(self.option.multiple) q_word = val;
        else{
            if(val && val === self.prop.selected_text) q_word = '';
            else q_word = val;
        }
		/*
		//取消在输入状态时，判断到输入框里内容为空时，隐藏下拉列表的操作
		if (q_word.length < 1 && self.prop.is_suggest) {
			self.hideResults(self);
			return;
		}
		*/
		q_word = q_word.split(/[\s　]+/);
		self.abortAjax(self);
		self.setLoading(self);
		if (self.prop.is_paging) {
			var obj = self.getCurrentLine(self);
			self.prop.is_paging = (obj) ? $(self.elem.results).children('li').index(obj) : -1;
		} else if (!self.prop.is_suggest) {
			self.prop.is_paging = 0;
		}
		//var which_page_num = (self.prop.is_suggest) ? self.prop.page_suggest: self.prop.page_all;
		//var which_page_num = (q_word == '' && !self.prop.page_move) ? 1 : self.prop.page_all;
		//var which_page_num = (self.prop.first_show) ? 1 : self.prop.page_all;
		var which_page_num = self.prop.page_all;
		
		// 数据查询
		if (typeof self.option.data == 'object') self.searchForJson(self, q_word, which_page_num);
		else self.searchForDb(self, q_word, which_page_num);
	};

	/**
	 * @private
	 * @desc 读取中状态显示
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.setLoading = function(self) {
		//加载中的状态提示
		if ($(self.elem.results).html() === '') {
			//self.calcWidthResults(self);
			$(self.elem.container).addClass(self.css_class.container_open);
		}
	};

	/**
	 * @private
	 * @desc 服务端数据查询
	 * @param {Object} self - 插件内部对象
	 * @param {Array} q_word - 查询关键字
	 * @param {number} which_page_num - 目标页
	 */
	SelectPage.prototype.searchForDb = function(self, q_word, which_page_num) {
		if(!self.option.eAjaxSuccess && $.isFunction(self.option.eAjaxSuccess)) self.hideResults(self);
		/**
		 * 增加自定义查询参数
		 */
		var _paramsFunc = self.option.params;
		var _params = {};			
		//原始参数
		var searchKey = self.option.searchField;
		//若有查询关键字，则重置当前页码为1
		if(q_word.length > 0 && q_word[0]) which_page_num = 1;
		var _orgParams = {
			q_word: q_word,
			pageNumber: which_page_num,
			pageSize: self.option.pageSize,
			andOr: self.option.andOr,
			orderBy: self.option.orderBy,
			searchTable: self.option.dbTable
		};
		_orgParams[searchKey] = q_word[0];
		if (_paramsFunc && $.isFunction(_paramsFunc)) {
			var result = _paramsFunc();
			if (result && $.isPlainObject(result)) {
				_params = $.extend({},_orgParams, result);
			} else _params = _orgParams;
		} else _params = _orgParams;
		//增加自定义查询参数End
		self.prop.xhr = $.ajax({
			dataType: 'json',
			url: self.option.data,
			type: 'POST',
			data: _params,
			success: function(returnData) {
				if (!returnData || !$.isPlainObject(returnData)) {
					self.hideResults(self);
					self.ajaxErrorNotify(self, errorThrown);
					return;
				}
				var data;
				if(self.option.eAjaxSuccess && $.isFunction(self.option.eAjaxSuccess)){
					data = self.option.eAjaxSuccess(returnData);
				}else{
					data = returnData;
				}
				
				//数据结构处理
				var json = {};
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
						if (key == self.option.keyField) {
							json.keyField.push(json.originalResult[i][key]);
						}
						if (key == self.option.showField) {
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
	 * @private
	 * @desc 对JSON源数据进行搜索
	 * @param {Object} self - 插件内部对象
	 * @param {Array} q_word - 搜索关键字
	 * @param {number} which_page_num - 目标页数
	 */
	SelectPage.prototype.searchForJson = function(self, q_word, which_page_num) {
		var matched = [];
		var esc_q = [];
		var sorted = [];
		var json = {};
		var i = 0;
		var arr_reg = [];
		
		//查询条件过滤
		do {
			//'/\W/g'正则代表全部不是字母，数字，下划线，汉字的字符
			//将非法字符进行转义
			esc_q[i] = q_word[i].replace(/\W/g, '\\$&').toString();
			arr_reg[i] = new RegExp(esc_q[i], 'gi');
			i++;
		} while ( i < q_word.length );

		// SELECT * FROM data WHERE field LIKE q_word;
		for (i = 0; i < self.option.data.length; i++) {
			var flag = false;
			var row = self.option.data[i];
			for (var j = 0; j < arr_reg.length; j++) {					
				var itemText = row[self.option.showField];//默认获取showField字段的文本
				if(self.option.formatItem && $.isFunction(self.option.formatItem))
					itemText = self.option.formatItem(row);
				if (itemText.match(arr_reg[j])) {
					flag = true;
					if (self.option.andOr == 'OR') break;
				} else {
					flag = false;
					if (self.option.andOr == 'AND') break;
				}
			}
			if (flag) matched.push(row);
		}
		
		//若没有匹配项目，则结束搜索
		if (matched.length === undefined) {
			self.notFoundSearch(self);
			return;
		}
		json.cnt_whole = matched.length;

		// (CASE WHEN ...) 然后 く order 指定列
		var reg1 = new RegExp('^' + esc_q[0] + '$', 'gi');
		var reg2 = new RegExp('^' + esc_q[0], 'gi');
		var matched1 = [];
		var matched2 = [];
		var matched3 = [];
		for (i = 0; i < matched.length; i++) {
		    var orderField = self.option.orderBy[0][0];
            var orderValue = String(matched[i][orderField]);
			if (orderValue.match(reg1)) {
				matched1.push(matched[i]);
			} else if (orderValue.match(reg2)) {
				matched2.push(matched[i]);
			} else {
				matched3.push(matched[i]);
			}
		}

		if (self.option.orderBy[0][1].match(/^asc$/i)) {
			matched1 = self.sortAsc(self, matched1);
			matched2 = self.sortAsc(self, matched2);
			matched3 = self.sortAsc(self, matched3);
		} else {
			matched1 = self.sortDesc(self, matched1);
			matched2 = self.sortDesc(self, matched2);
			matched3 = self.sortDesc(self, matched3);
		}
		sorted = sorted.concat(matched1).concat(matched2).concat(matched3);
		
		//page_move参数用于区别数据加载是在初始化列表还是在进行分页的翻页操作
		if(!self.prop.page_move){
			//仅单选模式进行选中项目定位页功能
			if(!self.option.multiple){
				//若控件当前已有选中值，则获得该项目所在的页数，并跳转到该页进行显示
				var currentValue = $(self.elem.hidden).val();
				if(typeof(currentValue) != 'undefined' && $.trim(currentValue) != ''){
					var index = 0;
					$.each(sorted,function(i,row){
						if(row[self.option.keyField] == currentValue){
							index = i + 1;
							return false;
						}
					});
					which_page_num = Math.ceil(index / self.option.pageSize);
					if(which_page_num < 1) which_page_num = 1;
					self.prop.page_all = which_page_num;
				}
			}
		}else{
			//过滤后的数据个数不足一页显示的个数时，强制设置页码
			if(sorted.length <= ((which_page_num - 1) * self.option.pageSize)){
				which_page_num = 1;
				self.prop.page_all = 1;
			}
		}
		
		// LIMIT xx OFFSET xx
		var start = (which_page_num - 1) * self.option.pageSize;
		var end = start + self.option.pageSize;
		//储存原始行数据，包括所有属性
		json.originalResult = [];
		
		// 查询后的数据处理
		for (i = start; i < end; i++) {
			if (sorted[i] === undefined) break;
			json.originalResult.push(sorted[i]);
			for (var key in sorted[i]) {
				if (key == self.option.keyField) {
					if (json.keyField === undefined) json.keyField = [];
					json.keyField.push(sorted[i][key]);
				}
				if (key == self.option.showField) {
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
	 * @private
	 * @desc 升序排序
	 * @param {Object} self - 插件内部对象
	 * @param {Array} arr - 结果集数组
	 */
	SelectPage.prototype.sortAsc = function(self, arr) {
		arr.sort(function(a, b) {
		    var valA = a[self.option.orderBy[0][0]];
		    var valB = b[self.option.orderBy[0][0]];
            return $.type(valA) === 'number' ? valA - valB : String(valA).localeCompare(String(valB));
		});
		return arr;
	};

	/**
	 * @private
	 * @desc 降序排序
	 * @param {Object} self - 插件内部对象
	 * @param {Array} arr - 结果集数组
	 */
	SelectPage.prototype.sortDesc = function(self, arr) {
		arr.sort(function(a, b) {
            var valA = a[self.option.orderBy[0][0]];
            var valB = b[self.option.orderBy[0][0]];
            return $.type(valA) === 'number' ? valB - valA : String(valB).localeCompare(String(valA));
		});
		return arr;
	};

	/**
	 * @private
	 * @desc 查询无结果的处理
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.notFoundSearch = function(self) {
		$(self.elem.results).empty();
		self.calcWidthResults(self);
		$(self.elem.container).addClass(self.css_class.container_open);
		self.setCssFocusedInput(self);
	};

	/**
	 * @private
	 * @desc 查询结果处理
	 * @param {Object} self - 插件内部对象
	 * @param {Object} json - 数据结果
	 * @param {Array} q_word - 查询关键字
	 * @param {number} which_page_num - 目标页
	 */
	SelectPage.prototype.prepareResults = function(self, json, q_word, which_page_num) {
		//处理分页栏
		self.setNavi(self, json.cnt_whole, json.cnt_page, which_page_num);

		if (!json.keyField) json.keyField = false;

		//仅选择模式
		if (self.option.selectOnly && json.candidate.length === 1 && json.candidate[0] == q_word[0]) {
			$(self.elem.hidden).val(json.keyField[0]);
			this.setButtonAttrDefault();
		}
		//是否是输入关键词进行查找
		var is_query = false;
		if (q_word && q_word.length > 0 && q_word[0]) is_query = true;
		//显示结果列表
		self.displayResults(self, json, is_query);
		/*
		if (self.prop.is_paging === false) self.setCssFocusedInput(self);
		else {
			//修复单选模式下如果有选择项，则高亮选中项，而不是高亮第一项
			if(!self.option.multiple){
				var liSelected = $('li.sp_selected', $(self.elem.results));
				if ($(liSelected).size() === 0) {
					var idx = self.prop.is_paging;
					alert(idx);
					var limit = $(self.elem.results).children('li').length - 1;
					if (idx > limit) idx = limit;
					var obj = $(self.elem.results).children('li').eq(idx);
					$(obj).addClass(self.css_class.select);
				} else $(liSelected).addClass(self.css_class.select);
			}

			self.prop.is_paging = false; //重置参数，为下次做准备
			self.setCssFocusedResults(self);
		}
		*/
	};

	/**
	 * @private
	 * @desc 生成分页栏
	 * @param {Object} self - 插件内部对象
	 * @param {number} cnt_whole - 数据总条数
	 * @param {number} cnt_page - 页面显示记录数
	 * @param {number} page_num - 当前页数
	 */
	SelectPage.prototype.setNavi = function(self, cnt_whole, cnt_page, page_num) {
		/**
		 * 生成分页条
		 */
		var buildPageNav = function(self, pagebar, page_num, last_page) {
			if ($('li', $(pagebar)).size() == 0) {
				$(pagebar).empty();
				//处理当当前页码为1时，首页和上一页按钮不允许点击
				var btnclass = '',isNewFontAwesome = true;
				//判断是否使用了font-awesome3.2.1
				$.each(document.styleSheets,function(i,n){
					if(n && n.href && n.href.indexOf('font-awesome-3.2.1') != -1){
						isNewFontAwesome = false;
						return false;
					}
				});
				//为不同版本图标设置样式
				var iconFist='fa fa-angle-double-left',iconPrev='fa fa-angle-left',iconNext='fa fa-angle-right',iconLast='fa fa-angle-double-right';
				if(!isNewFontAwesome){
					iconFist='icon-step-backward';
					iconPrev='icon-backward';
					iconNext='icon-forward';
					iconLast='icon-step-forward';
				}
				
				if (page_num == 1) btnclass = ' disabled ';
				//首页
				$(pagebar).append('<li class="csFirstPage' + btnclass + '" title="' + self.message.first_title + '" ><a href="javascript:void(0);"> <i class="'+iconFist+'"></i> </a></li>');
				//上一页
				$(pagebar).append('<li class="csPreviousPage' + btnclass + '" title="' + self.message.prev_title + '" ><a href="javascript:void(0);"><i class="'+iconPrev+'"></i></a></li>');
				var pageInfo = '第 ' + page_num + ' 页(共' + last_page + '页)';
				//设置分页信息
				$(pagebar).append('<li class="pageInfoBox"><a href="javascript:void(0);"> ' + pageInfo + ' </a></li>');

				if (page_num == last_page) btnclass = ' disabled ';
				else btnclass = '';
				//首页
				$(pagebar).append('<li class="csNextPage' + btnclass + '" title="' + self.message.next_title + '" ><a href="javascript:void(0);"><i class="'+iconNext+'"></i></a></li>');
				//上一页
				$(pagebar).append('<li class="csLastPage' + btnclass + '" title="' + self.message.last_title + '" ><a href="javascript:void(0);"> <i class="'+iconLast+'"></i> </a></li>');
			}
		};

		var pagebar = $('ul', $(self.elem.navi));
		var last_page = Math.ceil(cnt_whole / self.option.pageSize); //计算总页数
		if(last_page == 0) page_num = 0;
		else{
			if(last_page < page_num) page_num = last_page;
			else if(page_num==0) page_num = 1;
		}
		buildPageNav(self, pagebar, page_num, last_page);
		//刷新分页信息
		var pageInfoBox = $('li.pageInfoBox', $(pagebar));
		
		var pageInfo = '第 ' + page_num + ' 页(共' + last_page + '页)';
		$(pageInfoBox).html('<a href="javascript:void(0);"> ' + pageInfo + ' </a>');
		//更新分页样式
		var dClass = 'disabled';
		var first = $('li.csFirstPage', $(pagebar));
		var previous = $('li.csPreviousPage', $(pagebar));
		var next = $('li.csNextPage', $(pagebar));
		var last = $('li.csLastPage', $(pagebar));
		//处理首页，上一页按钮样式
		if (page_num === 1 || page_num === 0) {
			if (!$(first).hasClass(dClass)) $(first).addClass(dClass);
			if (!$(previous).hasClass(dClass)) $(previous).addClass(dClass);
		} else {
			if ($(first).hasClass(dClass)) $(first).removeClass(dClass);
			if ($(previous).hasClass(dClass)) $(previous).removeClass(dClass);
		}
		//处理下一页，最后一页按钮的样式
		if (page_num == last_page || last_page == 0) {
			if (!$(next).hasClass(dClass)) $(next).addClass(dClass);
			if (!$(last).hasClass(dClass)) $(last).addClass(dClass);
		} else {
			if ($(next).hasClass(dClass)) $(next).removeClass(dClass);
			if ($(last).hasClass(dClass)) $(last).removeClass(dClass);
		}

		if (last_page > 1) {
			if (self.prop.is_suggest) self.prop.max_suggest = last_page;
			else self.prop.max_all = last_page;

			self.ehNaviPaging(); // 导航按钮的事件设置
		} else {
			//$(self.elem.navi).hide();
		}
	};

	/**
	 * @private
	 * @desc 显示结果集列表
	 * @param {Object} self - 插件内部对象
	 * @param {Object} json 源数据
	 * @param {boolean} is_query - 是否是通过关键字搜索（用于区分是鼠标点击下拉还是输入框输入关键字进行查找）
	 */
	SelectPage.prototype.displayResults = function(self, json, is_query) {
		$(self.elem.results).empty();
		if(self.option.multiple && $.type(self.option.maxSelectLimit) === 'number' && self.option.maxSelectLimit > 0){
			var selectedSize = $('li.selected_tag',self.elem.element_box).size();
			if(selectedSize > 0 && selectedSize >= self.option.maxSelectLimit){
				self.showMessage(self,'最多只能选择 '+self.option.maxSelectLimit+' 个项目');
				return;
			}
		}

		var arr_candidate = json.candidate;
		var arr_primary_key = json.keyField;
		var keystr = $(self.elem.hidden).val();
		var keyArr = keystr ? keystr.split(',') : new Array();
		for (var i = 0; i < arr_candidate.length; i++) {
			var itemText = '';
			if(self.option.formatItem && $.isFunction(self.option.formatItem)){
				try {
					itemText = self.option.formatItem(json.originalResult[i]);
				} catch (e) {
					console.error('formatItem内容格式化函数内容设置不正确！');
					itemText = arr_candidate[i];
				}					
			}else itemText = arr_candidate[i];
			//XSS対策
			var list = $('<li>').html(itemText).attr({
				pkey: arr_primary_key[i],
				title: itemText
			});

			//选中项目设置高亮样式
			if ($.inArray(arr_primary_key[i].toString(),keyArr) !== -1) {
				$(list).addClass(self.css_class.selected);
			}
			//缓存原始行对象
			$(list).data('dataObj',json.originalResult[i]);
			$(self.elem.results).append(list);
		}
		$(self.elem.control).show();
		$(self.elem.navi).show();
		//显示结果集列表并调整位置
		self.calcWidthResults(self);
		$(self.elem.container).addClass(self.css_class.container_open);
		
		//结果集列表事件绑定
		self.eResultList();
		//若是键盘输入关键字进行查询且有内容时，列表自动选中第一行(autoSelectFirst为true时)
		if (is_query && arr_candidate.length > 0 && self.option.autoSelectFirst) self.nextLine(self);
	};

	/**
	 * @private
	 * @desc 处理结果列表尺寸及位置
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.calcWidthResults = function(self) {
		$(self.elem.result_area).show(1,function(){
			if ($(self.elem.container).css('position') === 'static') {
				// position: static
				var offset = $(self.elem.combo_input).offset();
				$(self.elem.result_area).css({
					top: offset.top + $(self.elem.combo_input).outerHeight() + 'px',
					left: offset.left + 'px'
				});
			} else {
				//在展示下拉列表时，判断默认与输入框左对齐的列表是否会超出屏幕边界，是则右对齐，否则默认左对齐
				var docWidth = $(document).width();
				var docHeight = $(document).height();//文档全部高度
				var viewHeight = $(window).height();//可视区域高度
				var offset = $(self.elem.container).offset();
				var screenScrollTop = $(window).scrollTop();
				var listWidth = $(self.elem.result_area).outerWidth();
				//当前状态，列表并未被显示，数据未被填充，列表并未展现最终高度，所以只能使用默认一页显示10条数据的固定高度进行计算
				var listHeight = $(self.elem.result_area).outerHeight();
				//默认方向的坐标，在多选模式下，因为外框架是DIV，所以需要向左靠一个像素
				var defaultLeft = self.option.multiple ? -1 : 0;
				//输入框高度
				var inputHeight = $(self.elem.container).outerHeight();
				var left = (offset.left + listWidth) > docWidth ? -(listWidth - $(self.elem.container).outerWidth()) : defaultLeft;
				//控件在当前可视区域中的高度
				var screenTop = offset.top;//$(self.elem.container).scrollTop();//offset.top - screenScrollTop;
				//列表展开后的坐标高度
				var listTop = screenTop + inputHeight + listHeight;
				var hasOverflow = docHeight > viewHeight;
				var top = 0;
				if((hasOverflow && listTop > (viewHeight + screenScrollTop)) || (!hasOverflow && listTop > viewHeight)){
					//控件当前位置+控件高度+列表高度超过实际body高度
					//列表则需要向上展示
					top = -(listHeight+1);
					$(self.elem.result_area).removeClass('shadowUp shadowDown').addClass('shadowUp');
				}else{
					//列表正常向下展示
					top = self.option.multiple ? $(self.elem.container).innerHeight() + 1 : $(self.elem.container).outerHeight();
					$(self.elem.result_area).removeClass('shadowUp shadowDown').addClass('shadowDown');
				}
				$(self.elem.result_area).css({
					top : top + 'px',
					left: left + 'px'
				});
			}
		});
	};

	/**
	 * @private
	 * @desc 隐藏结果列表
	 * @param {Object} self - 插件内部对象
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

		$(self.elem.results).empty();
		$(self.elem.result_area).hide();
		$(self.elem.container).removeClass(self.css_class.container_open);

		self.abortAjax(self);
		self.setButtonAttrDefault(); // 按钮title属性初期化
	};

	/**
	 * @private
	 * @desc 跳转到首页
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.firstPage = function(self) {
		if (self.prop.page_all > 1) {
			self.prop.page_all = 1;
			self.prop.is_paging = true;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};

	/**
	 * @private
	 * @desc 跳转到上一页
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.prevPage = function(self) {
		if (self.prop.page_all > 1) {
			self.prop.page_all--;
			self.prop.is_paging = true;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};

	/**
	 * @private
	 * @desc 跳转到下一页
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.nextPage = function(self) {
		if (self.prop.page_all < self.prop.max_all) {
			self.prop.page_all++;
			self.prop.is_paging = true;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};

	/**
	 * @private
	 * @desc 跳转到尾页
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.lastPage = function(self) {
		if (self.prop.page_all < self.prop.max_all) {
			self.prop.page_all = self.prop.max_all;
			self.prop.is_paging = true;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};
	/**
	 * @private
	 * @desc 跳转到指定页
	 * @param {Object} self
	 * @param {number} page 目标页数
	 */
	SelectPage.prototype.goPage = function(self,page){
		if(typeof(page) === 'undefined') page = 1;
		if (self.prop.page_all < self.prop.max_all) {
			self.prop.page_all = page;
			self.prop.is_paging = true;
			self.prop.page_move = true;
			self.suggest(self);
		}
	};
	/**
	 * @private
	 * @desc 操作结束后的一些收尾工作
	 */
	SelectPage.prototype.afterAction = function(self){
		self.inputResize(self);
		$(self.elem.combo_input).change();
		self.setCssFocusedInput(self);
		if(self.option.multiple){
			if(self.option.selectToCloseList){
				self.hideResults(self);
				$(self.elem.combo_input).blur();
			}else{
				self.suggest(self);
				$(self.elem.combo_input).focus();
			}
		}else{
			self.hideResults(self);
			$(self.elem.combo_input).blur();
		}
	};

	/**
	 * @private
	 * @desc 选择当前行
	 * @param {Object} self - 插件内部对象
	 * @param {boolean} is_enter_key - 是否为回车键
	 */
	SelectPage.prototype.selectCurrentLine = function(self, is_enter_key) {
		self.scrollWindow(self, true);

		var current = self.getCurrentLine(self);
		if (current) {
			if(!self.option.multiple){
				$(self.elem.combo_input).val($(current).text());
				$(self.elem.hidden).val($(current).attr('pkey'));
			}else{
				//多选模式的项目选择处理
				$(self.elem.combo_input).val('');
				var item = {text:$(current).text(),value:$(current).attr('pkey')};
				if(!self.isAlreadySelected(self,item)){
					self.addNewTag(self,item);
					self.tagValuesSet(self);
				}
			}

			if (self.option.selectOnly) self.setButtonAttrDefault();
			
			//项目选择回调函数触发
			if(self.option.eSelect && $.isFunction(self.option.eSelect))
				self.option.eSelect($(current).data('dataObj'));
			
			self.prop.prev_value = $(self.elem.combo_input).val();
			self.prop.selected_text = $(self.elem.combo_input).val();
		}		
		self.afterAction(self);
	};
	/**
	 * @private
	 * @desc 全选当前页的行
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.selectAllLine = function(self){
		var jsonarr = new Array();
		$('li',self.elem.results).each(function(i,row){
			var item = {text:$(row).text(),value:$(row).attr('pkey')};
			if(!self.isAlreadySelected(self,item)){
				self.addNewTag(self,item);
				self.tagValuesSet(self);
			}
			jsonarr.push($(row).data('dataObj'));
		});
		if(self.option.eSelect && $.isFunction(self.option.eSelect))
			self.option.eSelect(jsonarr);
		self.afterAction(self);
	};
	/**
	 * @private
	 * @desc 取消选择本页全部项目
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.unselectAllLine = function(self){
		var size = $('li',self.elem.results).size();
		$('li',self.elem.results).each(function(i,row){
			var key = $(row).attr('pkey');
			var tag = $('li.selected_tag[itemvalue="'+key+'"]',self.elem.element_box);
			self.removeTag(self,tag);
		});
		self.afterAction(self);
		if(self.option.eAjaxSuccess && $.isFunction(self.option.eAjaxSuccess))
			self.option.eAjaxSuccess(size);
	};
	/**
	 * @private
	 * @desc 清除所有选中的项目
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.clearAll = function(self){
		var size = $('li.selected_tag',self.elem.element_box).size();
		$('li.selected_tag',self.elem.element_box).remove();
		$(self.elem.hidden).val('');
		self.afterAction(self);
		if(self.option.eAjaxSuccess && $.isFunction(self.option.eAjaxSuccess))
			self.option.eAjaxSuccess(size);
	};

	/**
	 * @desc 在所有状态下清除选中的项目，该function为API接口使用
	 */
	SelectPage.prototype.clearAllSelect = function(){
		var self = this;
		if(self.option.multiple){
			$('li.selected_tag',self.elem.element_box).remove();
			$(self.elem.hidden).val('');
		}else{
			$(self.elem.combo_input).val('');
			$(self.elem.hidden).val('');
		}
		if($(self.elem.result_area).is(':visible')) self.hideResults(self);
	};

	/**
	 * @private
	 * @desc 获得当前行对象
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.getCurrentLine = function(self) {
		if ($(self.elem.result_area).is(':hidden')) return false;
		var obj = $('li.' + self.css_class.select,self.elem.results);
		if ($(obj).size()) return obj;
		else return false;
	};
	
	/**
	 * @private
	 * @desc 多选模式下判断当前选中项目是否已经存在已选中列表中
	 * @param {Object} self - 插件内部对象
	 * @param {Object} item - 选中行对象
	 */
	SelectPage.prototype.isAlreadySelected = function(self,item){
		var isExist = false;
		if(item.value){
			var keys = $(self.elem.hidden).val();
			if(keys){
				var karr = keys.split(',');
				if(karr && karr.length > 0 && $.inArray(item.value,karr) != -1) isExist = true;
			}
		}
		return isExist;
	};
	
	/**
	 * @private
	 * @desc 多选模式下增加一个标签
	 * @param {Object} self - 插件内部对象
	 * @param {Object} item - 选中行对象
	 */
	SelectPage.prototype.addNewTag = function(self,item){
		if(!self.option.multiple || !item) return;
		var tmp = self.template.tag.content;
		tmp = tmp.replace(self.template.tag.textKey,item.text);
		tmp = tmp.replace(self.template.tag.valueKey,item.value);
		$(self.elem.combo_input).closest('li').before($(tmp));
	};
	/**
	 * @private
	 * @desc 多选模式下移除一个标签
	 * @param {Object} self - 插件内部对象
	 * @param {Object} item - 标签对象
	 */
	SelectPage.prototype.removeTag = function(self,item){
		var key = $(item).attr('itemvalue');
		var keys = $(self.elem.hidden).val();
		//从已保存的key列表中删除该标签对应的项目
		if($.type(key)!='undefined' && keys){
			var keyarr = keys.split(',');
			var index = $.inArray(key.toString(),keyarr);
			if(index != -1){
				keyarr.splice(index,1);
				$(self.elem.hidden).val(keyarr.toString());
			}
		}
		$(item).remove();
		self.inputResize(self);
	};
	
	/**
	 * @private
	 * @desc 多选模式下标签结果值放入隐藏域
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.tagValuesSet = function(self){
		if(!self.option.multiple) return;
		var tags = $('li.selected_tag',$(self.elem.element_box));
		if(tags && $(tags).size() > 0){
			var result = new Array();
			$.each(tags,function(i,li){
				var v = $(li).attr('itemvalue');
				if($.type(v)!=='undefined') result.push(v);
			});
			if(result.length > 0){
				$(self.elem.hidden).val(result.join(','));
			}
		}
	};
	
	/**
	 * @private
	 * @desc 多选模式下输入框根据输入内容调整输入框宽度
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.inputResize = function(self){
		if(!self.option.multiple) return;
		var width = '';
		var inputLi = self.elem.combo_input.closest('li');
		//设置默认宽度
		var setDefaultSize = function(self,inputLi){
			inputLi.removeClass('full_width');
			var minimumWidth = self.elem.combo_input.val().length + 1;
			var width = (minimumWidth * 0.75) + 'em';
			self.elem.combo_input.css('width', width);
			self.elem.combo_input.removeAttr('placeholder');
		};
		if($('li.selected_tag',$(self.elem.element_box)).size() === 0){
			if(self.elem.combo_input.attr('placeholder_bak')){
				if(!inputLi.hasClass('full_width')) inputLi.addClass('full_width');
				self.elem.combo_input.attr('placeholder',self.elem.combo_input.attr('placeholder_bak'));
				self.elem.combo_input.removeAttr('style');
			}else setDefaultSize(self,inputLi);
		}else setDefaultSize(self,inputLi);
	};

	/**
	 * @private
	 * @desc 选择下一行
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.nextLine = function(self) {
		var obj = self.getCurrentLine(self);
		var idx;
		if (!obj) idx = -1;
		else {
			idx = $(self.elem.results).children('li').index(obj);
			$(obj).removeClass(self.css_class.select);
		}
		idx++;
		if (idx < $(self.elem.results).children('li').length) {
			var next = $(self.elem.results).children('li').eq(idx);
			$(next).addClass(self.css_class.select);
			self.setCssFocusedResults(self);
		} else self.setCssFocusedInput(self);
		self.scrollWindow(self, false);
	};

	/**
	 * @private
	 * @desc 选择上一行
	 * @param {Object} self - 插件内部对象
	 */
	SelectPage.prototype.prevLine = function(self) {
		var obj = self.getCurrentLine(self);
		var idx;
		if (!obj) idx = $(self.elem.results).children('li').length;
		else {
			idx = $(self.elem.results).children('li').index(obj);
			$(obj).removeClass(self.css_class.select);
		}
		idx--;
		if (idx > -1) {
			var prev = $(self.elem.results).children('li').eq(idx);
			$(prev).addClass(self.css_class.select);
			self.setCssFocusedResults(self);
		} else self.setCssFocusedInput(self);
		self.scrollWindow(self, false);
	};


	/**
	 * @desc 下拉分页查询控件初始化入口
	 * @global
	 * @memberof jQuery,bootstrap2,bootstrap3
	 * @param option {Object} 初始化参数集
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
	 * 获得稿件内部对象
	 * @param {object} obj 
	 * @returns 
	 */
	function getPlugin(obj){
		return $(obj).siblings('input.sp_input');
	}

	/**
	 * @desc 清除所有模式下选择的项目
	 */
	function ClearSelected(){
		return this.each(function(){
			var $this = getPlugin(this),
				data = $this.data(SelectPage.dataKey);
			if(data) data.clearAllSelect();
		});
	}

	/**
	 * 刷新选中项目内容
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
	 * 修改插件数据源
	 * 仅在json数据源模式有效
	 * @param {array} data
	 * @example
	 * [{name:'aa',sex:1},{name:'bb',sex:0},{...}]
	 */
	function ModifyDataSource(data){
		return this.each(function(){
			if(data && $.isArray(data) && data.length > 0){
				var $this = getPlugin(this),
					plugin = $this.data(SelectPage.dataKey);
				if(plugin){
					plugin.clearAllSelect();
					plugin.option.data = data;
				}
			}
		});
	}

	/**
	 * @desc 获得选中项目的文本
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

	$.fn.selectPage             = Plugin;
	$.fn.selectPage.Constructor = SelectPage;
	$.fn.selectPageClear        = ClearSelected;
	$.fn.selectPageRefresh      = SelectedRefresh;
	$.fn.selectPageData         = ModifyDataSource;
	$.fn.selectPageText         = GetInputText;
	
	// 处理新旧版本冲突
	// =================
	$.fn.selectPage.noConflict = function () {
		$.fn.selectPage = old;
		return this;
	};
})(window.jQuery);