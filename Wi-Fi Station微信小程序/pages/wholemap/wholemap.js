var app= getApp()



Page({
    
  data: {
    markers0: [{
      iconPath: "../mark.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50
    },{
      iconPath: "../mark.png",
      id: 1,
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

  
  onShow: function () {
    console.log(app.globalData.num0)
    var num0 = 0
    var num1 = 0
    //    var wid = app.wid
    //    var witem = app.globalData.items
    //    console.log(wid)
    var id = app.globalData.items
    this.setData({
      markers0: [{
        iconPath: "../wifi_station/mark1.png",
        id: 0,
        latitude: id[0].latitude,
        longitude: id[0].longitude,
        width: 50,
        height: 50,
        callout: {
          content: "0号：" + app.globalData.num0,
          color: "#64951D",
          bgColor: "#F5F5F5",
          fontSize: 20
        }
      }, {
        iconPath: "../wifi_station/mark1.png",
        id: 1,
        latitude: id[1].latitude,
        longitude: id[1].longitude,
        width: 50,
        height: 50,
        callout: {
          content: "1号：" + app.globalData.num1,
          color: "#64951D",
          bgColor: "#F5F5F5",
          fontSize: 20,
          //  padding: 100
        }
      }]
    })

  },
  
})