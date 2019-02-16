
(function () {
    'use strict';

    angular
        .module('gladys')
        .controller('RtspBoxCtrl', RtspBoxCtrl);

    RtspBoxCtrl.$inject = ['boxService', 'userService', '$scope'];

    function RtspBoxCtrl(boxService, userService, $scope) {
        /* jshint validthis: true */
        var vm = this;

        vm.box = null;
        vm.saveCameraUrl = saveCameraUrl;
        vm.cameraUrl = null;
        vm.serverIp = null;
        vm.serverPort = null;
        vm.init = init;
        vm.player;
        vm.quality = 5;

        var width = 0;
        var client;
        var server = '';

        //addEventListener('load', load, false);

        $scope.$watch('$viewContentLoaded', function () {
            load()
        })

        function load() {
            var container = document.getElementById("div-video-canvas");
            width = container.clientWidth % 2 === 1 ? container.clientWidth - 21 : container.clientWidth - 20
        }

        function connect() {
            var canvas = document.getElementById('video-canvas');
            client = new WebSocket(server);
            client.onopen = function () {
                client.send('{"width":' + width + ', "url":"' + server + '" , "quality":"' + vm.quality + '"}')
                vm.player = new JSMpeg.Player(server, { canvas: canvas, poster: '../img/wait_gd.gif' });
            }
        }

        function init(id) {
            vm.boxId = id;
            boxService.getById(id)
                .then(function (data) {
                    vm.box = data.data;
                    console.log(vm.box)
                    if (vm.box.params && vm.box.params.cameraUrl && vm.box.params.serverIp && vm.box.params.serverPort && vm.box.params.quality) {
                        vm.enterUrl = false;
                        vm.cameraUrl = vm.box.params.cameraUrl;
                        vm.serverIp = vm.box.params.serverIp;
                        vm.serverPort = vm.box.params.serverPort;
                        vm.quality = vm.box.params.quality;
                        server = 'wss://' + vm.serverIp + ':' + vm.serverPort + '/'
                        connect()

                    } else {
                        vm.enterUrl = true;
                    }
                });
        }

        function saveCameraUrl(cameraUrl, serverIp, serverPort, quality) {
            if (cameraUrl && serverIp && serverPort && quality) {
                boxService.update(vm.boxId, { params: { serverIp: serverIp, cameraUrl: cameraUrl, serverPort: serverPort, quality: quality } })
                    .then(function (data) {
                        vm.enterUrl = false;
                        if (vm.player) vm.player.destroy()
                        if (client) client.close();
                        connect()
                    });
            }

        }
    }
})();
