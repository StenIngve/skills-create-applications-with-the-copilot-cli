#!/usr/bin/env node

/**
 * Supported operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 * - Modulo (%)
 * - Power (^)
 * - Square root (sqrt)
 */
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(n);
}

const OPERATIONS = {
  add,
  '+': add,
  subtract,
  '-': subtract,
  multiply,
  '*': multiply,
  divide,
  '/': divide,
  modulo,
  '%': modulo,
  power,
  pow: power,
  '^': power,
  squareRoot,
  sqrt: squareRoot,
};

const UNARY_OPERATIONS = new Set(['squareRoot', 'sqrt']);

function parseNumber(value, name) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`${name} must be a valid number.`);
  }

  return parsedValue;
}

function calculate(operation, ...operands) {
  const executor = OPERATIONS[operation];

  if (!executor) {
    throw new Error(
      'Unsupported operation. Use add, subtract, multiply, divide, modulo, power, squareRoot, sqrt, or supported symbols.',
    );
  }

  return executor(...operands);
}

function main(argv) {
  const [operation, ...inputs] = argv;

  if (!operation) {
    throw new Error(
      'Usage: node src/calculator.js <operation> <number1> [number2]. Use one number for sqrt and two numbers for other operations.',
    );
  }

  if (!OPERATIONS[operation]) {
    throw new Error(
      'Unsupported operation. Use add, subtract, multiply, divide, modulo, power, squareRoot, sqrt, or supported symbols.',
    );
  }

  const expectedInputCount = UNARY_OPERATIONS.has(operation) ? 1 : 2;

  if (inputs.length !== expectedInputCount) {
    throw new Error(
      'Usage: node src/calculator.js <operation> <number1> [number2]. Use one number for sqrt and two numbers for other operations.',
    );
  }

  const parsedInputs = inputs.map((input, index) =>
    parseNumber(input, index === 0 ? 'The first value' : 'The second value'),
  );
  const result = calculate(operation, ...parsedInputs);

  console.log(result);
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  add,
  calculate,
  divide,
  main,
  modulo,
  multiply,
  parseNumber,
  power,
  squareRoot,
  subtract,
};
