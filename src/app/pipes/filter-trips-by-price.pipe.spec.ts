import { FilterTripsByPricePipe } from './filter-trips-by-price.pipe';

describe('FilterTripsByPricePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterTripsByPricePipe();
    expect(pipe).toBeTruthy();
  });
});
