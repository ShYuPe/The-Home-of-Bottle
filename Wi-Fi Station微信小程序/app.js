App({
  onLaunch() {
    console.log('App.onLaunch()');
  },
  onShow: function () {
  },
  onHide: function () {
  },

  //本应用全局数据
  globalData: {
    num0: 0,
    num1: 0,
    num: {},
    balance: {},
    wid: 0,
    items: [
      {
        name: 1, DeviceId: 9337667, latitude: 39.9611027038,
        longitude: 116.3600850105
      },
      {
        name: 2, DeviceId: 13622348, latitude: 39.9623526560, 
        longitude: 116.3563513756,
      }
    ],
  }
})
