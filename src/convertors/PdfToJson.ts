// import pdfParse from 'pdf-parse';
import PDFParser, { PDFDataReady } from 'pdf2json';

export async function PdfToJson(pdf: Buffer): Promise<PDFDataReady> {
  const pdfParser = new PDFParser();
  pdfParser.parseBuffer(pdf);
  return new Promise((resolve, reject) => {
    pdfParser.on('pdfParser_dataError', errData => reject(errData));
    pdfParser.on('pdfParser_dataReady', pdfData => resolve(pdfData));
  });
}
