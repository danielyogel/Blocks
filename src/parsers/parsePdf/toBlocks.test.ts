import { parsedApiPDf } from './fixtures';
import { Result_Schema } from './ARTICLE_BLOCKS_SCHEMA';
import { pdfToBlocks, transformCitesToLinks } from './toBlocks';
import { assertRight } from '../../utils';

describe('parses and converts to blocks', () => {
  describe('parses "parsedApiPdf', () => {
    it('test 1', () => {
      const blocksResult = pdfToBlocks(parsedApiPDf);
      assertRight(blocksResult);
    });
  });

  describe('converts to blocks', () => {
    it('test 1', () => {
      const parsed = pdfToBlocks(parsedApiPDf);
      assertRight(parsed);

      const res = Result_Schema(parsed.right);
      assertRight(res);
    });
  });

  describe('converts marks', () => {
    it('test 1', () => {
      const parsed = transformCitesToLinks(
        {
          text: 'one two one three one',
          cite_spans: [{ start: 0, end: 3, ref_id: 'google', text: '' }],
          section: ''
        },
        { google: '1234' }
      );

      expect(parsed).toStrictEqual([
        { text: 'one', type: 'text', marks: [{ attrs: { href: 'https://www.doi.org/1234', target: '_blank' }, type: 'link' }] },
        { text: ' two one three one', type: 'text' }
      ]);
    });

    it('test 2', () => {
      const parsed = transformCitesToLinks(
        {
          text: 'a b c d',
          cite_spans: [
            { start: 2, end: 3, ref_id: 'google', text: '' },
            { start: 5, end: 6, ref_id: 'second link', text: '' }
          ],
          section: ''
        },
        { google: '999' }
      );

      expect(parsed).toStrictEqual([
        { text: 'a ', type: 'text' },
        { text: 'b', type: 'text', marks: [{ attrs: { href: 'https://www.doi.org/999', target: '_blank' }, type: 'link' }] },
        { text: ' c', type: 'text' },
        { text: ' ', type: 'text', marks: [{ attrs: { href: null, target: '_blank' }, type: 'link' }] },
        { text: 'd', type: 'text' }
      ]);
    });
  });
});
