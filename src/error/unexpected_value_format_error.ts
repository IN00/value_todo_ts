export default class UnexpectedValueFormatError extends Error {
  constructor(message = 'value format is unexpected') {
    super(message);

    Object.setPrototypeOf(this, UnexpectedValueFormatError.prototype);
  }
}
