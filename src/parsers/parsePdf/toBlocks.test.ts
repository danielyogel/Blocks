import { parsedApiPDf } from './fixtures';
import { Result_Schema } from './ARTICLE_BLOCKS_SCHEMA';
import { pdfToBlocks } from './toBlocks';
import { assertRight } from '../../utils';

it('parses "parsedApiPdf', () => {
  const blocksResult = pdfToBlocks(parsedApiPDf);
  assertRight(blocksResult);
});

it('converts to blocks', () => {
  const parsed = pdfToBlocks(parsedApiPDf);
  assertRight(parsed);

  const res = Result_Schema(parsed.right);
  assertRight(res);
});
