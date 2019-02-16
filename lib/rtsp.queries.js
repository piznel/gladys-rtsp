module.exports = {

    deleteBox: `DELETE FROM box WHERE box.boxtype = 
      (SELECT id FROM boxtype WHERE uuid ='5b9d1b63-5ea5-449d-96b9-193ce47c83d7');`,

    deleteBoxType: `DELETE FROM boxtype WHERE
      uuid = '5b9d1b63-5ea5-449d-96b9-193ce47c83d7'`
}