export default class IPaymentStrategy {
  procesarPago(amount) {
    throw new Error("Método no implementado");
  }
}
