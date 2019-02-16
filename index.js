module.exports = function(sails) {
    const install = require('./lib/rtsp.install.js');
    const uninstall = require('./lib/rtsp.uninstall.js');
  
    gladys.on('ready', function() {

    });
  
    return {
      install: install,
      uninstall: uninstall
    };
  };


