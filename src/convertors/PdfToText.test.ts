import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'vitest';
import { PdfToText } from './PdfToText';

describe('PdfToText', () => {
  it('converts PDF to string', async () => {
    const dataBuffer = await fs.promises.readFile(path.join(__dirname, './fixtures/bitcoin.pdf'));
    // const pdfParser = new PDFParser();

    // pdfParser.parseBuffer(dataBuffer);

    // const result: any = await new Promise((resolve, reject) => {
    //   pdfParser.on('pdfParser_dataError', errData => reject(errData));
    //   pdfParser.on('pdfParser_dataReady', pdfData => resolve(pdfData));
    // });

    const result = await PdfToText(dataBuffer);

    // console.log(result);

    expect(typeof result).toEqual('string');
  });
});
