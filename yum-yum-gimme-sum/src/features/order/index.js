// Public API för order feature
export { default as OrderConfirmationPage } from './components/OrderConfirmationPage'
export { default as ReceiptPage } from './components/ReceiptPage'
export { submitOrder, setCustomerInfo, clearCurrentOrder } from './store/orderSlice' 