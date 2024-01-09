import { SortTripsByPricePipe } from './sort-trips-by-price.pipe';

describe('SortTripsByPricePipe', () => {
  it('create an instance', () => {
    const pipe = new SortTripsByPricePipe();
    expect(pipe).toBeTruthy();
  });
});
