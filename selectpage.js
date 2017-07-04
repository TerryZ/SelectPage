/**
 * @file jQuery Plugin: SelectPage
 * @version 1.1
 * @author TerryZeng
 * @license MIT License
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
 * 增加参数auto_select_first(是否自动选择列表中的第一项内容)
 * 解决下拉分页有初始化内容，并删除部分关键字时显示的结果集列表不足一页时，分页栏没有被生成的问题
 * 增加参数auto_fill_result(是否自动填充内容)
 * 增加参数no_result_clean(是否清空无匹配结果的输入关键字)
 * 2016.06.29
 * 修复分页栏鼠标点击时跳转的页数不正常的问题
 * 2016.08.04
 * 修复因宽度变化导致下拉触发按钮位置在出现下拉列表后发生偏移，原因是原控件的触发按钮是在输入框外部扩展，现已移入输入框内部
 * 2016.08.10
 * 弹出下拉列表时，若有已选中的项目，则将已选中的项目进行高亮，否则对第一行进行高亮
 * 下拉列表展开时，鼠标点击列表区域外，若当前列表已有选中项目，则直接隐藏列表；若当前列表没有默认选中项目，则使用当前高亮项目的内容进行设置
 * 2016.08.12
 * 解决控件对于原始input设置的样式(bootstrap原生提供的宽度样式)，宽度显示不正常的问题
 * 增加若设置了formatItem格式函数，则进行匹配的数据源从show_field改为formatItem后的结果进行匹配
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
 * 解决打开no_result_clean参数，没有匹配输入关键词的项目时，列表不隐藏的问题
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
 */
