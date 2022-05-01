import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'vitest';
import { PdfToJson } from './PdfToJson';

describe('PdfToJson', () => {
  it('converts PDF to JSON', async () => {
    const dataBuffer: any = await fs.promises.readFile(path.join(__dirname, './fixtures/bitcoin.pdf'));

    const r: any = await PdfToJson(dataBuffer);

    console.log(r.Pages[0].Texts[0].R[0]);

    // expect(typeof result).toEqual('string');
  });
});
