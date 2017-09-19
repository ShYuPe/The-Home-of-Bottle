var myCharts = require("../../../utils/wxcharts.js")//引入一个绘图的插件
var lineChart_num = null
var lineChart_balance = null
//var lineChart_tempe = null
var app = getApp()

Page({
  data: {
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },


  //把拿到的数据转换成绘图插件需要的输入格式
  convert: function () {
    var categories = [];
    var num = [];
    var balance = [];
   // var tempe = [];

    var length = app.globalData.balance.datapoints.length
    for (var i = length-1; i >= 0; i--) {
      categories.push(app.globalData.num.datapoints[i].at.slice(11,19));
      num.push(app.globalData.num.datapoints[i].value);
      balance.push(app.globalData.balance.datapoints[i].value);
    //  tempe.push(app.globalData.temperature.datapoints[i].value);
    }
    return {
      categories: categories,
      num: num,
      balance: balance,
     // tempe: tempe
    }
  },

  onLoad: function () {
    var wheatherData = this.convert();
    
    //得到屏幕宽度
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var wheatherData = this.convert();

    //新建湿度图表
    lineChart_num = new myCharts({
      canvasId: 'num',
      type: 'line',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'num',
        data: wheatherData.num,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '数量 (个)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 55
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });

  //新建光照强度图表
    lineChart_balance = new myCharts({
      canvasId: 'balance',
      type: 'line',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'balance',
        data: wheatherData.balance,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '剩余高度 (cm)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 190
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });

    

    //新建温度图表
    /*
    lineChart_tempe = new myCharts({
      canvasId: 'tempe',
      type: 'line',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'temperature',
        data: wheatherData.tempe,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: 'temperature (摄氏度)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 24
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });*/
  },

  showmap: function () {
    
    wx.navigateTo({
      url: '../map/map',
    })

  },

  
})
