export default class AbsentTodoMdFileError extends Error {
  constructor(message = 'Not exists todo.md under execution position.') {
    super(message);

    Object.setPrototypeOf(this, AbsentTodoMdFileError.prototype);
  }
}
