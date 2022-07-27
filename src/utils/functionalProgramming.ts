export { flow, pipe } from 'fp-ts/function';
export { left, right, tryCatch, fromPredicate, isLeft, isRight } from 'fp-ts/Either';
export { map, reverse, filter, mapWithIndex as mapWithIndexArr, unsafeUpdateAt, unsafeDeleteAt, unsafeInsertAt } from 'fp-ts/Array';
export { mapWithIndex, toArray } from 'fp-ts/Record';
export { default as mapKeys } from 'lodash/mapKeys';
export { default as groupBy } from 'lodash/groupBy';
export { default as mapValues } from 'lodash/mapValues';
export { default as isEqual } from 'lodash/isEqual';
export { default as sortBy } from 'lodash/sortBy';
export { default as omit } from 'lodash/omit';
export { default as pick } from 'lodash/pick';
export { default as startCase } from 'lodash/startCase';
export { default as camelCase } from 'lodash/camelCase';

export const keys: <K extends string>(r: Record<K, unknown>) => Array<K> = r => {
  return Object.keys(r) as any;
};

export function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error());
      }
    };
    reader.onerror = error => reject(error);
  });
}

export const ObjectEnteries = <K extends string, V extends any>(r: Record<K, V>) => Object.entries(r) as [K, V][];
