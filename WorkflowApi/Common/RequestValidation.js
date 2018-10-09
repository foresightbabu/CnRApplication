/**
* Compare and validate the request body with given object model
* @param {JSON} requestBody
* @param {JSON} jsonData
*/
exports.validateBody = function (requestBody, jsonData) {
    let missingParams = [];
    try {
        Object.keys(jsonData).forEach(key => {
            if (requestBody[key] === undefined) {
                missingParams.push(String(key));
            }
        });
    } catch (error) {
        return false;
    }
    return missingParams;
}