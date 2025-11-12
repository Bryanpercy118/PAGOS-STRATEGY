import IPaymentStrategy from "./IPaymentStrategy.js";
import { registerPaymentStrategy } from "./PaymentRegistry.js";

class PayPalStrategy extends IPaymentStrategy {
  procesarPago(amount) {
    return `(STRATEGY) Pago aprobado con PayPal por $${amount}`;
  }
}

registerPaymentStrategy("paypal", PayPalStrategy);
export default PayPalStrategy;
