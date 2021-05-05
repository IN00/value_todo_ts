// @types/markdown-it 配下の token.d.ts が読み込めないため、Token の型情報を作るために import している.
import MarkdownIt = require('markdown-it')
const TMarkdownItTokens = new MarkdownIt().parse('', '');

type TMarkdownItTokenWrapperTypes = {
  inline: string,
}

/**
 * @classdesc
 * package: markdown-it の Token object の wrapper
 */
export default class MarkdownItTokenWrapper {
  static readonly TYPES: TMarkdownItTokenWrapperTypes = {
    inline: 'inline',
  };

  markdownItToken: typeof TMarkdownItTokens[0];
  filePath: string;

  constructor(markdownItToken: typeof TMarkdownItTokens[0], filePath: string) {
    this.markdownItToken = markdownItToken;
    this.filePath = filePath;
  }

  isInlineType(): boolean {
    return this.markdownItToken.type === MarkdownItTokenWrapper.TYPES.inline;
  }

  content(): string {
    return this.markdownItToken.content;
  }
}