;(function($){
	"use strict";
	/**
	 * 内部使用常量
	 */
	var constants = {
		dataKey : 'selectPageObject',                     //插件缓存内部对象的KEY
		objStatusKey : 'selectPage-self-mark',            //全局范围设置当前点击是否为插件自身的标识
		objStatusIndex : 'selectPage-self-index'          //全局范围设置当前点击的selectpage的索引下标
	};
	/**
	 * @desc 下拉分页查询控件初始化入口
	 * @global
	 * @memberof jQuery
	 * @param {string|Object} source - 数据源（String：Ajax查询的URL|Object：JSON格式的数据源）
	 * @param {Object} option - 初始化参数集
	 * 
	 * 
	 * option参数集内容
	 * @param {boolean} [option.instance] - 是否返回插件内部对象（true：返回内部对象，false：返回输入框自身）
	 * @param {string} [option.lang='cn'] - 插件显示语言 ('ja', 'en', 'es', 'pt-br'等)
	 * @param {boolean} [option.multiple] - 是否为多选模式（多选模式下，选中的项目将会以Tag标签的形式展现）
	 * @param {string} [option.db_table='tbl'] - 使用ajax方式获取数据时，使用该参数设置对应的数据表名
	 * @param {string} [option.field='name'] - 结果集中用于显示的属性名
	 * @param {string} [option.search_field=option.field] - 使用ajax作为数据源情况下的查询字段指定。 (e.g.: 'id, name, job')
	 * @param {string|Array} [option.order_by=option.search_field] - 排序字段指定，若不指定则自动使用查询字段 (e.g.: 'name DESC' or ['name ASC', 'age DESC'])
	 * @param {number} [option.per_page=10] - 每页显示的记录数
	 * @param {string} [option.init_record=false] - 插件初始值指定，该值会与option.primary_key字段进行匹配，若匹配到，则自动设置选中并高亮
	 * @param {string} [option.bind_to] - 指定事件名称，用于在选择项目后进行触发（必须已自行绑定好事件）
	 * @param {string} [option.and_or='AND'] - 查询方式 ('AND' or 'OR')
	 * @param {boolean} [option.select_only=false] - 仅选择，不能输入查询关键字
	 * @param {string} [option.primary_key='id'] - 值字段，通常该字段的内容会自动保存在隐藏域中
	 * @param {string} [option.button_img='dist/btn.png'] - 按钮样式（现已固定使用向下的三角尖，不再接受定制）
	 */
	$.fn.selectPage = function(source, option) {
		var arr = [];
		this.each(function() {
			arr.push(new SelectPage(this, source, option));
		});
		return (option !== undefined && option.instance !== undefined && option.instance) ? $(arr) : this;
	};

	/**
	 * @global
	 * @constructor
	 * @classdesc 插件初始化
	 * @param {Object} combo_input - 插件的初始化输入框元素。
	 * @param {string|Object} source - 数据来源
	 *         string：服务端请求的URL地址
	 *         Object：JSON格式数组，推荐格式：[{a:1,b:2,c:3},{...}]
	 * @param {Object} option - 初始化参数
	 */
	function SelectPage(combo_input, source, option) {
		this._setOption(source, option);
		this._setLanguage();
		this._setCssClass();
		this._setProp();
		this._setElem(combo_input,option);

		this._setButtonAttrDefault();
		this._setInitRecord();

		this._eDropdownButton();
		this._eInput();
		this._ehWhole();

		//缓存内部对象
		$(this.elem.container).data(constants.dataKey,this);
	}

	/**
	 * 内部函数定义
	 */
	$.extend(SelectPage.prototype,{
		/**
		 * @private
		 * @desc 参数初始化
		 * @param {string|Object} source - 数据源
		 * @param {Object} option - 参数集
		 */
		_setOption: function(source, option) {
			option = this._setOption1st(source, option);
			option = this._setOption2nd(option);
			this.option = option;
		},

		/**
		 * @private
		 * @desc 参数使用默认值进行初始化与合并
		 * @param {string|Object} source - 数组源（URL或JSON格式数据源）
		 * @param {Object} option - 初始化参数
		 * @return {Object} - 合并后的参数
		 */
		_setOption1st: function(source, option) {
			return $.extend({
				source: source,
				lang: 'cn',
				multiple: false,
				init_record: false,
				db_table: 'tbl',
				field: 'name',
				and_or: 'AND',
				per_page: 10,
				primary_key: 'id',
				button_img: 'dist/btn.png',
				bind_to: false,
				/**
				 * 是否在输入框获得焦点时，展开下拉窗口
				 * 默认:true
				 */
				focus_drop_list : true,
				/**
				 * 是否自动选择列表中的第一项内容(输入关键字查询模式，直接使用鼠标下拉并不触发)
				 * 默认：false
				 */
				auto_select_first: false,
				/**
				 * 是否自动填充内容
				 * 若有列表项目被高亮显示，在焦点离开控件后，自动设置该项为选中内容
				 * 默认：false
				 */
				auto_fill_result: false,
				/**
				 * 是否清空输入关键字
				 * 在输入框中输入内容进行查询，但没有匹配的内容返回，在焦点离开控件后，自动清空输入框输入的内容
				 * 默认：false
				 */
				no_result_clean: false,
				/**
				 * 列表项目显示内容格式化
				 * 参数类型：function
				 * 参数1：data，行数据object格式
				 * 返回：string
				 */
				format_item : false,

				//只选择模式
				select_only: false,
			},
			option);
		},

		/**
		 * @private
		 * @desc 参数初始化后的调整
		 * @param {Object} option - 参数集
		 * @return {Object} - 处理后的参数集
		 */
		_setOption2nd: function(option) {
			//若没有设置搜索字段，则使用显示字段作为搜索字段
			option.search_field = (option.search_field === undefined) ? option.field: option.search_field;

			//统一大写
			option.and_or = option.and_or.toUpperCase();

			var arr = ['hide_field', 'show_field', 'search_field'];
			for (var i = 0; i < arr.length; i++) {
				option[arr[i]] = this._strToArray(option[arr[i]]);
			}

			//设置排序字段
			option.order_by = (option.order_by === undefined) ? option.search_field: option.order_by;

			//设置多字段排序
			//例:  [ ['id', 'ASC'], ['name', 'DESC'] ]
			option.order_by = this._setOrderbyOption(option.order_by, option.field);
			
			return option;
		},

		/**
		 * @private
		 * @desc 字符串转换为数组
		 * @param {string} str - 字符串
		 * @return {Array} - 数组
		 */
		_strToArray: function(str) {
			if(!str) return '';
			return str.replace(/[\s　]+/g, '').split(',');
		},

		/**
		 * @private
		 * @desc 设置多字段排序
		 * @param {Array} arg_order - 排序顺序
		 * @param {string} arg_field - 字段
		 * @return {Array} - 处理后的排序字段内容
		 */
		_setOrderbyOption: function(arg_order, arg_field) {
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
		},

		/**
		 * @private
		 * @desc 界面文字国际化
		 */
		_setLanguage: function() {
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
					next_title: 'Nächsten' + this.option.per_page + ' (Pfeil-rechts)',
					prev: 'Vorherigen',
					prev_title: 'Vorherigen' + this.option.per_page + ' (Pfeil-links)',
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
					next_title: 'Next' + this.option.per_page + ' (Right key)',
					prev: 'Prev',
					prev_title: 'Prev' + this.option.per_page + ' (Left key)',
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
					next_title: '下' + this.option.per_page + ' (→)',
					prev: '上一页',
					prev_title: '上' + this.option.per_page + ' (←)',
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
					next_title: 'Proximas ' + this.option.per_page + ' (tecla derecha)',
					prev: 'Anterior',
					prev_title: 'Anteriores ' + this.option.per_page + ' (tecla izquierda)',
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
					next_title: 'Próxima ' + this.option.per_page + ' (tecla direita)',
					prev: 'Anterior',
					prev_title: 'Anterior ' + this.option.per_page + ' (tecla esquerda)',
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
					next_title: '次の' + this.option.per_page + '件 (右キー)',
					prev: '前へ',
					prev_title: '前の' + this.option.per_page + '件 (左キー)',
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
		},

		/**
		 * @private
		 * @desc CSS样式表名称字义
		 */
		_setCssClass: function() {
			var css_class = {
				container: 'sp_container',
				// SelectPage最外层DIV的打开状态
				container_open: 'sp_container_open',
				selected: 'sp_selected',
				re_area: 'sp_result_area',
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
				input_off: 'sp_input_off',
				
				button: 'sp_button',
				btn_on: 'sp_btn_on',
				btn_out: 'sp_btn_out',
				input: 'sp_input'
			};
			this.css_class = css_class;
		},

		/**
		 * @private
		 * @desc 设置属性默认值
		 */
		_setProp: function() {
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
				prev_value: ''
			};
			this.template = {
				tag : {
					content : '<li class="selected_tag" itemvalue="#item_value#">#item_text#<span class="tag_close">x</span></li>',
					textKey : '#item_text#',
					valueKey : '#item_value#'
				}
			};
		},

		/**
		 * @private
		 * @desc 插件HTML结构生成
		 * @param {Object} combo_input - 输入框源对象
		 */
		_setElem: function(combo_input,option) {
			// 1. 生成、替换DOM对象
			var elem = {};//本体
			//将原始输入框中，用户设置的样式提取，并放到最外层的容器中,'class':''
			//var srcClass = $(combo_input).attr('class');
			elem.combo_input = $(combo_input).attr({'autocomplete':'off'}).addClass(this.css_class.input).wrap('<div>'); // This "div" is "container".
			elem.container = $(elem.combo_input).parent().addClass(this.css_class.container);
			//修复输入控件设置了input-block-level时，显示效果不正确的问题
			if($(combo_input).hasClass('input-block-level')) $(elem.container).css('width','100%');
			else $(elem.container).width($(combo_input).outerWidth());
			//if(srcClass) $(elem.container).addClass(srcClass);
			
			elem.button = $('<div>').addClass(this.css_class.button);
			//elem.img    = $('<img>').attr('src', this.option.button_img);
			//更换为bootstrap风格的向下三角箭头
			elem.img = $('<span class="bs-caret"><span class="caret"></span></span>');
			
			//多选模式下带标签显示及文本输入的组合框
			elem.element_box = $('<ul>').addClass(this.css_class.element_box);
			
			//结果集列表
			elem.result_area = $('<div>').addClass(this.css_class.re_area);
			//elem.navi        = $('<div>').addClass(this.css_class.navi);
			//使用Bootstrap分页风格
			elem.navi = $('<div>').addClass('pagination').append('<ul>');
			//elem.navi_info   = $('<div>').addClass('info');
			//elem.navi_p      = $('<p>');
			elem.results = $('<ul>').addClass(this.css_class.results);
			
			
			/**
			 * 将原输入框的Name交换到Hidden中，因为具体需要保存传递到后端的是ID，而非Title
			 */
			var namePrefix = '_text';
			//将primary_key的值放入"input:hidden"
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

			// 2. DOM内容放置
			$(elem.container).append(elem.button).append(elem.result_area).append(elem.hidden);
			$(elem.button).append(elem.img);
			$(elem.result_area).append(elem.results).append(elem.navi);
			
			//多选模式下的特殊处理
			if(option.multiple){
				$(elem.container).addClass('sp_container_combo');
				$(elem.combo_input).addClass('sp_combo_input').before($(elem.element_box));
				var li = $('<li>').addClass('input_box');
				$(li).append($(elem.combo_input));
				$(elem.element_box).append($(li));
				if($(elem.combo_input).attr('placeholder')) $(elem.combo_input).attr('placeholder_bak',$(elem.combo_input).attr('placeholder'));
			}

			this.elem = elem;
		},

		/**
		 * @private
		 * @desc 将控件的部分内容设置为默认状态
		 */
		_setButtonAttrDefault: function() {
			if (this.option.select_only) {
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
			//$(this.elem.img).attr('src', this.option.button_img);
		},

		/**
		 * @private
		 * @desc 为插件设置初始化的选中值（若有指定的话）
		 */
		_setInitRecord: function() {
			var self = this;
			//初始化外框宽度
			//$(self.elem.container).width($(self.elem.combo_input).outerWidth());
			
			if (this.option.init_record === false) return;
			// 初始的KEY值放入隐藏域
			$(self.elem.hidden).val(self.option.init_record);

			//将初始值放入控件
			if (typeof self.option.source == 'object') {
				var data = new Array();
				var keyarr = self.option.init_record.split(',');
				$.each(keyarr,function(index,row){
					for (var i = 0; i < self.option.source.length; i++) {
						if (self.option.source[i][self.option.primary_key] == row) {
							data.push(self.option.source[i]);
							break;
						}
					}
				});
				//在单选模式下，若使用了多选模式的初始化值（“key1,key2,...”多选方式），则不进行初始化选中操作
				if(!self.option.multiple && data.length > 1) data = null;
				self._afterInit(self, data);
			} else {
				$.ajax({
					dataType: 'json',
					url: self.option.source,
					data: {
						db_table: self.option.db_table,
						pkey_name: self.option.primary_key,
						pkey_val: self.option.init_record
					},
					success: function(json) {
						self._afterInit(self, json);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						self._ajaxErrorNotify(self, errorThrown);
					}
				});
			}
		},

		/**
		 * @private
		 * @desc 初始化后的处理
		 * @param {Object} self - 插件的内部对象
		 * @param {Object} data - 列表数据
		 */
		_afterInit: function(self, data) {
			if(!data) return;
			if(!$.isArray(data)) data = [data];
			
			if(self.option.multiple){//多选模式初始化
				$(self.elem.combo_input).val('');
				$.each(data,function(i,row){
					var item = {text:row[self.option.field],value:row[self.option.primary_key]};
					if(!self._isAlreadySelected(self,item)) self._addNewTag(self,item);
				});
				self._tagValuesSet(self);
				self._inputResize(self);
			}else{//单选模式初始化
				var row = data[0];
				$(self.elem.combo_input).val(row[self.option.field]);
				$(self.elem.hidden).val(row[self.option.primary_key]);
				self.prop.prev_value = row[self.option.field];
				if (self.option.select_only) {
					$(self.elem.combo_input).attr('title', self.message.select_ok).removeClass(self.css_class.select_ng).addClass(self.css_class.select_ok);
				}
			}
		},

		/**
		 * @private
		 * @desc 下拉按钮的事件处理
		 */
		_eDropdownButton: function() {
			var self = this;
			
			$(self.elem.button).mouseup(function(ev) {
				if ($(self.elem.result_area).is(':hidden') && !$(self.elem.combo_input).prop('disabled')) {
					//self.prop.is_suggest = false;
					//self._checkValue(self);
					//self._suggest(self);
					$(self.elem.combo_input).focus();
				} else {
					self._hideResults(self);
				}
				ev.stopPropagation();
			}).mouseover(function() {
				$(self.elem.button).addClass(self.css_class.btn_on).removeClass(self.css_class.btn_out);
			}).mouseout(function() {
				$(self.elem.button).addClass(self.css_class.btn_out).removeClass(self.css_class.btn_on);
			}).mouseout(); // default: mouseout
		},

		/**
		 * @private
		 * @desc 输入框的事件绑定
		 */
		_eInput: function() {
			var self = this;
			$(self.elem.combo_input).keyup(function(ev) {
				self._processKey(self, ev);
			}).focus(function(e) {
				//增加输入框获得焦点后，显示数据列表
				if ($(self.elem.result_area).is(':hidden')) {
					e.stopPropagation();
					self.prop.first_show = true;
					self.prop.page_move = false;
					//self._checkValue(self);
					self.prop.is_suggest = false;
					self._suggest(self);
					//self.prop.first_show = false;
				}
			}).click(function() {
				self._setCssFocusedInput(self);
				//该句会去除当前高亮项目的显示，暂时屏蔽
				//$(self.elem.results).children('li').removeClass(self.css_class.select);
			});
			if(self.option.multiple){
				$(self.elem.element_box).click(function(e){
					var srcEl = e.target || e.srcElement;
					if($(srcEl).is('ul')) $(self.elem.combo_input).focus();
				});
				//标签关闭操作
				//关闭同时需要将该标签的key从已保存的隐藏域中删除
				$(self.elem.element_box).on('click','span.tag_close',function(){
					var li = $(this).closest('li');
					var key = $(li).attr('itemvalue');
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
					$(li).remove();
					self._inputResize(self);
				});
				self._inputResize(self);
			}
		},

		/**
		 * @private
		 * @desc 插件整体的事件处理
		 */
		_ehWhole: function() {
			var self = this;
			//如果是点击了控件本身则不响应外部鼠标点击事件
			$(self.elem.container).mousedown(function() {
				var thisindex = $('div.sp_container').index(this);
				var lastindex = $(document.body).data(constants.objStatusIndex);
				if(lastindex != undefined && thisindex != lastindex){
					$(document.body).data(constants.objStatusKey,false);
				}else{
					$(document.body).data(constants.objStatusKey,true);
				}
				$(document.body).data(constants.objStatusIndex,thisindex);
			});
			//控件外部的鼠标点击事件处理
			$(document).off('mousedown.selectPage').on('mousedown.selectPage',function(e) {
				if ($(document.body).data(constants.objStatusKey)) $(document.body).data(constants.objStatusKey,false);
				else {
					//清除内容
					var cleanContent = function(obj){
						$(obj.elem.combo_input).val('');
						if(!obj.option.multiple) $(obj.elem.hidden).val('');
					};
					$('div.sp_container').each(function(){
						var d = $(this).data(constants.dataKey);
						//列表是打开的状态
						if($(this).hasClass(d.css_class.container_open)) {
							//若控件已有选中的的项目，而文本输入框中清空了关键字，则清空控件已选中的项目
							if(!$(d.elem.combo_input).val() && $(d.elem.hidden).val() && !d.option.multiple){
								d.prop.page_all = 1;//重置当前页为1
								cleanContent(d);
								d._hideResults(d);
								return true;
							}
							//匹配项且高亮时，下拉分页控件失去焦点后，自动选择该项目
							if ($('li', $(d.elem.results)).size() > 0) {
								if(d.option.auto_fill_result) {//打开自动内容填充功能
									//若已有选中项目，则直接隐藏列表
									if ($('li.sp_selected', $(d.elem.results)).size() > 0) {
										d._hideResults(d);
									}else if($('li.sp_over', $(d.elem.results)).size() > 0){
										//若控件已有选中的值，则忽略高亮的项目
										if($(d.elem.hidden).val()) d._hideResults(d);
										//若没有已选中的项目，且列表中有高亮项目时，选中当前高亮的行
										else d._selectCurrentLine(d, true);
									}else if(d.option.auto_select_first){
										//若控件已有选中的值，则忽略自动选择第一项的功能
										if($(d.elem.hidden).val()) d._hideResults(d);
										else{
											//对于没有选中，没有高亮的情况，若插件设置了自动选中第一项时，则选中第一项
											d._nextLine(d);
											//self._nextLine(self);
											d._selectCurrentLine(d, true);
										}
									}else{
										d._hideResults(d);
									}
								}else d._hideResults(d);
							} else {
								//无匹配项目时，自动清空用户输入的关键词
								if (d.option.no_result_clean) cleanContent(d);
								else{
									if(!d.option.multiple) $(d.elem.hidden).val('');
								}
								
								d._hideResults(d);
							}
						}
					});
				}
			});
		},

		/**
		 * @private
		 * @desc 结果列表的事件处理
		 */
		_ehResults: function() {
			var self = this;
			$(self.elem.results).children('li').mouseover(function() {
				if (self.prop.key_select) {
					self.prop.key_select = false;
					return;
				}

				$(self.elem.results).children('li').removeClass(self.css_class.select);
				$(this).addClass(self.css_class.select);
				self._setCssFocusedResults(self);
			}).click(function(e) {
				if (self.prop.key_select) {
					self.prop.key_select = false;
					return;
				}
				e.preventDefault();
				e.stopPropagation();
				self._selectCurrentLine(self, false);
			});
		},

		/**
		 * @private
		 * @desc 分页导航按钮的事件处理
		 * @param {Object} self - 插件内部对象
		 */
		_ehNaviPaging: function(self) {
			$('li.csFirstPage', $(self.elem.navi)).off('click').on('click',function(ev) {
				$(self.elem.combo_input).focus();
				ev.preventDefault();
				self._firstPage(self);
			});

			$('li.csPreviousPage', $(self.elem.navi)).off('click').on('click',function(ev) {
				$(self.elem.combo_input).focus();
				ev.preventDefault();
				self._prevPage(self);
			});

			// the number of page
			/*
			$(self.elem.navi).find('.navi_page').mouseup(function(ev) {
			  $(self.elem.combo_input).focus();
			  ev.preventDefault();
			
			  if (!self.prop.is_suggest) self.prop.page_all     = parseInt($(this).text(), 10);
			  else                       self.prop.page_suggest = parseInt($(this).text(), 10);
			
			  self.prop.is_paging = true;
			  self._suggest(self);
			});
			*/

			$('li.csNextPage', $(self.elem.navi)).off('click').on('click',function(ev) {
				$(self.elem.combo_input).focus();
				ev.preventDefault();
				self._nextPage(self);
			});

			$('li.csLastPage', $(self.elem.navi)).off('click').on('click',function(ev) {
				$(self.elem.combo_input).focus();
				ev.preventDefault();
				self._lastPage(self);
			});
		},

		/**
		 * @private
		 * @desc Ajax请求失败的处理
		 * @param {Object} self - 插件内部对象
		 * @errorThrom {string} errorThrown - Ajax的错误输出内容
		 */
		_ajaxErrorNotify: function(self, errorThrown) {
			alert(self.message.ajax_error);
		},

		/**
		 * @private
		 * @desc 窗口滚动处理
		 * @param {Object} self - 插件内部对象
		 * @param {boolean} enforce - 是否定位到输入框的位置
		 */
		_scrollWindow: function(self, enforce) {
			var current_result = self._getCurrentLine(self);

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
				} else {
					//不进行滚动
					return;
				}
			} else if (target_top < scroll_top) gap = target_top - scroll_top;
			window.scrollBy(0, gap);
		},

		/**
		 * @private
		 * @desc 输入框获得焦点的样式设置
		 * @param {Object} self - 插件内部对象
		 */
		_setCssFocusedInput: function(self) {
			$(self.elem.results).addClass(self.css_class.re_off);
			$(self.elem.combo_input).removeClass(self.css_class.input_off);
		},

		/**
		 * @private
		 * @desc 设置结果列表高亮，输入框失去焦点
		 * @param {Object} self - 插件内部对象
		 */
		_setCssFocusedResults: function(self) {
			$(self.elem.results).removeClass(self.css_class.re_off);
			$(self.elem.combo_input).addClass(self.css_class.input_off);
		},

		/**
		 * @private
		 * @desc 输入框输入值的变化监控
		 * @param {Object} self - 插件内部对象
		 */
		_checkValue: function(self) {
			var now_value = $(self.elem.combo_input).val();
			if (now_value != self.prop.prev_value) {
				self.prop.prev_value = now_value;
				self.prop.first_show = false;

				//原来的设计是在值变化时，都会清空隐藏域的内容，目前去除该功能
				//if (self.option.plugin_type != 'textarea') $(self.elem.hidden).val('');

				if (self.option.select_only) self._setButtonAttrDefault();
				

				//重置页数
				self.prop.page_suggest = 1;
				self.prop.is_suggest = true;
				self._suggest(self);				
			}
		},

		/**
		 * @private
		 * @desc 文本输入框键盘事件处理
		 * @param {Object} self - 插件内部对象
		 * @param {Object} e - 事件event对象
		 */
		_processKey: function(self, e) {
			if (($.inArray(e.keyCode, [27, 38, 40, 9]) > -1 && $(self.elem.result_area).is(':visible')) || ($.inArray(e.keyCode, [37, 39, 13, 9]) > -1 && self._getCurrentLine(self)) || (e.keyCode == 40)) {
				e.preventDefault();
				e.stopPropagation();
				e.cancelBubble = true;
				e.returnValue = false;

				switch (e.keyCode) {
				case 37:
					// left
					if (e.shiftKey) self._firstPage(self);
					else self._prevPage(self);
					break;

				case 38:
					// up
					self.prop.key_select = true;
					self._prevLine(self);
					break;

				case 39:
					// right
					if (e.shiftKey) self._lastPage(self);
					else self._nextPage(self);
					break;

				case 40:
					// down
					if ($(self.elem.results).children('li').length) {
						self.prop.key_select = true;
						self._nextLine(self);
					} else {
						self.prop.is_suggest = false;
						self._suggest(self);
					}
					break;

				case 9:
					// tab
					self.prop.key_paging = true;
					self._selectCurrentLine(self, true);
					//self._hideResults(self);
					break;

				case 13:
					// return
					self._selectCurrentLine(self, true);
					break;

				case 27:
					//  escape
					self.prop.key_paging = true;
					self._hideResults(self);
					break;
				}
			} else {
				if(e.keyCode != 16) self._setCssFocusedInput(self); // except Shift(16)
				self._inputResize(self);
				self._checkValue(self);
			}
		},

		/**
		 * @private
		 * @desc 中断Ajax请求
		 * @param {Object} self - 插件内部对象
		 */
		_abortAjax: function(self) {
			if (self.prop.xhr) {
				self.prop.xhr.abort();
				self.prop.xhr = false;
			}
		},

		/**
		 * @private
		 * @desc 数据查询
		 * @param {Object} self - 插件内部对象
		 */
		_suggest: function(self) {
			//搜索关键字
			var q_word;
			
			//q_word = (self.prop.is_suggest) ? $.trim($(self.elem.combo_input).val()) : '';
			//q_word = $.trim($(self.elem.combo_input).val());
			q_word = (self.prop.first_show) ? '' : $.trim($(self.elem.combo_input).val());
			/*
			//取消在输入状态时，判断到输入框里内容为空时，隐藏下拉列表的操作
			if (q_word.length < 1 && self.prop.is_suggest) {
				self._hideResults(self);
				return;
			}
			*/
			q_word = q_word.split(/[\s　]+/);
			
			self._abortAjax(self);
			self._setLoading(self);
			if (self.prop.is_paging) {
				var obj = self._getCurrentLine(self);
				self.prop.is_paging = (obj) ? $(self.elem.results).children('li').index(obj) : -1;
			} else if (!self.prop.is_suggest) {
				self.prop.is_paging = 0;
			}
			//var which_page_num = (self.prop.is_suggest) ? self.prop.page_suggest: self.prop.page_all;
			//var which_page_num = (q_word == '' && !self.prop.page_move) ? 1 : self.prop.page_all;
			//var which_page_num = (self.prop.first_show) ? 1 : self.prop.page_all;
			var which_page_num = self.prop.page_all;
			
			// 数据查询
			if (typeof self.option.source == 'object') self._searchForJson(self, q_word, which_page_num);
			else self._searchForDb(self, q_word, which_page_num);
		},

		/**
		 * @private
		 * @desc 读取中状态显示
		 * @param {Object} self - 插件内部对象
		 */
		_setLoading: function(self) {
			$(self.elem.navi_info).text(self.message.loading);
			if ($(self.elem.results).html() === '') {
				$(self.elem.navi).children('p').empty();
				self._calcWidthResults(self);
				$(self.elem.container).addClass(self.css_class.container_open);
			}
		},

		/**
		 * @private
		 * @desc 服务端数据查询
		 * @param {Object} self - 插件内部对象
		 * @param {Array} q_word - 查询关键字
		 * @param {number} which_page_num - 目标页
		 */
		_searchForDb: function(self, q_word, which_page_num) {
			/**
			 * 增加自定义查询参数
			 */
			var _paramsFunc = self.option.params;
			var _params = {};			
			//原始参数
			var searchKey = self.option.search_field;
			var _orgParams = {
				q_word: q_word,
				pageNumber: which_page_num,
				pageSize: self.option.per_page,
				and_or: self.option.and_or,
				order_by: self.option.order_by,
				db_table: self.option.db_table
			};
			_orgParams[searchKey] = q_word[0];
			if (_paramsFunc && $.isFunction(_paramsFunc)) {
				var result = _paramsFunc();
				if (result && $.isPlainObject(result)) {
					_params = $.extend({},_orgParams, result);
				} else _params = _orgParams;
			} else _params = _orgParams;
			//增加自定义查询参数End
			self.prop.xhr = $.eAjax({
				dataType: 'json',
				url: self.option.source,
				data: _params,
				success: function(returnData) {
					if (!returnData || !$.isPlainObject(returnData)) {
						self._hideResults(self);
						self._ajaxErrorNotify(self, errorThrown);
						return;
					}
					//数据结构处理
					var json = {};
					json.originalResult = returnData.gridResult.list;
					json.cnt_whole = returnData.gridResult.totalRow;

					json.candidate = [];
					json.primary_key = [];
					if (typeof json.originalResult != 'object') {
						self.prop.xhr = null;
						self._notFoundSearch(self);
						return;
					}
					json.cnt_page = json.originalResult.length;
					for (i = 0; i < json.cnt_page; i++) {
						for (var key in json.originalResult[i]) {
							if (key == self.option.primary_key) {
								json.primary_key.push(json.originalResult[i][key]);
							}
							if (key == self.option.field) {
								json.candidate.push(json.originalResult[i][key]);
							}
						}
					}
					self._prepareResults(self, json, q_word, which_page_num);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					if (textStatus != 'abort') {
						self._hideResults(self);
						self._ajaxErrorNotify(self, errorThrown);
					}
				},
				complete: function() {
					self.prop.xhr = null;
				}
			});
		},

		/**
		 * @private
		 * @desc 对JSON源数据进行搜索
		 * @param {Object} self - 插件内部对象
		 * @param {Array} q_word - 搜索关键字
		 * @param {number} which_page_num - 目标页数
		 */
		_searchForJson: function(self, q_word, which_page_num) {
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
			} while ( i < q_word . length );

			// SELECT * FROM source WHERE field LIKE q_word;
			for (i = 0; i < self.option.source.length; i++) {
				var flag = false;
				var row = self.option.source[i];
				for (var j = 0; j < arr_reg.length; j++) {					
					var itemText = row[self.option.field];//默认获取showField字段的文本
					if(self.option.format_item && $.isFunction(self.option.format_item))
						itemText = self.option.format_item(row);
					if (itemText.match(arr_reg[j])) {
						flag = true;
						if (self.option.and_or == 'OR') break;
					} else {
						flag = false;
						if (self.option.and_or == 'AND') break;
					}
				}
				if (flag) matched.push(row);
			}
			
			//若没有匹配项目，则结束搜索
			if (matched.length === undefined) {
				self._notFoundSearch(self);
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
				if (matched[i][self.option.order_by[0][0]].match(reg1)) {
					matched1.push(matched[i]);
				} else if (matched[i][self.option.order_by[0][0]].match(reg2)) {
					matched2.push(matched[i]);
				} else {
					matched3.push(matched[i]);
				}
			}

			if (self.option.order_by[0][1].match(/^asc$/i)) {
				matched1 = self._sortAsc(self, matched1);
				matched2 = self._sortAsc(self, matched2);
				matched3 = self._sortAsc(self, matched3);
			} else {
				matched1 = self._sortDesc(self, matched1);
				matched2 = self._sortDesc(self, matched2);
				matched3 = self._sortDesc(self, matched3);
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
							if(row[self.option.primary_key] == currentValue){
								index = i + 1;
								return false;
							}
						});
						which_page_num = Math.ceil(index / self.option.per_page);
						if(which_page_num < 1) which_page_num = 1;
						self.prop.page_all = which_page_num;
					}
				}
			}else{
				//过滤后的数据个数不足一页显示的个数时，强制设置页码
				if(sorted.length <= ((which_page_num - 1) * self.option.per_page)){
					which_page_num = 1;
					self.prop.page_all = 1;
				}
			}
			
			// LIMIT xx OFFSET xx
			var start = (which_page_num - 1) * self.option.per_page;
			var end = start + self.option.per_page;
			//储存原始行数据，包括所有属性
			json.originalResult = [];
			
			// 查询后的数据处理
			for (i = start; i < end; i++) {
				if (sorted[i] === undefined) break;
				json.originalResult.push(sorted[i]);
				for (var key in sorted[i]) {
					if (key == self.option.primary_key) {
						if (json.primary_key === undefined) json.primary_key = [];
						json.primary_key.push(sorted[i][key]);
					}
					if (key == self.option.field) {
						if (json.candidate === undefined) json.candidate = [];
						json.candidate.push(sorted[i][key]);
					}
				}
			}
			if (json.candidate === undefined) json.candidate = [];
			json.cnt_page = json.candidate.length;
			self._prepareResults(self, json, q_word, which_page_num);
		},

		/**
		 * @private
		 * @desc 升充排序
		 * @param {Object} self - 插件内部对象
		 * @param {Array} arr - 结果集数组
		 */
		_sortAsc: function(self, arr) {
			arr.sort(function(a, b) {
				return a[self.option.order_by[0][0]].localeCompare(b[self.option.order_by[0][0]]);
			});
			return arr;
		},

		/**
		 * @private
		 * @desc 降充排序
		 * @param {Object} self - 插件内部对象
		 * @param {Array} arr - 结果集数组
		 */
		_sortDesc: function(self, arr) {
			arr.sort(function(a, b) {
				return b[self.option.order_by[0][0]].localeCompare(a[self.option.order_by[0][0]]);
			});
			return arr;
		},

		/**
		 * @private
		 * @desc 查询无结果的处理
		 * @param {Object} self - 插件内部对象
		 */
		_notFoundSearch: function(self) {
			$(self.elem.navi_info).text(self.message.not_found);
			$(self.elem.navi_p).hide();
			$(self.elem.results).empty();
			self._calcWidthResults(self);
			$(self.elem.container).addClass(self.css_class.container_open);
			self._setCssFocusedInput(self);
		},

		/**
		 * @private
		 * @desc 查询结果处理
		 * @param {Object} self - 插件内部对象
		 * @param {Object} json - 数据结果
		 * @param {Array} q_word - 查询关键字
		 * @param {number} which_page_num - 目标页
		 */
		_prepareResults: function(self, json, q_word, which_page_num) {
			//处理分页栏
			self._setNavi(self, json.cnt_whole, json.cnt_page, which_page_num);

			if (!json.primary_key) json.primary_key = false;

			//仅选择模式
			if (self.option.select_only && json.candidate.length === 1 && json.candidate[0] == q_word[0]) {
				$(self.elem.hidden).val(json.primary_key[0]);
				this._setButtonAttrDefault();
			}
			//是否是输入关键词进行查找
			var is_query = false;
			if (q_word && q_word.length > 0 && q_word[0]) is_query = true;
			//显示结果列表
			self._displayResults(self, json, is_query);
			if (self.prop.is_paging === false) self._setCssFocusedInput(self);
			else {
				//修复单选模式下如果有选择项，则高亮选中项，而不是高亮第一项
				if(!self.option.multiple){
					var liSelected = $('li.sp_selected', $(self.elem.results));
					if ($(liSelected).size() == 0) {
						var idx = self.prop.is_paging;
						var limit = $(self.elem.results).children('li').length - 1;
						if (idx > limit) idx = limit;
						var obj = $(self.elem.results).children('li').eq(idx);
						$(obj).addClass(self.css_class.select);
					} else $(liSelected).addClass(self.css_class.select);
				}

				self.prop.is_paging = false; //重置参数，为下次做准备
				self._setCssFocusedResults(self);
			}
		},

		/**
		 * @private
		 * @desc 生成分页栏
		 * @param {Object} self - 插件内部对象
		 * @param {number} cnt_whole - 数据总条数
		 * @param {number} cnt_page - 页面显示记录数
		 * @param {number} page_num - 当前页数
		 */
		_setNavi: function(self, cnt_whole, cnt_page, page_num) {
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
					var iconFist='fa fa-step-backward',iconPrev='fa fa-backward',iconNext='fa fa-forward',iconLast='fa fa-step-forward';
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
					$(pagebar).append('<li class="disabled pageInfoBox"><a href="javascript:void(0);"> ' + pageInfo + ' </a></li>');

					if (page_num == last_page) btnclass = ' disabled ';
					else btnclass = '';
					//首页
					$(pagebar).append('<li class="csNextPage' + btnclass + '" title="' + self.message.next_title + '" ><a href="javascript:void(0);"><i class="'+iconNext+'"></i></a></li>');
					//上一页
					$(pagebar).append('<li class="csLastPage' + btnclass + '" title="' + self.message.last_title + '" ><a href="javascript:void(0);"> <i class="'+iconLast+'"></i> </a></li>');
				}
			};

			var pagebar = $('ul', $(self.elem.navi));
			var last_page = Math.ceil(cnt_whole / self.option.per_page); //计算总页数
			if(last_page == 0) page_num = 0;
			else{
				if(page_num==0) page_num = 1;
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
			if (page_num == 1 || page_num == 0) {
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

				self._ehNaviPaging(self); // 导航按钮的事件设置
			} else {
				//$(self.elem.navi).hide();
			}
		},

		/**
		 * @private
		 * @desc 显示结果集列表
		 * @param {Object} self - 插件内部对象
		 * @param {Object} json 源数据
		 * @param {boolean} is_query - 是否是通过关键字搜索（用于区分是鼠标点击下拉还是输入框输入关键字进行查找）
		 */
		_displayResults: function(self, json, is_query) {
			$(self.elem.results).empty();
			var arr_candidate = json.candidate;
			var arr_primary_key = json.primary_key;
			var keystr = $(self.elem.hidden).val();
			var keyArr = keystr ? keyArr = keystr.split(',') : new Array();
			for (var i = 0; i < arr_candidate.length; i++) {
				var itemText = '';
				if(self.option.format_item && $.isFunction(self.option.format_item)){
					try {
						itemText = self.option.format_item(json.originalResult[i]);
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

				if ($.inArray(arr_primary_key[i].toString(),keyArr) != -1) {
					$(list).addClass(self.css_class.selected);
				}
				//缓存原始行对象
				$(list).data('dataObj',json.originalResult[i]);
				$(self.elem.results).append(list);
			}
			//显示结果集列表并调整位置
			self._calcWidthResults(self);

			$(self.elem.container).addClass(self.css_class.container_open);
			
			//结果集列表事件绑定
			self._ehResults();
			//若是键盘输入关键字进行查询且有内容时，列表自动选中第一行(auto_select_first为true时)
			if (is_query && arr_candidate.length > 0 && self.option.auto_select_first) self._nextLine(self);
			//按钮的title属性修改
			$(self.elem.button).attr('title', self.message.close_btn);
		},

		/**
		 * @private
		 * @desc 处理结果列表尺寸及位置
		 * @param {Object} self - 插件内部对象
		 */
		_calcWidthResults: function(self) {
			//若列表已展现，则不再处理
			//###代码已禁用###若启用，在翻页时，会不计算位置，导致数据量不一致时列表不会自动定位
			//if($(self.elem.result_area).is(":visible")) return;

			//设置下拉列表与输入框同宽
			//###代码已禁用###因为分页栏是固定宽度的原因，列表与输入框宽度同步功能不能再使用
			/*
			$(self.elem.result_area)
		      .width(
		        $(self.elem.container).width() -
		        ($(self.elem.result_area).outerWidth() - $(self.elem.result_area).innerWidth())
		      )
		      .show();
		    */
			$(self.elem.result_area).show(1,function(){
				/*
				//设置外框宽度，只需要初始化时设置即可，不需要在每次展开列表时进行设置，这里暂时屏蔽该功能
				//单选模式下，设置外框与输入框尺寸一致
				if(!self.option.multiple){
					$(self.elem.container).width($(self.elem.combo_input).outerWidth());
				}
				*/
				if ($(self.elem.container).css('position') == 'static') {
					// position: static
					var offset = $(self.elem.combo_input).offset();
					$(self.elem.result_area).css({
						top: offset.top + $(self.elem.combo_input).outerHeight() + 'px',
						left: offset.left + 'px'
					});
				} else {
					//在展示下拉列表时，判断默认与输入框左对齐的列表是否会超出屏幕边界，是则右对齐，否则默认左对齐
					var browserWidth = document.body.clientWidth;
					var browserHeight = document.body.clientHeight;
					var offset = $(self.elem.container).offset();
					var listWidth = $(self.elem.result_area).outerWidth();
					//当前状态，列表并未被显示，数据未被填充，列表并未展现最终高度，所以只能使用默认一页显示10条数据的固定高度进行计算
					var listHeight = $(self.elem.result_area).outerHeight();
					//默认方向的坐标，在多选模式下，因为外框架是DIV，所以需要向左靠一个像素
					var defaultLeft = self.option.multiple ? -1 : 0;
					var left = (offset.left + listWidth) > browserWidth ? -(listWidth - $(self.elem.container).outerWidth()) : defaultLeft;
					//控件在当前可视区域中的高度
					var screenTop = offset.top - $(window).scrollTop();
					var top = 0;
					if((screenTop + $(self.elem.container).outerHeight() + listHeight) > browserHeight){
						top = -(listHeight+1);
						$(self.elem.result_area).removeClass('shadowUp shadowDown').addClass('shadowUp');
					}else{
						top = self.option.multiple ? $(self.elem.container).innerHeight() + 1 : $(self.elem.container).outerHeight();
						$(self.elem.result_area).removeClass('shadowUp shadowDown').addClass('shadowDown');
					}
					// position: relative, absolute, fixed
					$(self.elem.result_area).css({
						top : top + 'px',
						left: left + 'px'
					});
				}
			});
		},

		/**
		 * @private
		 * @desc 隐藏结果列表
		 * @param {Object} self - 插件内部对象
		 */
		_hideResults: function(self) {
			if (self.prop.key_paging) {
				self._scrollWindow(self, true);
				self.prop.key_paging = false;
			}
			self._setCssFocusedInput(self);

			if (self.option.auto_fill_result) {
				//self._selectCurrentLine(self, true);
			}

			$(self.elem.results).empty();
			$(self.elem.result_area).hide();
			$(self.elem.container).removeClass(self.css_class.container_open);

			self._abortAjax(self);
			self._setButtonAttrDefault(); // 按钮title属性初期化
		},

		/**
		 * @private
		 * @desc 跳转到首页
		 * @param {Object} self - 插件内部对象
		 */
		_firstPage: function(self) {
			if (self.prop.page_all > 1) {
				self.prop.page_all = 1;
				self.prop.is_paging = true;
				self.prop.page_move = true;
				self._suggest(self);
			}
			/*
			if (!self.prop.is_suggest) {
				if (self.prop.page_all > 1) {
					self.prop.page_all = 1;
					self.prop.is_paging = true;
					self.prop.page_move = true;
					self._suggest(self);
				}
			} else {
				if (self.prop.page_suggest > 1) {
					self.prop.page_suggest = 1;
					self.prop.is_paging = true;
					self._suggest(self);
				}
			}
			*/
		},

		/**
		 * @private
		 * @desc 跳转到上一页
		 * @param {Object} self - 插件内部对象
		 */
		_prevPage: function(self) {
			if (self.prop.page_all > 1) {
				self.prop.page_all--;
				self.prop.is_paging = true;
				self.prop.page_move = true;
				self._suggest(self);
			}
			/*
			if (!self.prop.is_suggest) {
				if (self.prop.page_all > 1) {
					self.prop.page_all--;
					self.prop.is_paging = true;
					self.prop.page_move = true;
					self._suggest(self);
				}
			} else {
				if (self.prop.page_suggest > 1) {
					self.prop.page_suggest--;
					self.prop.is_paging = true;
					self._suggest(self);
				}
			}
			*/
		},

		/**
		 * @private
		 * @desc 跳转到下一页
		 * @param {Object} self - 插件内部对象
		 */
		_nextPage: function(self) {
			if (self.prop.page_all < self.prop.max_all) {
				self.prop.page_all++;
				self.prop.is_paging = true;
				self.prop.page_move = true;
				self._suggest(self);
			}
			/*
			if (self.prop.is_suggest) {
				if (self.prop.page_suggest < self.prop.max_suggest) {
					self.prop.page_suggest++;
					self.prop.is_paging = true;
					self._suggest(self);
				}
			} else {
				if (self.prop.page_all < self.prop.max_all) {
					self.prop.page_all++;
					self.prop.is_paging = true;
					self.prop.page_move = true;
					self._suggest(self);
				}
			}
			*/
		},

		/**
		 * @private
		 * @desc 跳转到尾页
		 * @param {Object} self - 插件内部对象
		 */
		_lastPage: function(self) {
			if (self.prop.page_all < self.prop.max_all) {
				self.prop.page_all = self.prop.max_all;
				self.prop.is_paging = true;
				self.prop.page_move = true;
				self._suggest(self);
			}
			/*
			if (!self.prop.is_suggest) {
				if (self.prop.page_all < self.prop.max_all) {
					self.prop.page_all = self.prop.max_all;
					self.prop.is_paging = true;
					self.prop.page_move = true;
					self._suggest(self);
				}
			} else {
				if (self.prop.page_suggest < self.prop.max_suggest) {
					self.prop.page_suggest = self.prop.max_suggest;
					self.prop.is_paging = true;
					self._suggest(self);
				}
			}
			*/
		},
		/**
		 * @private
		 * @desc 跳转到指定页
		 * @param {Object} self
		 * @param {number} page 目标页数
		 */
		_goPage : function(self,page){
			if(typeof(page) == 'undefined') page = 1;
			if (self.prop.page_all < self.prop.max_all) {
				self.prop.page_all = page;
				self.prop.is_paging = true;
				self.prop.page_move = true;
				self._suggest(self);
			}
			/*
			if (self.prop.is_suggest) {
				if (self.prop.page_suggest < self.prop.max_suggest) {
					self.prop.page_suggest = page;
					self.prop.is_paging = true;
					self._suggest(self);
				}
			} else {
				if (self.prop.page_all < self.prop.max_all) {
					self.prop.page_all = page;
					self.prop.is_paging = true;
					self.prop.page_move = true;
					self._suggest(self);
				}
			}
			*/
		},

		/**
		 * @private
		 * @desc 选择当前行
		 * @param {Object} self - 插件内部对象
		 * @param {boolean} is_enter_key - 是否为回车键
		 */
		_selectCurrentLine: function(self, is_enter_key) {
			self._scrollWindow(self, true);

			var current = self._getCurrentLine(self);
			if (current) {
				if(!self.option.multiple){
					$(self.elem.combo_input).val($(current).text());
					$(self.elem.hidden).val($(current).attr('pkey'));
				}else{
					//多选模式的项目选择处理
					$(self.elem.combo_input).val('');
					var item = {text:$(current).text(),value:$(current).attr('pkey')};
					if(!self._isAlreadySelected(self,item)){
						self._addNewTag(self,item);
						self._tagValuesSet(self);
					}
				}

				if (self.option.select_only) self._setButtonAttrDefault();
				//回调函数触发
				if (self.option.bind_to){
					$(self.elem.combo_input).trigger(self.option.bind_to, $(current).data('dataObj'));
				}
				
				self.prop.prev_value = $(self.elem.combo_input).val();
				self._hideResults(self);
			}
			
			//$(self.elem.combo_input).focus();
			$(self.elem.combo_input).change();
			$(self.elem.combo_input).blur();
			self._setCssFocusedInput(self);
			self._inputResize(self);
		},

		/**
		 * @private
		 * @desc 获得当前行对象
		 * @param {Object} self - 插件内部对象
		 */
		_getCurrentLine: function(self) {
			if ($(self.elem.result_area).is(':hidden')) return false;
			var obj = $(self.elem.results).children('li.' + self.css_class.select);
			if ($(obj).length) return obj;
			else return false;
		},
		
		/**
		 * @private
		 * @desc 多选模式下判断当前选中项目是否已经存在已选中列表中
		 * @param {Object} self - 插件内部对象
		 * @param {Object} item - 选中行对象
		 */
		_isAlreadySelected: function(self,item){
			var isExist = false;
			if(item.value){
				var keys = $(self.elem.hidden).val();
				if(keys){
					var karr = keys.split(',');
					if(karr && karr.length > 0 && $.inArray(item.value,karr) != -1) isExist = true;
				}
			}
			return isExist;
		},
		
		/**
		 * @private
		 * @desc 多选模式下增加一个标签
		 * @param {Object} self - 插件内部对象
		 * @param {Object} item - 选中行对象
		 */
		_addNewTag: function(self,item){
			if(!self.option.multiple || !item) return;
			var tmp = self.template.tag.content;
			tmp = tmp.replace(self.template.tag.textKey,item.text);
			tmp = tmp.replace(self.template.tag.valueKey,item.value);
			$(self.elem.combo_input).closest('li').before($(tmp));
		},
		
		/**
		 * @private
		 * @desc 多选模式下标签结果值放入隐藏域
		 * @param {Object} self - 插件内部对象
		 */
		_tagValuesSet: function(self){
			if(!self.option.multiple) return;
			var tags = $('li.selected_tag',$(self.elem.element_box));
			if(tags && $(tags).size() > 0){
				var result = new Array();
				$.each(tags,function(i,li){
					var v = $(li).attr('itemvalue');
					if($.type(v)!='undefined') result.push(v);
				});
				if(result.length > 0){
					$(self.elem.hidden).val(result.join(','));
				}
			}
		},
		
		/**
		 * @private
		 * @desc 多选模式下输入框根据输入内容调整输入框宽度
		 * @param {Object} self - 插件内部对象
		 */
		_inputResize: function(self){
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
		    if($('li.selected_tag',$(self.elem.element_box)).size() == 0){
		    	if(self.elem.combo_input.attr('placeholder_bak')){
		    		if(!inputLi.hasClass('full_width')) inputLi.addClass('full_width');
		    		self.elem.combo_input.attr('placeholder',self.elem.combo_input.attr('placeholder_bak'));
		    	}else setDefaultSize(self,inputLi);
		    }else setDefaultSize(self,inputLi);
		},

		/**
		 * @private
		 * @desc 选择下一行
		 * @param {Object} self - 插件内部对象
		 */
		_nextLine: function(self) {
			var obj = self._getCurrentLine(self);
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
				self._setCssFocusedResults(self);
			} else self._setCssFocusedInput(self);
			self._scrollWindow(self, false);
		},

		/**
		 * @private
		 * @desc 选择上一行
		 * @param {Object} self - 插件内部对象
		 */
		_prevLine: function(self) {
			var obj = self._getCurrentLine(self);
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
				self._setCssFocusedResults(self);
			} else self._setCssFocusedInput(self);
			self._scrollWindow(self, false);
		}
	});
})(window.jQuery);