import xhr from './xhr/'

/**
 * 留言板所用到的 API
 */
class ExamService {

  /**
   * 获取所有发布者
   * @resolve {String[]} authors
   */
  fetchPackageAuth (orgId) {
    return xhr({
      url: '/',
      body: {'orgId':orgId,'request_cid' : 'c5c4d06ad427d2d8895758fb92484cbf'}
    })
  }

  /**
   * 新增留言信息
   * @param   {String} msgBody.title
   * @param   {String} msgBody.content
   * @resolve {Object} msg
   */
  add (msgBody) {
    return xhr({
      method: 'post',
      url: '/msg',
      body: msgBody
    })
  }

  // 查询服务商编码
  queryAgent (agentCode) {
    return xhr({
      method: 'get',
      origin: true,
      url: '/order/?partnerCode=' + agentCode
      // body: '' + agentCode
    })
  }

  submitOrder (productPackageSubmitDto) {
    return xhr({
      method: 'post',
      url: '',
      body: {'aa': productPackageSubmitDto}
    })
  }

  /*licenceInfoList (agentCode) {
    return xhr({
      method: 'get',
      url: '/packageAndLicenceInfoList?partnerCode=' + agentCode,
      origin: true
      // body: '' + agentCode
    })
  }*/
  orgList () {
    return xhr({
      method: 'get',
      url: '/' ,
      origin: true
    })
  }
}

// 实例化后导出，全局单例
export default new ExamService()
