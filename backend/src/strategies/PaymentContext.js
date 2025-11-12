export default class PaymentContext {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  procesarPago(amount) {
    if (!this.strategy) {
      throw new Error("No se ha definido una estrategia de pago");
    }
    return this.strategy.procesarPago(amount);
  }
}
