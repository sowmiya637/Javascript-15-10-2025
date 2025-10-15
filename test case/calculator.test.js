// Import libraries
const { expect } = require('chai');       // Chai's expect style
const calculator = require('../calculator'); // Import our calculator module

// Group tests for calculator
describe('Calculator Tests', function() {

  it('should add two numbers correctly', function() {
    const result = calculator.add(5, 3);
    expect(result).to.equal(8);
  });

  it('should subtract two numbers correctly', function() {
    const result = calculator.subtract(10, 4);
    expect(result).to.equal(6);
  });

  it('should multiply two numbers correctly', function() {
    const result = calculator.multiply(6, 7);
    expect(result).to.equal(42);
  });

  it('should divide two numbers correctly', function() {
    const result = calculator.divide(20, 4);
    expect(result).to.equal(5);
  });

  it('should throw error when dividing by zero', function() {
    expect(() => calculator.divide(5, 0)).to.throw("Cannot divide by zero");
  });

});
