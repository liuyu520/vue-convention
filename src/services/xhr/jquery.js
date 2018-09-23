const rootPath = 'http:///stub_test2/stub' // 后端 API 根路径

const xhr = ({method = 'get', url, body = null, origin = false}) => {
  // 由于引入了 es6-shim，因此这里完全可以使用原生 Promise
  const defer = $.Deferred()

  $.ajax({
    type: method,
    url: url.indexOf('http') == 0 ? url : (rootPath + url),
    data: body
    // crossDomain: true, // 跨域
    // xhrFields: { withCredentials: true } // 跨域允许带上 cookie
  })
    .done(res => {
      if (origin){
        defer.resolve(res)
      } else {
        const {result, errMsg, value} = res
        if (!result) {
          $.toast({heading: '操作失败', text: errMsg, icon: 'warning'})
          return defer.reject(res)
        }
        defer.resolve(value)
      }
    })
    .fail(err => {
      $.toast({heading: '请求 API 失败', icon: 'error', stack: false})
      console.warn(err)
    })

  return defer.promise()
}

export default xhr
