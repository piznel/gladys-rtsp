module.exports = function(sails) {
    const install = require('./lib/rtsp.install.js');
  
    gladys.on('ready', function() {

    });
  
    return {
      install: install,
    };
  };


