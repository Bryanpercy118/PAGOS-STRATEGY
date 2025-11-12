const paymentRegistry = {};

export function registerPaymentStrategy(name, StrategyClass) {
  paymentRegistry[name] = StrategyClass;
}

export function getAllPaymentStrategies() {
  return Object.keys(paymentRegistry);
}

export function getStrategyClass(name) {
  return paymentRegistry[name];
}
