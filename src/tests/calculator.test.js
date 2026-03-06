const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
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

  test('returns the modulo of two numbers', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('matches the image example for modulo with 5 % 2', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('raises a base to an exponent', () => {
    expect(power(2, 8)).toBe(256);
  });

  test('matches the image example for power with 2 ^ 3', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('returns the square root of a number', () => {
    expect(squareRoot(49)).toBe(7);
  });

  test('matches the image example for square root with sqrt(16)', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('supports decimal math', () => {
    expect(add(2.5, 0.5)).toBe(3);
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
    expect(multiply(1.5, 2)).toBe(3);
    expect(divide(7.5, 2.5)).toBe(3);
    expect(modulo(7.5, 2)).toBeCloseTo(1.5);
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
    expect(calculate('modulo', 10, 3)).toBe(1);
    expect(calculate('power', 2, 8)).toBe(256);
    expect(calculate('sqrt', 49)).toBe(7);
  });

  test('runs the extended image example operations', () => {
    expect(calculate('%', 5, 2)).toBe(1);
    expect(calculate('^', 2, 3)).toBe(8);
    expect(calculate('sqrt', 16)).toBe(4);
  });

  test('throws for unsupported operations', () => {
    expect(() => calculate('cube', 2, 3)).toThrow(
      'Unsupported operation. Use add, subtract, multiply, divide, modulo, power, squareRoot, sqrt, or supported symbols.',
    );
  });

  test('throws for division by zero', () => {
    expect(() => calculate('/', 20, 0)).toThrow('Division by zero is not allowed.');
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed.');
  });

  test('throws for modulo by zero', () => {
    expect(() => calculate('%', 20, 0)).toThrow('Modulo by zero is not allowed.');
    expect(() => modulo(10, 0)).toThrow('Modulo by zero is not allowed.');
  });

  test('throws for square root of a negative number', () => {
    expect(() => calculate('sqrt', -1)).toThrow('Square root of a negative number is not allowed.');
    expect(() => squareRoot(-4)).toThrow('Square root of a negative number is not allowed.');
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
