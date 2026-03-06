const {
  add,
  subtract,
  multiply,
  divide,
  calculate,
  parseNumber,
} = require('../calculator');

describe('calculator arithmetic functions', () => {
  test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtracts two numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplies two numbers', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('divides two numbers', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('supports decimal math', () => {
    expect(add(2.5, 0.5)).toBe(3);
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
    expect(multiply(1.5, 2)).toBe(3);
    expect(divide(7.5, 2.5)).toBe(3);
  });
});

describe('calculate', () => {
  test('runs the image example operations', () => {
    expect(calculate('+', 2, 3)).toBe(5);
    expect(calculate('-', 10, 4)).toBe(6);
    expect(calculate('*', 45, 2)).toBe(90);
    expect(calculate('/', 20, 5)).toBe(4);
  });

  test('accepts named operations', () => {
    expect(calculate('add', 4, 2)).toBe(6);
    expect(calculate('subtract', 9, 6)).toBe(3);
    expect(calculate('multiply', 3, 5)).toBe(15);
    expect(calculate('divide', 8, 4)).toBe(2);
  });

  test('throws for unsupported operations', () => {
    expect(() => calculate('power', 2, 3)).toThrow(
      'Unsupported operation. Use add, subtract, multiply, divide, or the symbols +, -, *, /.',
    );
  });

  test('throws for division by zero', () => {
    expect(() => calculate('/', 20, 0)).toThrow('Division by zero is not allowed.');
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('parseNumber', () => {
  test('parses numeric input', () => {
    expect(parseNumber('42', 'value')).toBe(42);
    expect(parseNumber('3.14', 'value')).toBeCloseTo(3.14);
  });

  test('throws for invalid numeric input', () => {
    expect(() => parseNumber('hello', 'value')).toThrow('value must be a valid number.');
  });
});
