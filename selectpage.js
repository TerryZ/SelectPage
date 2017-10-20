/**
 * @summary     SelectPage
 * @desc        基于jQuery及使用Bootstrap环境开发的，下拉列表带输入快速查找及结果分页展示的多功能选择器
 * @file        selectpage.js
 * @version     2.9
 * @author      TerryZeng
 * @contact     https://terryz.github.io/
 * @license     MIT License
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
 * 2017.08.13（v2.0）
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
 * 2017.08.19（v2.2）
 * 增加为原始输入框的value属性设置初始化值，以初始化插件选中项目
 * 修复多选模式下关闭标签出错的问题
 * 修复输入查询关键字后失去焦点，再次获得焦点时，插件没有根据已存在的关键进行过滤
 * 增加inputDelay配置项目，设置ajax数据源模式下，延迟输入查询的时间，避免在单位时间内连续输入发起的连续ajax查询，单位：秒，默认值：0.5
 * 修正对数字类型的列进行排序时，仍然以字符串的方式进行排序
 * 2017.08.23（v2.3）
 * 修复在查询关键字状态下，分页数据没有被更新，导致分页按钮功能不正常问题
 * 清理整理内部对象
 * 修复多选模式下，若设置了最大选中项目个数，点击“全选本页”按钮时，仅选中指定的最大数量
 * 增加selectpage.base.css兼容无UI框架的方案，但建议要至少使用normalize.css
 * 2017.08.26（v2.4）
 * 增加pagination参数，指定稿件是否使用分页加载数据，以及显示分页栏
 * 增加listSize参数，指定了不使用分页的列表，显示的高度，单位为个（选项个数），默认显示10个项目的高度
 * 设置selectOnly:true的情况下，输入框为只读模式，不允许输入查询过滤
 * 修复多选模式下及设置了最大选中项目时，选中了项目再次点击“全选本页”按钮会在已选择的基础上增加最大选中项目个数的项目
 * 调整下拉列表样式及位置
 * 增加单选模式下，选中项目后，自动显示清空按钮
 * 修复多选模式下，移除本页和清除所有两个按钮点击后，回调出错的问题
 * 增加搜索无结果时显示提示信息
 * 2017.09.07（v2.5）
 * 修复多选模式下，初始化项目的显示文本没有使用formatItem回调进行格式化
 * 修复ajax数据源模式下，输入查询关键字时，翻页始终为第一页的问题
 * 2017.09.07（v2.6）
 * 修复单选模式下初始化项目的显示文本没有使用formatItem回调格式化的问题
 * 修复单选模式存在初始化项目时，再打开下拉列表时，仅显示匹配的项目一条数据的问题
 * 修复多选模式下，动态修改选中值selectPageRefresh功能无效
 * 2017.09.12（v2.7）
 * 增加eClear回调，单选模式下，清除按钮的功能回调
 * 单选，多选模式下，输入框禁用或只读状态，不显示清除按钮
 * 2017.09.23（v2.8）
 * 调整部分样式
 * 修复可视区域高度较小时，列表始终会向上展开的问题
 * 分离键盘事件处理，对键盘输入精准控制
 * 优化区域外点击处理
 * 优化数据展示渲染效率
 * 优化列表位置定位的准确性
 * 2017.10.10（v2.9）
 * 设置最小宽度限制
 * 设置在原始输入框在初始化时是隐藏状态下，对插件进行初始化，插件宽度异常及元素错位的问题
 * 解决单选模式下，使用API清空选中项目中，没有移除清空按钮的问题
 * 解决列表显示提示信息时，列表不显示的问题
 * 插件使用的图标不再依赖Font-Awesome图标库，使用集成IconFont的方式，页面不再需要引用Font-Awesome图标库
 * 解决单选模式下，禁用状态中清空按钮依然有效的问题
 * 新增$.fn.selectPageDisabled获得插件禁用状态或设置插件禁用/启用的API
 * 优化列表嵌入区域，解决部分情况下，列表被遮挡的问题
 * 增加列表打开状态时，屏幕滚动监听，若列表超出屏幕区域则重新定位（向上或向下）
 */
