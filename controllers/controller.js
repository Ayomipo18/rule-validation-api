const { helper } = require("../utils/helper");
const Response = require("../utils/response");
const DataValidator = require("../utils/data-validator");

exports.home = (req, res) => {
    const api = new Response(req, res);
    return api.jsonResponse("My Rule-Validation API", true, {
      "name": "Solaja Ayomipo Emmanuel",
      "github": "@Ayomipo18",
      "email": "ayomiposolaja@gmail.com",
      "mobile": "08098262914",
      "twitter": "@phareay"
  })
};

exports.validator = (req, res) => {
  const api = new Response(req, res);
  const { rule, data } = {...req.body};
  if (rule === undefined)
      return api.errorResponse(400, "rule is required.");
  if (data === undefined)
      return api.errorResponse(400, "data is required.");
  //checking for valid JSON
  if (!helper.isObject(rule) || Array.isArray(rule))
      return api.errorResponse(400, "rule should be an object.");

  const { field, condition, condition_value } = {...rule };
  // validate rule fields
  if (helper.empty(field))
      return api.errorResponse(400, "field is required.");
  if (helper.empty(condition))
      return api.errorResponse(400, "condition is required.");
  if (helper.empty(condition_value))
      return api.errorResponse(400, "condition_value is required.");

  // get rule.field nested objects
  let fieldLevels = field.split('.');
  if (data[fieldLevels[0]] === undefined)
      return api.errorResponse(400, `field ${field} is missing from data.`);
  if (fieldLevels.length > 1 && data[fieldLevels[0]][fieldLevels[1]] === undefined)
      return api.errorResponse(400, `field ${field} is missing from data.`);

  // validation starts
  let validationStatus = false,
      fieldValue;
  if (fieldLevels.length === 1) {
      fieldValue = data[fieldLevels[0]];
      validationStatus = DataValidator.validate(fieldValue, condition, condition_value);
  } else {
      fieldValue = data[fieldLevels[0]][fieldLevels[1]];
      validationStatus = DataValidator.validate(data[fieldLevels[0]][fieldLevels[1]], condition, condition_value);
  }
  return api.validationResponse(validationStatus, field, fieldValue, condition, condition_value);
};