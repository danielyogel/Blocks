import { isLeft } from '.';
import { Either, Right } from 'fp-ts/lib/Either';

export function assertRight<R extends any>(either: Either<any, R>): asserts either is Right<R> {
  if (isLeft(either)) {
    new chai.Assertion({ _tag: 'Right' }).equal(either, JSON.stringify(either.left, null, 4));
  }
}
