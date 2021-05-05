export default class ValueTodoNullError extends Error {
  constructor(message = 'valueTodo member is null') {
    super(message);

    // Set the prototype explicitly.
    // ES2015以降はこうしなきゃいけない.
    // このように書く事で instanceof で正しい結果が得られるようになる.
    // また、sayHello() のような、例外クラスに定義されたメソッドも undefined にならずに生える.
    // [Inheriting Built-in Types](https://www.typescriptlang.org/docs/handbook/2/classes.html#inheriting-built-in-types)
    Object.setPrototypeOf(this, ValueTodoNullError.prototype);
  }

  // sayHello() {
  //   return "hello " + this.message;
  // }
}
