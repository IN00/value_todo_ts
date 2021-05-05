export default class ValueTodoConfigError extends Error {
  constructor(message = 'not exist value_todo_config.yml or its setting is invalid.') {
    super(message);

    Object.setPrototypeOf(this, ValueTodoConfigError.prototype);
  }
}
