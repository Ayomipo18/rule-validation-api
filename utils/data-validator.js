const { ApplicationError } = require("./custom-error");

module.exports = (function() {

    const methods = {
        'eq': (value, conditionValue) => {
            return value === conditionValue
        },
        'neq': (value, conditionValue) => {
            return value !== conditionValue
        },
        'gt': (value, conditionValue) => {
            return value > conditionValue
        },
        'gte': (value, conditionValue) => {
            return value >= conditionValue
        },
        'contains': (value, conditionValue) => {
            return value.indexOf(conditionValue) >= 0;
        },

    }

    const validate = (dataFieldValue, condition, conditionValue) => {
        if (!methods[condition]) throw new ApplicationError(`Invalid condition #${condition}.`);
        return methods[condition](dataFieldValue, conditionValue);
    }

    return {
        validate
    }
})();