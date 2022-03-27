export { flow, pipe } from 'fp-ts/function';
export { map, reverse, filter, mapWithIndex as mapWithIndexArr, unsafeUpdateAt } from 'fp-ts/Array';
export { mapWithIndex, toArray } from 'fp-ts/Record';
export { default as mapKeys } from 'lodash/mapKeys';
export { default as mapValues } from 'lodash/mapValues';
export { default as isEqual } from 'lodash/isEqual';
export { default as sortBy } from 'lodash/sortBy';
export { default as omit } from 'lodash/omit';
export { default as pick } from 'lodash/pick';
export { default as startCase } from 'lodash/startCase';

export const keys: <K extends string>(r: Record<K, unknown>) => Array<K> = r => {
  return Object.keys(r) as any;
};
