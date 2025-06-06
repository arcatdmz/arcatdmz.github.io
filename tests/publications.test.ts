import { parseNames } from '../src/javascripts/publications';

describe('parseNames', () => {
  it('handles comma separated names', () => {
    expect(parseNames('Doe, John and Smith, Jane')).toEqual(['John Doe', 'Jane Smith']);
  });

  it('handles already formatted names', () => {
    expect(parseNames('John Doe and Jane Smith')).toEqual(['John Doe', 'Jane Smith']);
  });
});
