import ValueTodoNullError from '../error/value_todo_null_error';
import UnexpectedValueFormatError from '../error/unexpected_value_format_error';

/**
 * @classdesc
 * todo.md 内の valueTodo を 扱う ValueObject.
 * valueTodo は 以下のような format を取る
 * @example
 * - [10/1] 技術系の書籍を読む
 */
export default class ValueTodo {
  static readonly VALUE_TODO_REGEXP: RegExp = /^\[[0-9]*\/[0-9]*\].+$/;
  static readonly VALUE_REGEXP:  RegExp = /^\[[0-9]*\/[0-9]*\]/;

  valueTodo: string | null;
  filePath: string;

  constructor(inlineContent: string, filePath: string) {
    this.valueTodo = this.isValueTodo(inlineContent) ? inlineContent : null;
    this.filePath = filePath;
  }

  value(): number | never {
    if (this.valueTodo === null) {
      throw new ValueTodoNullError;
    }

    const valueAndEstimate = this.valueTodo.match(ValueTodo.VALUE_REGEXP)?.[0];

    if (valueAndEstimate === undefined) {
      throw new UnexpectedValueFormatError;
    }

    const valueAndEstimates = valueAndEstimate.replace('[', '').replace(']', '').split('/');
    const value = Number(valueAndEstimates[0]);
    const estimate = Number(valueAndEstimates[1]);

    return value / estimate;
  }

  private isValueTodo(inlineContent: string): boolean {
    const matchData = inlineContent.match(ValueTodo.VALUE_TODO_REGEXP);

    return !(matchData === null);
  }
}
