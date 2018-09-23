// The magic of state persistance is closure here
import Vue from 'vue';
export const sharedState = {
  originPrice: 0,
  multiple: 1,
  currentView: '',
  dialogShow: false,
  needInvoice: true, //是否开发票
  invoice_dto: {},
  defaultOrg: {},//默认企业,结构:{orgId,orgFullName}
  inputAgentInfo: {},
  bus: new Vue(),
  shouldPayPrice: 0
}

export const resetCounter = () => sharedState.multiple = 1
export const modifyCounter = (num) => sharedState.multiple = num
export const inc = () => {
  if (sharedState.multiple >= 9999){
    return
  }
  sharedState.multiple++
}
export const dec = () => {
  if (sharedState.multiple == 1) return;
  sharedState.multiple--
}
export const resetAgent = () => {
  delete sharedState.inputAgentInfo.agentCode
  delete sharedState.inputAgentInfo.orgFullName
}
/**
 * @exports.default {Mixin}
 */
export default {
  data: () => ({
    sharedState
  }),
  methods: {
    resetCounter,
    modifyCounter,
    resetAgent,
    inc,
    dec
  }
}

