// The magic of state persistance is closure here
export const orderSubmitData = {
  products: [{buyType: 1,
    couponCode: '',
    productId: 7,
    // priceId: 1,
    priceOptionAmounts: [],
    price: 300,  /* 打折之前的价格 */
    realPrice: 288, /* 打折之后的价格 */
    suiteCode: ''}],
  invoiceItems: {deliverAddress: '',
    deliverEmail: '',
    deliverPhone: '',
    deliverReceiver: '',
    invoicePersonal: false,
    invoiceTitle: '',
    invoiceType: 1,
    needInvoice: false,
    taxNo: '' }
}

export const resetCounter = () => orderSubmitData.invoiceItems.needInvoice = false

/**
 * @exports.default {Mixin}
 */
export default {
  data: () => ({
    orderSubmitData
  }),
  methods: {
    resetCounter
  }
}

