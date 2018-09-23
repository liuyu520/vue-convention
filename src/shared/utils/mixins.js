export function mixins (...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

/***
 * 截断指定长度
 * @param input
 * @param length
 * @param showEllipsis
 * @returns {*}
 */
export function omitTooLongString (input, length, showEllipsis/** 是否显示省略号 */) {
  if (!input) {
    return input
  }
  var len = input.length
  if (len <= length) {
    return input
  } else {
    input = input.substring(0, length)
    if (showEllipsis) {
      input += '...'
    }
  }
  return input
}
/***
 * 需要注意:分支二走完之后,需要清空t_start 吗?<br>
 *   如果不清空,会有这种情况:执行完分支二之后,马上执行分支一<br>
 *     e.g:var func3=throttle3(myFunc,2000,2100)<br>
 *     需要保证:(1)连续频繁地点击,则每隔runDelay 秒,必须执行一次<br>
 *     (2)随意的乱点击,一定会执行至少一次<br>
 *     定时器执行时,需要重置t_start,否则执行完分支二之后,马上执行分支一<br>
 * @param fn
 * @param delay : 延迟执行的倒计时,如果多次调用,新的会把旧的倒计时冲掉
 * @param runDelay
 * @returns {Function}
 */
export function throttle (fn, delay, runDelay, scope) {
  var timer = null
  var t_start = null
  var first = true
  return function () {
    // 没有传递参数runDelay,但是传递scope
    if (runDelay && (typeof runDelay != 'number') && (!scope)) {
      scope = runDelay
    }
    var context = scope || this
    var args = arguments
    var t_cur = new Date()
    // console.log(context)
    timer && clearTimeout(timer)
    if (!t_start) {
      t_start = t_cur
    }
    // console.log('t_start:'+t_start)
    // console.log('t_cur:'+t_cur)
    // console.log('t_cur - t_start:'+(t_cur - t_start))
    // runDelay的类型等于'undefined',表示没有传递参数runDelay
    if (first) {
      first = false
      fn.apply(context, args)
      return
    }
    if ((typeof runDelay !== 'undefined') && (t_cur - t_start >= runDelay)) {
      fn.apply(context, args)// 分支一
      t_start = t_cur
      // console.log('一:' + new Date())
    } else {
      timer = setTimeout(function () { // 分支二
        fn.apply(context, args)
        // console.log('二:' + new Date())
        t_start = new Date()
      }, delay)
    }
  }
}
/***
 * 获取节点的标签名称,比如INPUT,SPAN,DIV,IMG
 * @param domNode
 * @returns {string|*}
 */
export function getTagName (domNode) {
  var tagNameTmp = domNode.tagName || domNode.localName
  if (!tagNameTmp) {
    tagNameTmp = domNode.nodeName// 兼容IE8
  }
  return tagNameTmp
}
/***
 * 使用sessionStorage保存数据
 * @param key
 * @param objectVal : json对象
 */
export function saveObj (key, objectVal) {
  window.sessionStorage.setItem(key, JSON.stringify(objectVal))
}
/***
 * 使用sessionStorage恢复数据
 * @param key
 */
export function getObj (key) {
  var val = window.sessionStorage.getItem(key)
  if (val) {
    return JSON.parse(val)
  } else {
    return val
  }
}
export function removeItem (key) {
  window.sessionStorage.removeItem(key)
}
export function addMonth (startDate, month) {
  if (!month) {
    console.error('month is NOT offer')
    return
  }
  if (typeof month == 'string') {
    month = Number(month);
  }
  // document.getElementById('myDiv') .innerHTML=startDate.format('yyyy-MM-dd');
  var oldDay = startDate.getDate();
  console.log('oldDay:' + oldDay)
  startDate.setMonth(startDate.getMonth() + month);
  if (startDate.getDate() != oldDay) {
    // startDate.setMonth(startDate.getMonth());
    startDate.setDate(0); // 比如startData:1.31,变为2月29
  }
  console.log(startDate.getDate())
  return startDate;
}

export function getServicePeriod (qty, licenseEndTime) {
  if (! qty) {
    console.error('qty is undefined')
    return
  }
  let format2 = 'yyyy-MM-dd'
  var startDateStr;
  var endDateStr;
  var startDate;
  if (licenseEndTime) {
    var endDateTmp = new Date(licenseEndTime);
    endDateTmp.setDate(endDateTmp.getDate() + 1);//鉴权结束时间的后一天
    startDate = endDateTmp;
  } else {
    startDate = window.current_datetime ? new Date(window.current_datetime) : new Date();
  }

  // var now=new Date();
  // var dateFormat = 'yyyy-MM-dd HH:mm:ss';
  startDateStr = startDate.format(format2);
  console.log('getServicePeriod qty:' + qty);

  endDateStr = addMonth(startDate, qty).format(format2);

  return {'startDate': startDateStr.split(' ')[0], 'endDate': endDateStr.split(' ')[0]}
}

export function mixin () {
  var target = arguments[0];

  for (var i = 1, len = arguments.length; i < len; i++) {
    var src = arguments[i];

    for (var property in src){
      if (typeof src[property] == 'object'){
        target[property] = this.clone(src[property])
      } else if (typeof src[property] == 'function') {
        target[property] = this.hitch(target, src[property]);
      } else {
        target[property] = src[property];
      }
    }
  }

  return target;
}

export function escape (a) {
  a = a || '';
  return a.replace(/</g,'\x26lt;').replace(/>/g,'\x26gt;').replace('/\x26/g','\x26amp;').replace(/'/g,'\x26quot;');
}

export function unescape (a) {
  a = a || '';
  return a.replace(/&lt;/g,
    '\x3c').replace(/&gt;/g, '\x3e').replace(/&amp;/g, '\x26').replace(/&quot;/g, '\'');
}

export function updateUrlParameter (url, key, val2) {
  if (!url) {
    return '';
  }
  console.log('------------------')
  console.log(url);
  url = url.replace(/#+$/, '');
  if (url.indexOf('?') == -1) {
    url = url + '?' + key + '=' + val2;
  } else if (url.indexOf('&' + key + '=') == -1 && url.indexOf('?' + key + '=') == -1) {
    url = url + '&' + key + '=' + val2;
  } else {
    var regExp = new RegExp('([&?]' + key + '=)[^&]*', '');
    url = url.replace(regExp, ('$1' + val2));
  }
  return url;
}
export function getQueryString (key) {
  if (!window._cache) {
    window._cache = {}
  }
  let _cache = window._cache
  if (!_cache['queryString']){
    _cache['queryString'] = {};
    let search2 = window.location.search
    console.log('search', search2)
    if (!search2) {
      let index = window.location.href.indexOf('?')
      search2 = window.location.href.substr(index + 1)
    }
    console.log('search', search2)
    var _t = search2.replace('?','').split('&');
    for (var i = 0, len = _t.length; i < len; i++){
      var _e = _t[i].split('=');
      _cache['queryString'][_e[0]] = _e[1];
    }
  }
  return _cache['queryString'][key];
}
