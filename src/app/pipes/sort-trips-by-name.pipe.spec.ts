import { SortTripsByNamePipe } from './sort-trips-by-name.pipe';

describe('SortTripsByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new SortTripsByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
