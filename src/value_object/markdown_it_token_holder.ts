import MarkdownItTokenWrapper from './markdown_it_token_wrapper';
// @types/markdown-it 配下の token.d.ts が読み込めないため、Token の型情報を作るために import している.
import MarkdownIt = require('markdown-it')
const TMarkdownItTokens = new MarkdownIt().parse('', '');

/**
 * @classdesc
 * todo.md を package: markdown-it の parse() メソッドで 解析した後に返る
 * markdownItToken[] を取り扱う ValueObject.
 */
export default class MarkdownItTokensHolder {
  filePath: string;
  markdownItTokenWrappers: Array<MarkdownItTokenWrapper>;

  constructor(filePath: string, markdownItTokens: typeof TMarkdownItTokens) {
    this.filePath = filePath;
    this.markdownItTokenWrappers = markdownItTokens.map((markdownItToken) => {
      return new MarkdownItTokenWrapper(markdownItToken, filePath);
    });
  }

  /**
   * @description
   * markdown-it の token の inline type には リストアイテムの他に、見出し (h1, h2 ...) なども
   * 含まれる。
   * @example
   * ```[markdown]
   * # this is INLINE
   * - this is INLINE
   * ```
   */
  getInlineTypeMarkdownItTokenWrappers(): Array<MarkdownItTokenWrapper> {
    return this.markdownItTokenWrappers.filter(markdownItTokenWrapper => markdownItTokenWrapper.isInlineType);
  }
}
