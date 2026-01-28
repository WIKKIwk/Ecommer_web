/**
 * Schema Validator
 */

class Validator {
  constructor(schema) {
    this.schema = schema;
  }

  validate(data) {
    const errors = {};
    for (const key in this.schema) {
      const rules = this.schema[key];
      const value = data[key];

      if (rules.required && (value === undefined || value === null || value === '')) {
        errors[key] = 'Required';
        continue;
      }

      if (value !== undefined) {
        if (rules.type && typeof value !== rules.type) {
          errors[key] = `Expected ${rules.type}`;
        }
        if (rules.min && value < rules.min) {
          errors[key] = `Min ${rules.min}`;
        }
      }
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

module.exports = Validator;
