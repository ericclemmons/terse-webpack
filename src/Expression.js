export default class Expression {
  constructor(expression) {
    this.expression = expression;
  }

  toString() {
    return this.expression.toString();
  }

  value() {
    return this.expression();
  }
}
