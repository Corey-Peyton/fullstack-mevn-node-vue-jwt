import { add, min, increment, decrement } from '@/helpers/math-util';
describe('math-util.js', () => {
  it('`add` harus mengembalikan nilai yang benar', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(2, 2)).toBe(4);
    expect(add(2, 3)).toBe(5);
    expect(add(3, 4)).toBe(7);
  });
  it('`min` harus mengembalikan nilai yang benar', () => {
    expect(min(7, 1)).toBe(6);
    expect(min(5, 2)).toBe(3);
    expect(min(4, 3)).toBe(1);
    expect(min(3, 1)).toBe(2);
  });
  it('`increment` harus mengembalikan nilai yang benar', () => {
    expect(increment(1)).toBe(2);
    expect(increment(5)).toBe(6);
    expect(increment(4)).toBe(5);
    expect(increment(8)).toBe(9);
  });
  it('`decrement` harus mengembalikan nilai yang benar', () => {
    expect(decrement(2)).toBe(1);
    expect(decrement(5)).toBe(4);
    expect(decrement(4)).toBe(3);
    expect(decrement(8)).toBe(7);
  });
});