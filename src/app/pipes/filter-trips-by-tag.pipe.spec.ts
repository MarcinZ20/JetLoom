import { FilterTripsByTagPipe } from './filter-trips-by-tag.pipe';

describe('FilterTripsByTagPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterTripsByTagPipe();
    expect(pipe).toBeTruthy();
  });
});
