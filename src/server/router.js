const fundholdlist = require('./curdApi/fundholdlist')

module.exports = function(app) {
    return fundholdlist(app)
}