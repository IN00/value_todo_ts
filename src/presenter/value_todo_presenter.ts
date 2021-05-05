import ValueTodo from '../value_object/value_todo';

/**
 * @classdesc
 * value_todo.md の 出力内容を定める Presenter.
 */
export default class ValueTodoPresenter {
  static execute(valueTodos: ValueTodo[]): string {
    const sortedValueTodos = ValueTodoPresenter.sortValueTodo(valueTodos);

    return (
      '# Value TODO' +
      `${sortedValueTodos.map((valueTodo) => (this.valueTodoText(valueTodo)))}`
    );
  }

  private static sortValueTodo(valueTodos: ValueTodo[]): ValueTodo[] {
    return valueTodos.sort((a, b) => {
      return a.value() - b.value();
    });
  }

  private static valueTodoText(valueTodo: ValueTodo): string {
    return (
      `- ${valueTodo.valueTodo}\n` +
      `  - Value: ${valueTodo.value}, Path: [${valueTodo.filePath}](${valueTodo.filePath})\n`
    );
  }
}
