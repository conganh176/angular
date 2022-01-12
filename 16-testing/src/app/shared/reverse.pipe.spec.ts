import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('should create', () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform('hello')).toEqual('olleh');
  });
});
