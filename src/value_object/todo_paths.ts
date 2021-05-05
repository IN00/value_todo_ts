import Glob from 'glob';

/**
 * @classdesc
 * value_todo_config.yml で設定された、includedPath, ignoredDirs から
 * todo.md ファイルへの path (TodoPaths) を導出するための ValueObject です。
 */
export default class TodoPaths {
  todoPaths: string[];

  constructor(includedPaths: string[], ignoredDirs: string[]) {
    this.todoPaths = this.getTodoPaths(includedPaths, ignoredDirs);
  }

  private getTodoPaths(includedPaths: string[], ignoredDirs: string[]): string[] {
    return includedPaths.map(path => {
      return Glob.sync(path, { ignore: this.getIgnoredPathsPattern(ignoredDirs) });
    }).flat();
  }

  private getIgnoredPathsPattern(ignoredDirs: string[]): string[] {
    return ignoredDirs.map(path => `**/${path}/**`);
  }
}
