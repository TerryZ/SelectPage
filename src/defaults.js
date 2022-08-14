/**
 * Default options
 */
const defaults = {
  /**
   * Input element
   * @type {string|HTMLInputElement}
   */
  element: undefined,
  /**
   * Data source
   * @type {string|Object}
   *
   * string：server side request url address
   * Object：JSON array，format：[{a:1,b:2,c:3},{...}]
   */
  data: undefined,
  /**
   * Language ('cn', 'en', 'ja', 'es', 'pt-br')
   * @type string
   * @default 'cn'
   */
  lang: 'cn',
  /**
   * Multiple select mode(tags)
   * @type boolean
   * @default false
   */
  multiple: false,
  /**
   * pagination or not
   * @type boolean
   * @default true
   */
  pagination: true,
  /**
   * Show up menu button
   * @type boolean
   * @default true
   */
  dropButton: true,
  /**
   * Result list visible size in pagination bar close
   * @type number
   * @default 10
   */
  listSize: 10,
  /**
   * Show control bar in multiple select mode
   * @type boolean
   * @default true
   */
  multipleControlbar: true,
  /**
   * Max selected item limited in multiple select mode
   * @type number
   * @default 0(unlimited)
   */
  maxSelectLimit: 0,
  /**
   * Select result item to close list, work on multiple select mode
   * @type boolean
   * @default false
   */
  selectToCloseList: false,
  /**
   * Init selected item key, the result will match to option.keyField option
   * @type string
   */
  initRecord: undefined,
  /**
   * The table parameter in server side mode
   * @type string
   */
  dbTable: 'tbl',
  /**
   * The value field, the value will fill to hidden element
   * @type string
   * @default 'id'
   */
  keyField: 'id',
  /**
   * The show text field, the text will show to input element or tags(multiple mode)
   * @type string
   * @default 'name'
   */
  showField: 'name',
  /**
   * Actually used to search field
   * @type string
   */
  searchField: undefined,
  /**
   * Search type ('AND' or 'OR')
   * @type string
   * @default 'AND'
   */
  andOr: 'AND',
  /**
   * Result sort type
   * @type array|boolean
   * @example
   * orderBy : ['id desc']
   */
  orderBy: false,
  /**
   * Page size
   * @type number
   * @default 10
   */
  pageSize: 10,
  /**
   * Server side request parameters
   * @type function
   * @return object
   * @example params : function(){return {'name':'aa','sex':1};}
   */
  params: undefined,
  /**
   * Custom result list item show text
   * @type function
   * @param data {object} row data
   * @return string
   */
  formatItem: undefined,
  /**
   * Have some highlight item and lost focus, auto select the highlight item
   * @type boolean
   * @default false
   */
  autoFillResult: false,
  /**
   * Auto select first item in show up result list or search result
   * depend on `autoFillResult` option set to true
   * @type boolean
   * @default false
   */
  autoSelectFirst: false,
  /**
   * Whether clear input element text when enter some keywords to search and no result return
   * @type boolean
   * @default true
   */
  noResultClean: true,
  /**
   * Select only mode
   * @type boolean
   */
  selectOnly: false,
  /**
   * Input to search delay time, work on ajax data source
   * @type number
   * @default 0.5
   */
  inputDelay: 0.5,
  /**
   * -----------------------------------------Callback--------------------------------------------
   */
  /**
   * Result list item selected callback
   * @type function
   * @param object - selected item json data
   * @param self   - plugin object
   */
  eSelect: undefined,
  /**
   * Before result list show up callback, you can do anything prepared
   * @param self - plugin object
   */
  eOpen: undefined,
  /**
   * Server side return data convert callback
   * @type function
   * @param data {object} server side return data
   * @param self {object} plugin object
   * @return {object} return data format：
   * @example
   * {
   *   list : [{name:'aa',sex:1},{name:'bb',sex:1}...],
   *   totalRow : 100
   * }
   */
  eAjaxSuccess: undefined,
  /**
   * Close selected item tag callback (multiple mode)
   * @type function
   * @param removeCount {number} remove item count
   * @param self {object} plugin object
   */
  eTagRemove: undefined,
  /**
   * Clear selected item callback(single select mode)
   * @type function
   * @param self {object} plugin object
   */
  eClear: undefined
}

export default defaults
