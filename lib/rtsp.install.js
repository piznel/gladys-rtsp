

module.exports = function install() {

  const boxRTSP = {
    uuid: '5b9d1b63-5ea5-449d-96b9-193ce47c83d7',
    title: 'Camera RTSP',
    path: 'api/hooks/rtsp/views/rtsp.box.ejs',
    view: 'dashboard'
  };

  return gladys.boxType.create(boxRTSP)
    .then((boxType) => {
      sails.log.debug(`Gladys-Rtsp : box type created, with id ${boxType.id} !`);
      return 'success'
    })
    .catch((err) => {
      sails.log.error('Gladys-Rtsp : install failed with error ', err)
      return 'failed'
    })
};
