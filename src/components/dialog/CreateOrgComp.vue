<template>
    <div>
        <form class="modal-content" id="bill-form">
            <table class="changeInvoiceTable" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="120" align="right">发票类型：</td>
                    <td>
                        <div class="fl inp-radio mg-r40"><label><a class="fl inf-style inf-active">电子发票</a></label></div>
                        <!--<div class="fl inp-radio"><label><input class="fl" name="invoiceType" type="radio" value="1"><span
                                class="p-font">增值税普通发票</span></label></div>-->
                    </td>
                </tr>
                <tr id="electronic_invoic_desc">
                    <td colspan="2" style="padding:0;">
                        <div class="ts-fp fz12 dropright-list">
                            电子发票是经过国家税务局机关认可的有效凭证，同样具有售后维权的效力。发票信息填写完毕一经确认则无法修改，请仔细核对，以免造成不必要的麻烦。
                            如需申请纸质发票，您可以咨询客服，服务电话：4006-600-566
                        </div>
                    </td>
                </tr>
                <tr>
                    <td width="120" align="right">发票内容：</td>
                    <td><p class="p-font">服务费</p></td>
                </tr>
                <tr >
                    <td width="120" align="right"><i class="mh-red">*</i>发票抬头：</td>
                    <td> <a class="inf-style company " :class="{ 'inf-active': !invoicePersonal }" @click="invoicePersonal = false">企业</a> <a  :class="{ 'inf-active': invoicePersonal }" class="inf-style personal"  @click="invoicePersonal = true">个人</a></td>
                </tr>
                <tr v-show="!invoicePersonal" id="trCompany">
                    <td width="120" align="right"><i class="mh-red">*</i>企业名称：</td>
                    <td>
                        <ul class="invoice-company-select"></ul>
                    </td>
                </tr>
                <tr v-show="!invoicePersonal" id="trtaxNo">
                    <td width="120" align="right"><i class="mh-red">*</i>纳税人识别号：</td>
                    <td>  </td>
                </tr>
                <tr style="display: none;">
                    <td width="120" align="right" valign="top" style="padding-top: 19px;"><i class="mh-red">*</i>寄送地址：</td>
                    <td>
                        <div id="uboxstyle" class="fl"><select v-model="invoice_dto.invoice_provinc"> </select></div>
                        <div id="tmstyle" class="fl"><select v-model="invoice_dto.invoice_city"> </select></div>
                        <div id="macstyle" class="fl"><select v-model="invoice_dto.invoice_county"> </select></div>
                        <input class="inf-input" v-model="invoice_dto.detail" name="detail" id="bill-detail" type="text" placeholder="请输入详细地址" value=""
                               autocomplete="off"/></td>
                </tr>
                <tr  style="display: none;">
                    <td width="120" align="right"><i class="mh-red">*</i>收件人姓名：</td>
                    <td><input class="inf-input" id="bill-receiver" v-model="invoice_dto.deliverReceiver" name="receiver" type="text" placeholder="请填写签收人姓名"
                               value="" autocomplete="off"/></td>
                </tr>
                <tr>
                    <td colspan="2">
                    <span style="font-weight: bolder;font-weight: bolder;
    margin-left: 24px;">接收电子发票信息渠道：</span>
                    </td>
                </tr>
                <tr>
                    <td width="120" align="right"><i class="mh-red">*</i>手机号：</td>
                    <td>
                        <validate-input
                                        data-vv-name="invoice_phone"
                                        data-vv-value-path="val"
                                         v-validate="'required|mobile'"
                                         ></validate-input>
                        <span v-show="errors.has('invoice_phone')" style="color:red;" class="help is-danger">{{ errors.first('invoice_phone') }}</span>
                        <custom-input v-validate="'required|email'" data-vv-value-path="innerValue" data-vv-name="custom"  :has-error="errors.has('custom')">
                        </custom-input>
                        <span v-show="errors.has('custom')" style="color:red;" class="help is-danger">{{ errors.first('custom') }}</span>
                    </td>
                </tr>
                <tr>
                    <td width="120" align="right">收件人邮箱：</td>
                    <td><input  v-validate="'required'"  class="inf-input" name="invoice_email" v-model="invoice_dto.deliverEmail" id="bill-email" type="text" placeholder="请填写收件人邮箱"
                               value="" autocomplete="off"/>
                    </td>
                </tr>

            </table>
            <input type="hidden" id="bill-type" name="type" value="{productId:'250'}"> <input type="hidden"
                                                                                              name="invoiceContent"
                                                                                              value="服务费">

        </form>
        <div style="margin-left: 40px;margin-right: 54px;margin-top: 30px;">
            <label >温馨提示：</label>
            <div class="fz12">
                1、企业申请电子发票普票请填写纳税人识别号<br>
                2、电子发票申请后可从企业工作台我的订单详情页查看发票开具的状态，针对已经开具的电子发票可以进行下载查看。 <br>
            </div>
        </div>
    </div>
</template>
<script>
  import sharedStateMixin from '@/services/status/sharedState.mixin'
  import InvoiceInputBox from '@/components/InvoiceInputBox.vue'
  import ValidateInput from '@/components/input/ValidateInput.vue'
  import CustomInput from '@/components/input/CustomInput'
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  Vue.use(VeeValidate, {
    events: 'input',
    // 指定locale为中文
    locale: 'zh_CN',
    inject: true
  });
  import cn from 'vee-validate/dist/locale/zh_CN'
  // 默认是en，这里添加中文的lang包
  VeeValidate.Validator.addLocale(cn)
  // 修改vee-validate默认的提示文案
  VeeValidate.Validator.updateDictionary({
    zh_CN: {
      messages: {
        regex: field => field + '格式不正确'
      }
    }
  });
  VeeValidate.Validator.extend('mobile', {
    getMessage: field => field + '不合法',
    validate: value => {
      if (value.length != 11 || value.charAt(0) != '1') {
        return false;
      }
    }
  });
  export default {
    mixins: [sharedStateMixin],
    name: 'createOrgComp',
    components: { InvoiceInputBox, ValidateInput, CustomInput },
    data: () => ({
      invoicePersonal: false,
      invoice_dto: {
      },
      clickSubmit: false
    }),
    methods: {
      close: function () {
        this.sharedState.dialogShow = false
      },
      // 保存发票
      save: function () {
        this.sharedState.bus.$emit('invoice_submit')
//        this.clickSubmit = true
        console.log('发票信息',JSON.stringify(this.invoice_dto))
        console.log('invoicePersonal', this.invoicePersonal)
        this.sharedState.invoice_dto = this.invoice_dto
        this.sharedState.invoice_dto.invoicePersonal = this.invoicePersonal
        this.$validator.validateAll().then(async (validateFlag) => {
          if (!validateFlag) {
            console.log('校验失败!!!')
            return
          }
          console.log('校验通过...')
          //校验成功,则发送http请求
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>
