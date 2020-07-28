export const to = <T>(promise: Promise<T>): Promise<T[] | any[]> =>
  promise.then(res => [null, res]).catch(err => [err]);
