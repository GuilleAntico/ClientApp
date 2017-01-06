
var errorHandler = function(res) {
    return function(error) {

        res.status(400).json(error.message);

    };
};

module.exports = errorHandler;