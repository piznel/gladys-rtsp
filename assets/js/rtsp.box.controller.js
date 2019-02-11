
(function () {
    'use strict';

    angular
        .module('gladys')
        .controller('RtspBoxCtrl', RtspBoxCtrl);

    RtspBoxCtrl.$inject = ['boxService', 'userService'];

    function RtspBoxCtrl(boxService, userService) {
        /* jshint validthis: true */
        var vm = this;

        vm.box = null;
        vm.saveCameraUrl = saveCameraUrl;
        vm.cameraUrl = null;
        vm.serverUrl = null;
        vm.init = init;
        var player;

        var client;

        addEventListener('load', load, false);

        function load(){
            if(!vm.enterUrl) {
                var container = document.getElementById("div-video-canvas");
                var width = container.clientWidth % 2 === 1 ? container.clientWidth - 1 : container.clientWidth
                var canvas = document.getElementById('video-canvas');
                client = new WebSocket(vm.cameraUrl);

                client.onopen = function () {
                    client.send('{"width":' + width + ', "url":"' + vm.cameraUrl + '"}')
                    player = new JSMpeg.Player(vm.serverUrl, { canvas: canvas, poster:'../img/wait_gd.gif' });
                }
            }
        }

        function init(id) {
            vm.boxId = id;
            boxService.getById(id)
                .then(function (data) {
                    vm.box = data.data;
                    if (vm.box.params && vm.box.params.cameraUrl && vm.box.params.serverUrl) {
                        vm.enterUrl = false;
                        vm.cameraUrl = vm.box.params.cameraUrl;
                        vm.serverUrl = vm.box.params.serverUrl;

                    } else {
                        vm.enterUrl = true;
                    }
                });
        }

        function saveCameraUrl(cameraUrl, serverUrl ) {
            boxService.update(vm.boxId, { params: { serverUrl: serverUrl, cameraUrl:cameraUrl } })
                .then(function (data) {
                    vm.enterUrl = false;
                    vm.cameraUrl = url;
                    load()
                });
        }
    }
})();
