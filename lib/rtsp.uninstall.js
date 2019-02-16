const queries = require('./rtsp.queries.js');

module.exports = function uninstall() {

    // delete dashboard box
    gladys.utils.sql(queries.deleteBox)
        .then(function (data) {
            sails.log.debug('RTSP box deleted !');
        })

    // delete boxType
    return gladys.utils.sql(queries.deleteBoxType)
        .then(function (data) {
            sails.log.debug('RTSP boxType deleted !');
        })
};