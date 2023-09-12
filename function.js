const { Code } = require("typeorm");

function throwError (condition, message, code) {
    if (condition) {
        const error = new Error(message);
        error.status = Code
    }
}