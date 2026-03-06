#!/usr/bin/env node

/**
 * Supported operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
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

const OPERATIONS = {
  add,
  '+': add,
  subtract,
  '-': subtract,
  multiply,
  '*': multiply,
  divide,
  '/': divide,
};

function parseNumber(value, name) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`${name} must be a valid number.`);
  }

  return parsedValue;
}

function calculate(operation, leftOperand, rightOperand) {
  const executor = OPERATIONS[operation];

  if (!executor) {
    throw new Error(
      'Unsupported operation. Use add, subtract, multiply, divide, or the symbols +, -, *, /.',
    );
  }

  return executor(leftOperand, rightOperand);
}

function main(argv) {
  const [operation, leftInput, rightInput] = argv;

  if (argv.length !== 3) {
    throw new Error('Usage: node src/calculator.js <operation> <number1> <number2>');
  }

  const leftOperand = parseNumber(leftInput, 'The first value');
  const rightOperand = parseNumber(rightInput, 'The second value');
  const result = calculate(operation, leftOperand, rightOperand);

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
  multiply,
  parseNumber,
  subtract,
};
