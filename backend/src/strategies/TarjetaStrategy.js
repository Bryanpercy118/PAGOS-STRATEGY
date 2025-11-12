import IPaymentStrategy from "./IPaymentStrategy.js";
import { registerPaymentStrategy } from "./PaymentRegistry.js";

class TarjetaStrategy extends IPaymentStrategy {
  procesarPago(amount) {
    return `(STRATEGY) Pago aprobado con Tarjeta por $${amount}`;
  }
}

registerPaymentStrategy("tarjeta", TarjetaStrategy);
export default TarjetaStrategy;
