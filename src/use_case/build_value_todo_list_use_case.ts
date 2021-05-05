import JsYaml from 'js-yaml';
import FS from 'fs';
import ValueTodo from '../value_object/value_todo';
import TodoPaths from '../value_object/todo_paths';
import AbsentTodoMdFileError from '../error/absent_todo_md_file_error';
import ParseTodoFileUseCase from './parse_todo_file_use_case';
import ValueTodoPresenter from '../presenter/value_todo_presenter';
import ValueTodoConfigError from '../error/value_todo_config_error';

/**
 * @description
 * 以下のプロパティーは必須。
 */
type ValueTodoConfig = {
  included_paths: string[],
  ignored_dirs: string[],
};

export default class BuildValueTodoListUseCase {
  static execute(): void {
    const todoPaths = this.loadConfig();

    if (todoPaths.todoPaths.length <= 0) {
      throw new AbsentTodoMdFileError;
    }

    const markdownItTokenHolders = ParseTodoFileUseCase.execute(todoPaths);
    const valueTodos = markdownItTokenHolders.map((markdownItTokenHolder) => {
      return markdownItTokenHolder.getInlineTypeMarkdownItTokenWrappers().map((inlineTypeMarkdownItTokenWrapper) => {
        return new ValueTodo(inlineTypeMarkdownItTokenWrapper.content(), inlineTypeMarkdownItTokenWrapper.filePath);
      });
    }).flat();
    const valueTodoText = ValueTodoPresenter.execute(valueTodos);
    BuildValueTodoListUseCase.creteFile(valueTodoText);
  }

  /**
   * @description
   * value_todo を実行した配下にある設定ファイルをロードします。
   * 設定ファイルがなければ例外を出しプログラムを終了します。
   */
  private static loadConfig(): TodoPaths {
    const config = JsYaml.load(FS.readFileSync('value_todo_config.yml', 'utf8'));

    if (!config || typeof config === 'number' || typeof config === 'string') {
      // ファイルはあるが、中身がに何も書かれていない時は undefined だった。
      // object を除く、他のパターンがどのような状態の設定の時かは調べていないが、異常系.
      throw new ValueTodoConfigError;
    }

    let typedConfig: ValueTodoConfig;
    try {
      typedConfig = config as ValueTodoConfig;
    } catch (error) {
      throw new ValueTodoConfigError;
    }

    return new TodoPaths(typedConfig.included_paths, typedConfig.ignored_dirs);
  }

  private static creteFile(text: string): void {
    FS.writeFile('value_todo.md', text, 'utf8', () => { /* */ });
    console.log('create value_todo.md now!');
  }
}
