export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export interface FC<P = {}> {
  (props: P): React.ReactElement<any, any> | null;
}
