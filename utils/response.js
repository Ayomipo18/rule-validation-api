class Response {
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    /**
     * json response
     * @param {String} message 
     * @param {boolean} status 
     * @param {any} data 
     */
    jsonResponse(message, status, data) {
        let statusCode = status ? 200 : 400;
        return this.res.status(statusCode).json({message, status: status ? "success" : "error", data});
    }

    /**
     * error response
     * @param {number} statusCode 
     * @param {string} message 
     */
    errorResponse(statusCode, message) {
        return this.res.status(statusCode).json({message, status: "error", data: null})
    }

    /**
     * validation response
     * @param {boolean} isValidated 
     * @param {string} fullFieldName 
     * @param {any} fieldValue 
     * @param {string} condition 
     * @param {any} conditionValue 
     */
    validationResponse(isValidated, fullFieldName, fieldValue, condition, conditionValue) {
        let data = {
            "validation": {
                "error": !isValidated,
                "field": fullFieldName,
                "field_value": fieldValue,
                "condition": condition,
                "condition_value": conditionValue
            }
        }
        let msg = `field ${fullFieldName} ${(isValidated?'successfully validated':'failed validation')}.`;
        return this.jsonResponse(msg, isValidated, data);
    }
}

module.exports = Response;