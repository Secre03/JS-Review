import calculateCents from "../../utils/money.js";

describe('test suite: format currency', () => { 

  it('converts cents into dollar', () => {
    expect(calculateCents(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(calculateCents(0)).toEqual('0.00');
  });

  it('round to the nearest cents', () => {
    expect(calculateCents(2000.5)).toEqual('20.01');
  });
  
});