;(function($) {
    'use strict';
    /**
     * 默认参数集
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
        listSize: 10,
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
        searchField: undefined,
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
        params: undefined,
        /**
         * 列表项目显示内容格式化
         * 参数类型：function
         * @type boolean
         * @param data {object} 行数据object格式
         * @return string
         */
        formatItem: undefined,
        /**
         * 是否在输入框获得焦点时，展开下拉窗口
         * @type boolean 默认值true
         */
        focusDropList: true,
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
        eSelect: undefined,
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
        eAjaxSuccess: undefined,
        /**
         * 多选模式下，关闭标签是的回调函数
         * @type function
         * @param removeCount 被移除的个数
         */
        eTagRemove: undefined,
        /**
         * 单选模式下，选中项目后的清除按钮功能回调
         * @type function
         */
        eClear: undefined,
        /**
         * @desc 控件元素容器本身
         * @type object
         */
        container: {}
    };

    /**
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
        this.setElem(input, option);

        this.setButtonAttrDefault();
        this.setInitRecord();

        this.eDropdownButton();
        this.eInput();
        this.eWhole();
    };
    /**
     * 插件版本号
     */
    SelectPage.version = '2.9';
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
     * @desc 参数初始化
     * @param {Object} option - 参数集
     */
    SelectPage.prototype.setOption = function(option) {
        //若没有设置搜索字段，则使用显示字段作为搜索字段
        option.searchField = option.searchField === undefined ? option.showField : option.searchField;

        //统一大写
        option.andOr = option.andOr.toUpperCase();
        if (option.andOr !== 'AND' && option.andOr !== 'OR') option.andOr = 'AND';

        //将参数内容从使用","分隔的字符串转换为数组
        var arr = ['searchField'];
        for (var i = 0; i < arr.length; i++) {
            option[arr[i]] = this.strToArray(option[arr[i]]);
        }

        //设置排序字段
        option.orderBy = option.orderBy === undefined ? option.searchField : option.orderBy;

        //设置多字段排序
        //例:  [ ['id', 'ASC'], ['name', 'DESC'] ]
        option.orderBy = this.setOrderbyOption(option.orderBy, option.showField);
        //多选模式下，若设置了选择项目不关闭列表功能，则强制关闭自动选择第一项功能和自动选中高亮的项目功能
        //原因是打开了会总是莫明选择了第一项，体验不佳
        if (option.multiple && !option.selectToCloseList) {
            option.autoFillResult = false;
            option.autoSelectFirst = false;
        }

        if ($.type(option.data) === 'string') {
            option.autoSelectFirst = false;
        }
        //若不需要分页功能，则将所有数据都显示出来，上限200项
        if (!option.pagination) option.pageSize = 200;
        if ($.type(option.listSize) !== 'number' || option.listSize < 0) option.listSize = 10;

        this.option = option;
    };

    /**
     * @desc 字符串转换为数组
     * @param str {string} - 字符串
     * @return {Array} - 数组
     */
    SelectPage.prototype.strToArray = function(str) {
        if (!str) return '';
        return str.replace(/[\s　]+/g, '').split(',');
    };

    /**
     * @desc 设置多字段排序
     * @param {Array} arg_order - 排序顺序
     * @param {string} arg_field - 字段
     * @return {Array} - 处理后的排序字段内容
     */
    SelectPage.prototype.setOrderbyOption = function(arg_order, arg_field) {
        var arr = [],
            orders = [];
        if (typeof arg_order == 'object') {
            for (var i = 0; i < arg_order.length; i++) {
                orders = $.trim(arg_order[i]).split(' ');
                arr[i] = orders.length == 2 ? orders : [orders[0], 'ASC'];
            }
        } else {
            orders = $.trim(arg_order).split(' ');
            arr[0] = orders.length == 2 ? orders : orders[0].match(/^(ASC|DESC)$/i) ? [arg_field, orders[0]] : [orders[0], 'ASC'];
        }
        return arr;
    };

    /**
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
                    ajax_error: 'サーバとの通信でエラーが発生しました。'
                };
                break;
        }
        this.message = message;
    };

    /**
     * @desc CSS样式表名称字义
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
            clear_btn: 'sp_clear_btn'
        };
        this.css_class = css_class;
    };

    /**
     * @desc 设置属性默认值
     */
    SelectPage.prototype.setProp = function() {
        this.prop = {
            // input disabled status
            disabled: false,
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
            selected_text: '',
            //上一次键盘输入的时间
            last_input_time: undefined
        };
        this.template = {
            tag: {
                content: '<li class="selected_tag" itemvalue="#item_value#">#item_text#<span class="tag_close">×</span></li>',
                textKey: '#item_text#',
                valueKey: '#item_value#'
            }
        };
    };

    /**
     * @desc 插件HTML结构生成
     * @param {Object} combo_input - 输入框源对象
     * @param {Object} option - 插件参数
     */
    SelectPage.prototype.setElem = function(combo_input, option) {
        // 1. 生成、替换DOM对象
        var elem = {}; //本体
        var orgWidth = $(combo_input).outerWidth();
        if (orgWidth < 150) orgWidth = 150;

        elem.combo_input = $(combo_input)
            .attr({ autocomplete: 'off' })
            .addClass(this.css_class.input)
            .wrap('<div>');
        //只选择模式设置输入框为只读状态
        if (option.selectOnly) elem.combo_input.prop('readonly', true);
        elem.container = elem.combo_input.parent().addClass(this.css_class.container);
        if (elem.combo_input.prop('disabled')) {
            if (option.multiple) elem.container.addClass(this.css_class.disabled);
            else elem.combo_input.addClass(this.css_class.input_off);
        }

        elem.container.width(orgWidth);

        elem.button = $('<div>').addClass(this.css_class.button);
        //bootstrap风格的向下三角箭头
        elem.dropdown = $('<span class="bs-caret"><span class="caret"></span></span>');
        //单选模式下清除的按钮X
        elem.clear_btn = $('<div>')
            .append('×')
            .addClass(this.css_class.clear_btn)
            .attr('title', '清除内容');

        //多选模式下带标签显示及文本输入的组合框
        elem.element_box = $('<ul>').addClass(this.css_class.element_box);
        if (option.multiple && option.multipleControlbar) elem.control = $('<div>').addClass(this.css_class.control_box);
        //结果集列表
        elem.result_area = $('<div>').addClass(this.css_class.re_area);
        //列表中的分页栏pagination
        if (option.pagination)
            elem.navi = $('<div>')
                .addClass('pagination')
                .append('<ul>');
        elem.results = $('<ul>').addClass(this.css_class.results);

        /**
         * 将原输入框的Name交换到Hidden中，因为具体需要保存传递到后端的是ID，而非Title
         */
        var namePrefix = '_text';
        //将keyField的值放入"input:hidden"
        var input_id = elem.combo_input.attr('id') !== undefined ? elem.combo_input.attr('id') : elem.combo_input.attr('name');
        var input_name = elem.combo_input.attr('name') !== undefined ? elem.combo_input.attr('name') : 'selectPage';
        var hidden_name = input_name,
            hidden_id = input_id;

        // data[search][user] -> data[search][user_primary_key]
        if (input_name.match(/\]$/)) input_name = input_name.replace(/\]?$/, namePrefix);
        else input_name += namePrefix;
        if (input_id.match(/\]$/)) input_id = input_id.replace(/\]?$/, namePrefix);
        else input_id += namePrefix;

        //将输入框的Name与Hidden的Name进行交换，使得可以将项目的具体ID被保存到后端进行处理
        elem.hidden = $('<input type="hidden" class="sp_hidden" />')
            .attr({ name: hidden_name, id: hidden_id })
            .val('');
        elem.combo_input.attr({
            name: input_name,
            id: input_id
        });

        // 2. DOM内容放置
        elem.container.append(elem.button).append(elem.hidden);
        $(document.body).append(elem.result_area);
        elem.button.append(elem.dropdown);
        elem.result_area.append(elem.results);
        if (option.pagination) elem.result_area.append(elem.navi);

        //多选模式下的特殊处理
        if (option.multiple) {
            if (option.multipleControlbar) {
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
            if (elem.combo_input.attr('placeholder')) elem.combo_input.attr('placeholder_bak', elem.combo_input.attr('placeholder'));
        }
        option.container = elem.container;
        this.elem = elem;
    };

    /**
     * @desc 将控件的部分内容设置为默认状态
     */
    SelectPage.prototype.setButtonAttrDefault = function() {
        /*
        if (this.option.selectOnly) {
            if (this.elem.combo_input.val() !== '') {
                if (this.elem.hidden.val() !== '') {
                    //选择条件
                    this.elem.combo_input.attr('title', this.message.select_ok).removeClass(this.css_class.select_ng).addClass(this.css_class.select_ok);
                } else {
                    //输入方式
                    this.elem.combo_input.attr('title', this.message.select_ng).removeClass(this.css_class.select_ok).addClass(this.css_class.select_ng);
                }
            } else {
                this.elem.hidden.val('');
                this.elem.combo_input.removeAttr('title').removeClass(this.css_class.select_ng);
            }
        }
        */
        this.elem.button.attr('title', this.message.get_all_btn);
        //按钮的title属性修改
        this.elem.button.attr('title', this.message.close_btn);
    };

    /**
     * @desc 为插件设置初始化的选中值（若有指定的话），执行第一步，数据匹配
     */
    SelectPage.prototype.setInitRecord = function(refresh) {
        var self = this;
        if ($.type(self.elem.combo_input.data('init')) != 'undefined') self.option.initRecord = String(self.elem.combo_input.data('init'));
        //若在输入框中放入了初始化值，则将它放到隐藏域中进行选中项目初始化
        //若输入框设置了初始值，同时又设置了data-init属性，那么以data-init属性为优先选择
        if (!self.option.initRecord) if (self.elem.combo_input.val()) self.option.initRecord = self.elem.combo_input.val();
        self.elem.combo_input.val('');
        if ((refresh && self.elem.hidden.val()) || $.type(self.option.initRecord) === 'string') {
            // 初始的KEY值放入隐藏域
            if (!refresh) self.elem.hidden.val(self.option.initRecord);
            //将初始值放入控件
            if (typeof self.option.data === 'object') {
                //json数据源模式
                var data = new Array();
                var keyarr = refresh ? self.elem.hidden.val().split(',') : self.option.initRecord.split(',');
                $.each(keyarr, function(index, row) {
                    for (var i = 0; i < self.option.data.length; i++) {
                        if (self.option.data[i][self.option.keyField] == row) {
                            data.push(self.option.data[i]);
                            break;
                        }
                    }
                });
                //在单选模式下，若使用了多选模式的初始化值（“key1,key2,...”多选方式），则不进行初始化选中操作
                if (!self.option.multiple && data.length > 1) data = null;
                self.afterInit(self, data);
            } else {
                //ajax数据源模式
                $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    url: self.option.data,
                    data: {
                        searchTable: self.option.dbTable,
                        searchKey: self.option.keyField,
                        searchValue: refresh ? self.elem.hidden.val() : self.option.initRecord
                    },
                    success: function(json) {
                        var d = null;
                        if (self.option.eAjaxSuccess && $.isFunction(self.option.eAjaxSuccess)) d = self.option.eAjaxSuccess(json);
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
     * @desc 匹配后的数据在插件中进行展示
     * @param {Object} self - 插件的内部对象
     * @param {Object} data - 列表数据
     */
    SelectPage.prototype.afterInit = function(self, data) {
        if (!data) return;
        if (!$.isArray(data)) data = [data];

        var getText = function(row) {
            var text = row[self.option.showField];
            if (self.option.formatItem && $.isFunction(self.option.formatItem)) {
                try {
                    text = self.option.formatItem(row);
                } catch (e) {}
            }
            return text;
        };

        if (self.option.multiple) {
            //多选模式初始化
            self.clearAll(self);
            $.each(data, function(i, row) {
                var item = {
                    text: getText(row),
                    value: row[self.option.keyField]
                };
                if (!self.isAlreadySelected(self, item)) self.addNewTag(self, item);
            });
            self.tagValuesSet(self);
            self.inputResize(self);
        } else {
            //单选模式初始化
            var row = data[0];
            self.elem.combo_input.val(getText(row));
            self.elem.hidden.val(row[self.option.keyField]);
            self.prop.prev_value = getText(row);
            self.prop.selected_text = getText(row);
            if (self.option.selectOnly) {
                self.elem.combo_input
                    .attr('title', self.message.select_ok)
                    .removeClass(self.css_class.select_ng)
                    .addClass(self.css_class.select_ok);
            }
            self.putClearButton();
        }
    };

    /**
     * @desc 下拉按钮的事件处理
     */
    SelectPage.prototype.eDropdownButton = function() {
        var self = this;
        self.elem.button
            .mouseup(function(ev) {
                ev.stopPropagation();
                if (self.elem.result_area.is(':hidden') && !self.elem.combo_input.prop('disabled')) {
                    self.elem.combo_input.focus();
                } else self.hideResults(self);
            })
            .mouseout(); // default: mouseout
    };

    /**
     * @desc 输入框的事件绑定
     */
    SelectPage.prototype.eInput = function() {
        var self = this,
            p = self.option,
            el = self.elem;
        var showList = function() {
            self.prop.page_move = false;
            self.suggest(self);
            self.setCssFocusedInput(self);
        };
        el.combo_input
            .keyup(function(e) {
                self.processKey(self, e);
            })
            .keydown(function(e) {
                self.processControl(self, e);
            })
            .focus(function(e) {
                //增加输入框获得焦点后，显示数据列表
                if (el.result_area.is(':hidden')) {
                    e.stopPropagation();
                    self.prop.first_show = true;
                    showList();
                }
            });
        el.container.on('click.SelectPage', 'div.' + self.css_class.clear_btn, function(e) {
            e.stopPropagation();
            if (!self.disabled(self)) {
                self.clearAll(self);
                if (p.eClear && $.isFunction(p.eClear)) p.eClear();
            }
        });
        el.result_area.on('mousedown.SelectPage', function(e) {
            e.stopPropagation();
        });
        if (p.multiple) {
            if (p.multipleControlbar) {
                //全选本页按钮
                $('.sp_select_all', el.control).on('click.SelectPage', function(e) {
                    self.selectAllLine(self);
                });
                //取消全选本页按钮
                $('.sp_unselect_all', el.control).on('click.SelectPage', function(e) {
                    self.unselectAllLine(self);
                });
                //清除全部按钮
                $('.sp_clear_all', el.control).on('click.SelectPage', function(e) {
                    self.clearAll(self);
                });
            }
            el.element_box.on('click.SelectPage', function(e) {
                var srcEl = e.target || e.srcElement;
                if ($(srcEl).is('ul')) el.combo_input.focus();
            });
            //标签关闭操作
            //关闭同时需要将该标签的key从已保存的隐藏域中删除
            el.element_box.on('click.SelectPage', 'span.tag_close', function() {
                var li = $(this).closest('li');
                self.removeTag(self, li);
                showList();
                if (p.eTagRemove && $.isFunction(p.eTagRemove)) p.eTagRemove(1);
            });
            self.inputResize(self);
        }
    };

    /**
     * Out of plugin area click event handler
     */
    SelectPage.prototype.eWhole = function() {
        var self = this;
        /*
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
        */
        //清除内容
        var cleanContent = function(obj) {
            obj.elem.combo_input.val('');
            if (!obj.option.multiple) obj.elem.hidden.val('');
            obj.prop.selected_text = '';
        };

        //控件外部的鼠标点击事件处理
        $(document)
            .off('mousedown.selectPage')
            .on('mousedown.selectPage', function(e) {
                var ele = e.target || e.srcElement;
                var sp = $(ele).closest('div.' + self.css_class.container);

                //列表是打开的状态
                $('div.' + self.css_class.container + '.' + self.css_class.container_open).each(function() {
                    if (this == sp[0]) return;
                    var d = $('input.' + self.css_class.input, this).data(SelectPage.dataKey);

                    //若控件已有选中的的项目，而文本输入框中清空了关键字，则清空控件已选中的项目
                    if (!d.elem.combo_input.val() && d.elem.hidden.val() && !d.option.multiple) {
                        d.prop.current_page = 1; //重置当前页为1
                        cleanContent(d);
                        d.hideResults(d);
                        return true;
                    }
                    //匹配项且高亮时，下拉分页控件失去焦点后，自动选择该项目
                    if ($('li', d.elem.results).size() > 0) {
                        if (d.option.autoFillResult) {
                            //打开自动内容填充功能
                            //若已有选中项目，则直接隐藏列表
                            if ($('li.sp_selected', d.elem.results).size() > 0) {
                                d.hideResults(d);
                            } else if ($('li.sp_over', d.elem.results).size() > 0) {
                                //若控件已有选中的值，则忽略高亮的项目
                                if (d.elem.hidden.val()) d.hideResults(d);
                                else
                                    //若没有已选中的项目，且列表中有高亮项目时，选中当前高亮的行
                                    d.selectCurrentLine(d, true);
                            } else if (d.option.autoSelectFirst) {
                                //若控件已有选中的值，则忽略自动选择第一项的功能
                                if (d.elem.hidden.val()) d.hideResults(d);
                                else {
                                    //对于没有选中，没有高亮的情况，若插件设置了自动选中第一项时，则选中第一项
                                    d.nextLine(d);
                                    //self.nextLine(self);
                                    d.selectCurrentLine(d, true);
                                }
                            } else d.hideResults(d);
                        } else d.hideResults(d);
                    } else {
                        //无匹配项目时，自动清空用户输入的关键词
                        if (d.option.noResultClean) cleanContent(d);
                        else {
                            if (!d.option.multiple) d.elem.hidden.val('');
                        }
                        d.hideResults(d);
                    }
                });
                /*
            if ($(document.body).data(SelectPage.objStatusKey)) $(document.body).data(SelectPage.objStatusKey,false);
            else {
                //清除内容
                var cleanContent = function(obj){
                    obj.elem.combo_input.val('');
                    if(!obj.option.multiple) obj.elem.hidden.val('');
                    obj.prop.selected_text = '';
                };
                //列表是打开的状态
                $('div.' + self.css_class.container + '.' + self.css_class.container_open).each(function(){
                    var d = $('input.'+self.css_class.input,this).data(SelectPage.dataKey);
                    
                    //若控件已有选中的的项目，而文本输入框中清空了关键字，则清空控件已选中的项目
                    if(!d.elem.combo_input.val() && d.elem.hidden.val() && !d.option.multiple){
                        d.prop.current_page = 1;//重置当前页为1
                        cleanContent(d);
                        d.hideResults(d);
                        return true;
                    }
                    //匹配项且高亮时，下拉分页控件失去焦点后，自动选择该项目
                    if ($('li', d.elem.results).size() > 0) {
                        if(d.option.autoFillResult) {//打开自动内容填充功能
                            //若已有选中项目，则直接隐藏列表
                            if ($('li.sp_selected', d.elem.results).size() > 0) {
                                d.hideResults(d);
                            }else if($('li.sp_over', d.elem.results).size() > 0){
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
                        //无匹配项目时，自动清空用户输入的关键词
                        if (d.option.noResultClean) cleanContent(d);
                        else{
                            if(!d.option.multiple) d.elem.hidden.val('');
                        }
                        d.hideResults(d);
                    }
                });
            }
            */
            });
    };

    /**
     * @desc 结果列表的事件处理
     */
    SelectPage.prototype.eResultList = function() {
        var self = this;
        self.elem.results
            .children('li')
            .mouseenter(function() {
                if (self.prop.key_select) {
                    self.prop.key_select = false;
                    return;
                }
                if (!$(this).hasClass(self.css_class.selected) && !$(this).hasClass('sp_message_box')) {
                    $(this).addClass(self.css_class.select);
                    self.setCssFocusedResults(self);
                }
            })
            .mouseleave(function() {
                $(this).removeClass(self.css_class.select);
            })
            .click(function(e) {
                if (self.prop.key_select) {
                    self.prop.key_select = false;
                    return;
                }
                e.preventDefault();
                e.stopPropagation();

                if (!$(this).hasClass(self.css_class.selected)) self.selectCurrentLine(self, false);
            });
    };

    /**
     * Reposition result list when list beyond the visible area
     */
    SelectPage.prototype.eScroll = function() {
        var self = this;
        $(window).on('scroll.SelectPage', function(e) {
            $('div.' + self.css_class.container + '.' + self.css_class.container_open).each(function() {
                var d = $('input.' + self.css_class.input, this).data(SelectPage.dataKey);
                var offset = d.elem.result_area.offset();
                var screenScrollTop = $(window).scrollTop();
                var docHeight = $(document).height(); //文档全部高度
                var viewHeight = $(window).height(); //可视区域高度
                var listHeight = d.elem.result_area.outerHeight();
                var listBottom = offset.top + listHeight;
                var hasOverflow = docHeight > viewHeight;
                var down = d.elem.result_area.hasClass('shadowDown');
                if (hasOverflow) {
                    if (down) {
                        //当前向下展开
                        if (listBottom > viewHeight + screenScrollTop) d.calcResultsSize(d);
                    } else {
                        //当前向上展开
                        if (offset.top < screenScrollTop) d.calcResultsSize(d);
                    }
                }
            });
        });
    };

    /**
     * @desc 分页导航按钮的事件处理
     */
    SelectPage.prototype.ePaging = function() {
        var self = this;
        if (!self.option.pagination) return;
        $('li.csFirstPage', self.elem.navi)
            .off('click')
            .on('click', function(ev) {
                //self.elem.combo_input.focus();
                ev.preventDefault();
                self.firstPage(self);
            });

        $('li.csPreviousPage', self.elem.navi)
            .off('click')
            .on('click', function(ev) {
                //self.elem.combo_input.focus();
                ev.preventDefault();
                self.prevPage(self);
            });

        $('li.csNextPage', self.elem.navi)
            .off('click')
            .on('click', function(ev) {
                //self.elem.combo_input.focus();
                ev.preventDefault();
                self.nextPage(self);
            });

        $('li.csLastPage', self.elem.navi)
            .off('click')
            .on('click', function(ev) {
                //self.elem.combo_input.focus();
                ev.preventDefault();
                self.lastPage(self);
            });
    };

    /**
     * @desc Ajax请求失败的处理
     * @param {Object} self - 插件内部对象
     * @param {string} errorThrown - Ajax的错误输出内容
     */
    SelectPage.prototype.ajaxErrorNotify = function(self /*, errorThrown*/) {
        self.showMessage(self.message.ajax_error);
    };

    /**
     * @desc 交互消息显示
     * @param {Object} self - 插件内部对象
     * @param msg {string} 需要提示的文本
     */
    SelectPage.prototype.showMessage = function(self, msg) {
        if (!msg) return;
        var msgLi = '<li class="sp_message_box"><i class="iconfont if-warning"></i> ' + msg + '</li>';
        self.elem.results
            .empty()
            .append(msgLi)
            .show();
        self.calcResultsSize(self);
        self.setOpenStatus(self, true);
        self.elem.control.hide();
        if (self.option.pagination) self.elem.navi.hide();
    };

    /**
     * @desc 窗口滚动处理
     * @param {Object} self - 插件内部对象
     * @param {boolean} enforce - 是否定位到输入框的位置
     */
    SelectPage.prototype.scrollWindow = function(self, enforce) {
        var current_result = self.getCurrentLine(self);

        var target_top = current_result && !enforce ? current_result.offset().top : self.elem.container.offset().top;
        var target_size;

        self.prop.size_li = self.elem.results.children('li:first').outerHeight();
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
     * 设置控件的打开/关闭状态
     * @param self
     * @param status {boolean} true: open, false: close
     */
    SelectPage.prototype.setOpenStatus = function(self, status) {
        var el = self.elem;
        if (status) {
            el.container.addClass(self.css_class.container_open);
            el.result_area.addClass(self.css_class.result_open);
        } else {
            el.container.removeClass(self.css_class.container_open);
            el.result_area.removeClass(self.css_class.result_open);
        }
    };

    /**
     * @desc 输入框获得焦点的样式设置
     * @param {Object} self - 插件内部对象
     */
    SelectPage.prototype.setCssFocusedInput = function(self) {
        //self.elem.results.addClass(self.css_class.re_off);
        //self.elem.combo_input.removeClass(self.css_class.input_off);
    };

    /**
     * @desc 设置结果列表高亮，输入框失去焦点
     * @param {Object} self - 插件内部对象
     */
    SelectPage.prototype.setCssFocusedResults = function(self) {
        //self.elem.results.removeClass(self.css_class.re_off);
        //self.elem.combo_input.addClass(self.css_class.input_off);
    };

    /**
     * @desc 输入框输入值的变化监控
     * @param {Object} self - 插件内部对象
     */
    SelectPage.prototype.checkValue = function(self) {
        var now_value = self.elem.combo_input.val();
        if (now_value != self.prop.prev_value) {
            self.prop.prev_value = now_value;
            self.prop.first_show = false;

            if (self.option.selectOnly) self.setButtonAttrDefault();
            if (!self.option.multiple && !now_value) {
                self.clearAll(self);
            }

            self.suggest(self);
        }
    };

    /**
     * @desc 文本输入框键盘事件处理（普通字符输入处理）
     * @param {Object} self - 插件内部对象
     * @param {Object} e - 事件event对象
     */
    SelectPage.prototype.processKey = function(self, e) {
        if ($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9, 13]) === -1) {
            if (e.keyCode != 16) self.setCssFocusedInput(self); // except Shift(16)
            self.inputResize(self);
            if ($.type(self.option.data) === 'string') {
                self.prop.last_input_time = e.timeStamp;
                setTimeout(function() {
                    if (e.timeStamp - self.prop.last_input_time === 0) self.checkValue(self);
                }, self.option.inputDelay * 1000);
            } else {
                self.checkValue(self);
            }
        }
    };

    /**
     * @desc 文本输入框键盘事件处理（控制键处理）
     * @param {Object} self - 插件内部对象
     * @param {Object} e - 事件event对象
     */
    SelectPage.prototype.processControl = function(self, e) {
        if (($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9]) > -1 && self.elem.result_area.is(':visible')) || ($.inArray(e.keyCode, [13, 9]) > -1 && self.getCurrentLine(self))) {
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
     * @desc 数据查询
     * @param {Object} self - 插件内部对象
     */
    SelectPage.prototype.suggest = function(self) {
        //搜索关键字
        var q_word;
        var val = $.trim(self.elem.combo_input.val());
        if (self.option.multiple) q_word = val;
        else {
            if (val && val === self.prop.selected_text) q_word = '';
            else q_word = val;
        }
        q_word = q_word.split(/[\s　]+/);
        self.abortAjax(self);
        self.setLoading(self);
        var which_page_num = self.prop.current_page > 0 ? self.prop.current_page : 1;

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
        if (self.elem.results.html() === '') {
            //self.calcResultsSize(self);
            self.setOpenStatus(self, true);
        }
    };

    /**
     * @desc 服务端数据查询
     * @param {Object} self - 插件内部对象
     * @param {Array} q_word - 查询关键字
     * @param {number} which_page_num - 目标页
     */
    SelectPage.prototype.searchForDb = function(self, q_word, which_page_num) {
        if (!self.option.eAjaxSuccess || !$.isFunction(self.option.eAjaxSuccess)) self.hideResults(self);
        /**
         * 增加自定义查询参数
         */
        var _paramsFunc = self.option.params;
        var _params = {};
        //原始参数
        var searchKey = self.option.searchField;
        //若有查询关键字，则重置当前页码为1
        if (q_word.length > 0 && q_word[0] && q_word[0] !== self.prop.prev_value) which_page_num = 1;
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
                _params = $.extend({}, _orgParams, result);
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
                var data = self.option.eAjaxSuccess(returnData);

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
        } while (i < q_word.length);

        // SELECT * FROM data WHERE field LIKE q_word;
        for (i = 0; i < self.option.data.length; i++) {
            var flag = false;
            var row = self.option.data[i];
            for (var j = 0; j < arr_reg.length; j++) {
                var itemText = row[self.option.showField]; //默认获取showField字段的文本
                if (self.option.formatItem && $.isFunction(self.option.formatItem)) itemText = self.option.formatItem(row);
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
        sorted = sorted
            .concat(matched1)
            .concat(matched2)
            .concat(matched3);

        //若没有匹配项目，则结束搜索
        /*
        if (sorted.length === undefined || sorted.length === 0 ) {
            self.notFoundSearch(self);
            return;
        }
        */
        json.cnt_whole = sorted.length;
        //page_move参数用于区别数据加载是在初始化列表还是在进行分页的翻页操作
        if (!self.prop.page_move) {
            //仅单选模式进行选中项目定位页功能
            if (!self.option.multiple) {
                //若控件当前已有选中值，则获得该项目所在的页数，并跳转到该页进行显示
                var currentValue = self.elem.hidden.val();
                if ($.type(currentValue) !== 'undefined' && $.trim(currentValue) !== '') {
                    var index = 0;
                    $.each(sorted, function(i, row) {
                        if (row[self.option.keyField] == currentValue) {
                            index = i + 1;
                            return false;
                        }
                    });
                    which_page_num = Math.ceil(index / self.option.pageSize);
                    if (which_page_num < 1) which_page_num = 1;
                    self.prop.current_page = which_page_num;
                }
            }
        } else {
            //过滤后的数据个数不足一页显示的个数时，强制设置页码
            if (sorted.length <= (which_page_num - 1) * self.option.pageSize) {
                which_page_num = 1;
                self.prop.current_page = 1;
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
     * @desc 查询结果处理
     * @param {Object} self - 插件内部对象
     * @param {Object} json - 数据结果
     * @param {Array} q_word - 查询关键字
     * @param {number} which_page_num - 目标页
     */
    SelectPage.prototype.prepareResults = function(self, json, q_word, which_page_num) {
        //处理分页栏
        if (self.option.pagination) self.setNavi(self, json.cnt_whole, json.cnt_page, which_page_num);

        if (!json.keyField) json.keyField = false;

        //仅选择模式
        if (self.option.selectOnly && json.candidate.length === 1 && json.candidate[0] == q_word[0]) {
            self.elem.hidden.val(json.keyField[0]);
            this.setButtonAttrDefault();
        }
        //是否是输入关键词进行查找
        var is_query = false;
        if (q_word && q_word.length > 0 && q_word[0]) is_query = true;
        //显示结果列表
        self.displayResults(self, json, is_query);
    };

    /**
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
                $(pagebar)
                    .hide()
                    .empty();
                //处理当当前页码为1时，首页和上一页按钮不允许点击
                var btnclass = '';
                /*
                ,isNewFontAwesome = true;
                //判断是否使用了font-awesome3.2.1
                $.each(document.styleSheets,function(i,n){
                    if(n && n.href && n.href.indexOf('font-awesome-3.2.1') != -1){
                        isNewFontAwesome = false;
                        return false;
                    }
                });
                */
                //为不同版本图标设置样式
                var iconFist = 'iconfont if-first',
                    iconPrev = 'iconfont if-previous',
                    iconNext = 'iconfont if-next',
                    iconLast = 'iconfont if-last';

                if (page_num == 1) btnclass = ' disabled ';
                //首页
                $(pagebar).append('<li class="csFirstPage' + btnclass + '" title="' + self.message.first_title + '" ><a href="javascript:void(0);"> <i class="' + iconFist + '"></i> </a></li>');
                //上一页
                $(pagebar).append('<li class="csPreviousPage' + btnclass + '" title="' + self.message.prev_title + '" ><a href="javascript:void(0);"><i class="' + iconPrev + '"></i></a></li>');
                var pageInfo = '第 ' + page_num + ' 页(共' + last_page + '页)';
                //设置分页信息
                $(pagebar).append('<li class="pageInfoBox"><a href="javascript:void(0);"> ' + pageInfo + ' </a></li>');

                if (page_num == last_page) btnclass = ' disabled ';
                else btnclass = '';
                //首页
                $(pagebar).append('<li class="csNextPage' + btnclass + '" title="' + self.message.next_title + '" ><a href="javascript:void(0);"><i class="' + iconNext + '"></i></a></li>');
                //上一页
                $(pagebar).append('<li class="csLastPage' + btnclass + '" title="' + self.message.last_title + '" ><a href="javascript:void(0);"> <i class="' + iconLast + '"></i> </a></li>');
                $(pagebar).show();
            }
        };

        var pagebar = $('ul', self.elem.navi);
        var last_page = Math.ceil(cnt_whole / self.option.pageSize); //计算总页数
        if (last_page == 0) page_num = 0;
        else {
            if (last_page < page_num) page_num = last_page;
            else if (page_num == 0) page_num = 1;
        }
        self.prop.current_page = page_num; //更新当前页参数
        self.prop.max_page = last_page; //更新总页数参数
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

        if (last_page > 1) self.ePaging(); //导航按钮的事件设置
    };

    /**
     * @desc 显示结果集列表
     * @param {Object} self - 插件内部对象
     * @param {Object} json 源数据
     * @param {boolean} is_query - 是否是通过关键字搜索（用于区分是鼠标点击下拉还是输入框输入关键字进行查找）
     */
    SelectPage.prototype.displayResults = function(self, json, is_query) {
        self.elem.results.hide().empty();
        if (self.option.multiple && $.type(self.option.maxSelectLimit) === 'number' && self.option.maxSelectLimit > 0) {
            var selectedSize = $('li.selected_tag', self.elem.element_box).size();
            if (selectedSize > 0 && selectedSize >= self.option.maxSelectLimit) {
                self.showMessage(self, '最多只能选择 ' + self.option.maxSelectLimit + ' 个项目');
                return;
            }
        }

        if (json.candidate.length > 0) {
            var arr_candidate = json.candidate;
            var arr_primary_key = json.keyField;
            var keystr = self.elem.hidden.val();
            var keyArr = keystr ? keystr.split(',') : new Array();
            for (var i = 0; i < arr_candidate.length; i++) {
                var itemText = '';
                if (self.option.formatItem && $.isFunction(self.option.formatItem)) {
                    try {
                        itemText = self.option.formatItem(json.originalResult[i]);
                    } catch (e) {
                        console.error('formatItem内容格式化函数内容设置不正确！');
                        itemText = arr_candidate[i];
                    }
                } else itemText = arr_candidate[i];
                //XSS対策
                var list = $('<li>')
                    .html(itemText)
                    .attr({
                        pkey: arr_primary_key[i],
                        title: itemText
                    });

                //选中项目设置高亮样式
                if ($.inArray(arr_primary_key[i].toString(), keyArr) !== -1) {
                    $(list).addClass(self.css_class.selected);
                }
                //缓存原始行对象
                $(list).data('dataObj', json.originalResult[i]);
                self.elem.results.append(list);
            }
        } else {
            var li = '<li class="sp_message_box"><i class="iconfont if-warning"></i> ' + self.message.not_found + '</li>';
            self.elem.results.append(li);
        }
        self.elem.results.show();

        if (self.option.multiple && self.option.multipleControlbar) self.elem.control.show();
        if (self.option.pagination) self.elem.navi.show();
        //显示结果集列表并调整位置
        self.calcResultsSize(self);
        self.setOpenStatus(self, true);

        //结果集列表事件绑定
        self.eResultList();
        //scrolling listen
        self.eScroll();
        //若是键盘输入关键字进行查询且有内容时，列表自动选中第一行(autoSelectFirst为true时)
        if (is_query && json.candidate.length > 0 && self.option.autoSelectFirst) self.nextLine(self);
    };

    /**
     * @desc 处理结果列表尺寸及位置
     * @param {Object} self - 插件内部对象
     */
    SelectPage.prototype.calcResultsSize = function(self) {
        var p = self.option,
            el = self.elem;
        var rePosition = function() {
            if (el.container.css('position') === 'static') {
                // position: static
                var offset = el.combo_input.offset();
                el.result_area.css({
                    top: offset.top + el.combo_input.outerHeight() + 'px',
                    left: offset.left + 'px'
                });
            } else {
                if (!p.pagination) {
                    var itemHeight = $('li:first', el.results).outerHeight(true);
                    var listHeight = itemHeight * p.listSize;
                    el.results.css({
                        'max-height': listHeight,
                        'overflow-y': 'auto'
                    });
                }

                //在展示下拉列表时，判断默认与输入框左对齐的列表是否会超出屏幕边界，是则右对齐，否则默认左对齐
                var docWidth = $(document).width();
                var docHeight = $(document).height(); //文档全部高度
                var viewHeight = $(window).height(); //可视区域高度
                var offset = el.container.offset();
                var screenScrollTop = $(window).scrollTop();
                var listWidth = el.result_area.outerWidth();
                //当前状态，列表并未被显示，数据未被填充，列表并未展现最终高度，所以只能使用默认一页显示10条数据的固定高度进行计算
                var listHeight = el.result_area.outerHeight();
                //默认方向的坐标，在多选模式下，因为外框架是DIV，所以需要向左靠一个像素
                var defaultLeft = offset.left; //p.multiple ? -1 : 0;
                //输入框高度
                var inputHeight = el.container.outerHeight();
                var left = offset.left + listWidth > docWidth ? defaultLeft - (listWidth - el.container.outerWidth()) : defaultLeft;
                //控件在全文档范围中的实际TOP（非当前可视区域中的相对TOP）
                var screenTop = offset.top; //el.container.scrollTop();//offset.top - screenScrollTop;
                var top = 0,
                    dist = 5; //设置偏移量，让列表与输入框有5px的间距
                //列表展开后的坐标高度
                var listBottom = screenTop + inputHeight + listHeight + dist;
                var hasOverflow = docHeight > viewHeight;

                if ((screenTop - screenScrollTop - dist > listHeight && (hasOverflow && listBottom > viewHeight + screenScrollTop)) || (!hasOverflow && listBottom > viewHeight)) {
                    //控件当前位置+控件高度+列表高度超过实际body高度
                    //列表则需要向上展示
                    top = offset.top - listHeight - dist;
                    el.result_area.removeClass('shadowUp shadowDown').addClass('shadowUp');
                } else {
                    //列表正常向下展示
                    top = offset.top + (p.multiple ? el.container.outerHeight() : inputHeight);
                    el.result_area.removeClass('shadowUp shadowDown').addClass('shadowDown');
                    top += dist;
                }
                return {
                    top: top + 'px',
                    left: left + 'px'
                };
            }
        };
        if (el.result_area.is(':visible')) {
            el.result_area.css(rePosition());
        } else {
            el.result_area.show(1, function() {
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
        self.setButtonAttrDefault(); // 按钮title属性初期化
    };

    /**
     * set plugin to disabled / enabled
     * @param self
     */
    SelectPage.prototype.disabled = function(self, disabled) {
        var p = self.option,
            el = self.elem;
        if ($.type(disabled) === 'undefined') return el.combo_input.prop('disabled');
        if ($.type(disabled) === 'boolean') {
            el.combo_input.prop('disabled', disabled);
            if (disabled) el.container.addClass(self.css_class.disabled);
            else el.container.removeClass(self.css_class.disabled);
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
        console.log(self);
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
    SelectPage.prototype.goPage = function(self, page) {
        if (typeof page === 'undefined') page = 1;
        if (self.prop.current_page < self.prop.max_page) {
            self.prop.current_page = page;
            self.prop.page_move = true;
            self.suggest(self);
        }
    };
    /**
     * @desc 操作结束后的一些收尾工作
     */
    SelectPage.prototype.afterAction = function(self) {
        self.inputResize(self);
        self.elem.combo_input.change();
        self.setCssFocusedInput(self);
        if (self.option.multiple) {
            if (self.option.selectToCloseList) {
                self.hideResults(self);
                self.elem.combo_input.blur();
            } else {
                self.suggest(self);
                self.elem.combo_input.focus();
            }
        } else {
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

        var current = self.getCurrentLine(self);
        if (current) {
            if (!self.option.multiple) {
                self.elem.combo_input.val($(current).text());
                self.elem.hidden.val($(current).attr('pkey'));
            } else {
                //多选模式的项目选择处理
                self.elem.combo_input.val('');
                var item = {
                    text: $(current).text(),
                    value: $(current).attr('pkey')
                };
                if (!self.isAlreadySelected(self, item)) {
                    self.addNewTag(self, item);
                    self.tagValuesSet(self);
                }
            }

            if (self.option.selectOnly) self.setButtonAttrDefault();

            //项目选择回调函数触发
            if (self.option.eSelect && $.isFunction(self.option.eSelect)) self.option.eSelect($(current).data('dataObj'));

            self.prop.prev_value = self.elem.combo_input.val();
            self.prop.selected_text = self.elem.combo_input.val();

            self.putClearButton();
        }
        self.afterAction(self);
    };
    /**
     * Show clear button when item selected in single selection mode
     */
    SelectPage.prototype.putClearButton = function() {
        if (!this.option.multiple && !this.elem.combo_input.prop('disabled')) this.elem.container.append(this.elem.clear_btn);
    };
    /**
     * Select all list item
     * @param {Object} self
     */
    SelectPage.prototype.selectAllLine = function(self) {
        var jsonarr = new Array();
        $('li', self.elem.results).each(function(i, row) {
            var item = {
                text: $(row).text(),
                value: $(row).attr('pkey')
            };
            if (!self.isAlreadySelected(self, item)) {
                self.addNewTag(self, item);
                self.tagValuesSet(self);
            }
            jsonarr.push($(row).data('dataObj'));
            //若有最大选择数量限制，则添加最大个数后，不再添加
            if ($.type(self.option.maxSelectLimit) === 'number' && self.option.maxSelectLimit > 0 && self.option.maxSelectLimit === $('li.selected_tag', self.elem.element_box).size()) {
                return false;
            }
        });
        if (self.option.eSelect && $.isFunction(self.option.eSelect)) self.option.eSelect(jsonarr);
        self.afterAction(self);
    };
    /**
     * @desc 取消选择本页全部项目
     * @param {Object} self - 插件内部对象
     */
    SelectPage.prototype.unselectAllLine = function(self) {
        var size = $('li', self.elem.results).size();
        $('li', self.elem.results).each(function(i, row) {
            var key = $(row).attr('pkey');
            var tag = $('li.selected_tag[itemvalue="' + key + '"]', self.elem.element_box);
            self.removeTag(self, tag);
        });
        self.afterAction(self);
        if (self.option.eTagRemove && $.isFunction(self.option.eTagRemove)) self.option.eTagRemove(size);
    };
    /**
     * Clear all selected items
     * @param {Object} self
     */
    SelectPage.prototype.clearAll = function(self) {
        var size = 0;
        if (self.option.multiple) {
            size = $('li.selected_tag', self.elem.element_box).size();
            $('li.selected_tag', self.elem.element_box).remove();
        }
        self.elem.combo_input.val('');
        self.elem.hidden.val('');
        self.afterAction(self);
        self.elem.clear_btn.remove();
        if (self.option.multiple) {
            if (self.option.eTagRemove && $.isFunction(self.option.eTagRemove)) self.option.eTagRemove(size);
        }
    };

    /**
     * @desc 获得当前行对象
     * @param {Object} self - 插件内部对象
     */
    SelectPage.prototype.getCurrentLine = function(self) {
        if (self.elem.result_area.is(':hidden')) return false;
        var obj = $('li.' + self.css_class.select, self.elem.results);
        if ($(obj).size()) return obj;
        else return false;
    };

    /**
     * @desc 多选模式下判断当前选中项目是否已经存在已选中列表中
     * @param {Object} self - 插件内部对象
     * @param {Object} item - 选中行对象
     */
    SelectPage.prototype.isAlreadySelected = function(self, item) {
        var isExist = false;
        if (item.value) {
            var keys = self.elem.hidden.val();
            if (keys) {
                var karr = keys.split(',');
                if (karr && karr.length > 0 && $.inArray(item.value, karr) != -1) isExist = true;
            }
        }
        return isExist;
    };

    /**
     * @desc 多选模式下增加一个标签
     * @param {Object} self - 插件内部对象
     * @param {Object} item - 选中行对象
     */
    SelectPage.prototype.addNewTag = function(self, item) {
        if (!self.option.multiple || !item) return;
        var tmp = self.template.tag.content,
            tag;
        tmp = tmp.replace(self.template.tag.textKey, item.text);
        tmp = tmp.replace(self.template.tag.valueKey, item.value);
        tag = $(tmp);
        if (self.elem.combo_input.prop('disabled')) $('span.tag_close', tag).hide();
        self.elem.combo_input.closest('li').before(tag);
    };
    /**
     * @desc 多选模式下移除一个标签
     * @param {Object} self - 插件内部对象
     * @param {Object} item - 标签对象
     */
    SelectPage.prototype.removeTag = function(self, item) {
        var key = $(item).attr('itemvalue');
        var keys = self.elem.hidden.val();
        //从已保存的key列表中删除该标签对应的项目
        if ($.type(key) != 'undefined' && keys) {
            var keyarr = keys.split(',');
            var index = $.inArray(key.toString(), keyarr);
            if (index != -1) {
                keyarr.splice(index, 1);
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
    SelectPage.prototype.tagValuesSet = function(self) {
        if (!self.option.multiple) return;
        var tags = $('li.selected_tag', self.elem.element_box);
        if (tags && $(tags).size() > 0) {
            var result = new Array();
            $.each(tags, function(i, li) {
                var v = $(li).attr('itemvalue');
                if ($.type(v) !== 'undefined') result.push(v);
            });
            if (result.length > 0) {
                self.elem.hidden.val(result.join(','));
            }
        }
    };

    /**
     * @desc 多选模式下输入框根据输入内容调整输入框宽度
     * @param {Object} self - 插件内部对象
     */
    SelectPage.prototype.inputResize = function(self) {
        if (!self.option.multiple) return;
        var width = '';
        var inputLi = self.elem.combo_input.closest('li');
        //设置默认宽度
        var setDefaultSize = function(self, inputLi) {
            inputLi.removeClass('full_width');
            var minimumWidth = self.elem.combo_input.val().length + 1;
            var width = minimumWidth * 0.75 + 'em';
            self.elem.combo_input.css('width', width);
            self.elem.combo_input.removeAttr('placeholder');
        };
        if ($('li.selected_tag', self.elem.element_box).size() === 0) {
            if (self.elem.combo_input.attr('placeholder_bak')) {
                if (!inputLi.hasClass('full_width')) inputLi.addClass('full_width');
                self.elem.combo_input.attr('placeholder', self.elem.combo_input.attr('placeholder_bak'));
                self.elem.combo_input.removeAttr('style');
            } else setDefaultSize(self, inputLi);
        } else setDefaultSize(self, inputLi);
    };

    /**
     * @desc 选择下一行
     * @param {Object} self - 插件内部对象
     */
    SelectPage.prototype.nextLine = function(self) {
        var obj = self.getCurrentLine(self);
        var idx;
        if (!obj) idx = -1;
        else {
            idx = self.elem.results.children('li').index(obj);
            $(obj).removeClass(self.css_class.select);
        }
        idx++;
        if (idx < self.elem.results.children('li').length) {
            var next = self.elem.results.children('li').eq(idx);
            $(next).addClass(self.css_class.select);
            self.setCssFocusedResults(self);
        } else self.setCssFocusedInput(self);
        self.scrollWindow(self, false);
    };

    /**
     * @desc 选择上一行
     * @param {Object} self - 插件内部对象
     */
    SelectPage.prototype.prevLine = function(self) {
        var obj = self.getCurrentLine(self);
        var idx;
        if (!obj) idx = self.elem.results.children('li').length;
        else {
            idx = self.elem.results.children('li').index(obj);
            $(obj).removeClass(self.css_class.select);
        }
        idx--;
        if (idx > -1) {
            var prev = self.elem.results.children('li').eq(idx);
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
        return this.each(function() {
            var $this = $(this),
                data = $this.data(SelectPage.dataKey),
                params = $.extend({}, defaults, $this.data(), data && data.option, typeof option === 'object' && option);
            if (!data) $this.data(SelectPage.dataKey, (data = new SelectPage(this, params)));
        });
    }

    /**
     * Get plugin object
     * @param {object} obj 
     * @returns 
     */
    function getPlugin(obj) {
        var container = $(obj).closest('div.sp_container');
        return $('input.sp_input', container);
    }

    /**
     * Clear all selected item
     */
    function ClearSelected() {
        return this.each(function() {
            var $this = getPlugin(this),
                data = $this.data(SelectPage.dataKey);
            if (data) data.clearAll(data);
        });
    }

    /**
     * Refresh result list
     * 使用场景：使用$().val('xxx')修改插件的选中项目ID，此时需要刷新插件在输入框中的显示文本
     */
    function SelectedRefresh() {
        return this.each(function() {
            var $this = getPlugin(this),
                data = $this.data(SelectPage.dataKey);
            if (data && data.elem.hidden.val()) data.setInitRecord(true);
        });
    }

    /**
     * 修改插件数据源
     * 仅在json数据源模式有效
     * @param {array} data
     * @example
     * [{name:'aa',sex:1},{name:'bb',sex:0},{...}]
     */
    function ModifyDataSource(data) {
        return this.each(function() {
            if (data && $.isArray(data) && data.length > 0) {
                var $this = getPlugin(this),
                    plugin = $this.data(SelectPage.dataKey);
                if (plugin) {
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
    function PluginDisabled(disabled) {
        var status = false;
        this.each(function() {
            var $this = getPlugin(this),
                plugin = $this.data(SelectPage.dataKey);
            if (plugin) {
                if ($.type(disabled) !== 'undefined') plugin.disabled(plugin, disabled);
                else status = plugin.disabled(plugin);
            }
        });
        return status;
    }

    /**
     * Get selected item text
     * @returns {string}
     */
    function GetInputText() {
        var str = '';
        this.each(function() {
            var $this = getPlugin(this),
                data = $this.data(SelectPage.dataKey);
            if (data) str += data.elem.combo_input.val();
        });
        return str;
    }

    var old = $.fn.selectPage;

    $.fn.selectPage = Plugin;
    $.fn.selectPage.Constructor = SelectPage;
    $.fn.selectPageClear = ClearSelected;
    $.fn.selectPageRefresh = SelectedRefresh;
    $.fn.selectPageData = ModifyDataSource;
    $.fn.selectPageDisabled = PluginDisabled;
    $.fn.selectPageText = GetInputText;

    // 处理新旧版本冲突
    // =================
    $.fn.selectPage.noConflict = function() {
        $.fn.selectPage = old;
        return this;
    };
})(window.jQuery);
