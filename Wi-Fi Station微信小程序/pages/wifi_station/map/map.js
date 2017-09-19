var app= getApp()

Page({
  data: {
    markers: [{
      iconPath: "../mark.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50
    }],
/*    polyline: [{
      points: [{
        latitude: 39.9611027038,
        longitude: 116.3600850105,
      }, {
          latitude: 39.9611027038,
          longitude: 116.3600850105,
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],


    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
    */
 
  },  

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },

  onLoad: function () {
    var wid = app.wid
    var witem = app.globalData.items
    console.log(wid)
    this.setData({
      markers: [{
        iconPath: "../mark1.png",
        id: 0,
        latitude: witem[wid].latitude,
        longitude: witem[wid].longitude,
        width: 50,
        height: 50
      }]
    })
  },
  
})