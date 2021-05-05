import BuildValueTodoListUseCase from './use_case/build_value_todo_list_use_case';

const valueTodo = (): void => {
  BuildValueTodoListUseCase.execute();
};

export default valueTodo;
