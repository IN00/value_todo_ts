import MarkdownIt from 'markdown-it';
import MarkdownItTokensHolder from '../value_object/markdown_it_token_holder';
import TodoPaths from '../value_object/todo_paths';
import FS from 'fs';

export default class ParseTodoFileUseCase {
  static execute(todoPaths :TodoPaths): MarkdownItTokensHolder[] {
    return (
      todoPaths.todoPaths.map((todoPath: string) => {
        const todoFileText: string = FS.readFileSync(todoPath, 'utf8');
        const markdownItToken = new MarkdownIt().parse(todoFileText, {});

        return new MarkdownItTokensHolder(todoPath, markdownItToken);
      }));
  }
}
