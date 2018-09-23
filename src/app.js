/* 启动文件 */
import Vue from 'vue'
import router from '@/routes/'
// import App from '@/components/App'
// import PlaceOrder from '@/components/PlaceOrder'
// import examService from '@/services/examService'
import TestValidate from '@/components/TestValidate'
import CreateOrgComp from '@/components/dialog/CreateOrgComp'
import {getQueryString} from '@/shared/utils/mixins'
/* eslint-disable no-new */
/*let currenturl = window.location.href;
console.log('currenturl', currenturl)
let orgId = getQueryString('orgId')
// window.location.href = 'www.baidu.com'
examService.fetchPackageAuth(orgId).then(placeorderData => {
  if (placeorderData) {
    // console.log('placeorderData', JSON.stringify(placeorderData))
    const data = PlaceOrder.data // data 属性是一个函数
    PlaceOrder.data = () => ({ ...data(), placeorderData })// 注意:这是不是覆盖,而是把placeorderData 合并到原data 属性中
  }
  // 挂载到 DOM，自此外部就可通过 router.app 访问到根组件
  new Vue({
    el: '#app',
    router,
    render: h => h(PlaceOrder)
  })
})*/
new Vue({
  el: '#app',
  router,
  render: h => h(CreateOrgComp)
})
if (__DEV__) {
  console.info('[当前环境] 开发环境')
  Vue.config.devtools = true
  Vue.config.productionTip = false
}

if (__PROD__) {
  console.info('[当前环境] 生产环境')
  Vue.config.devtools = false
}
