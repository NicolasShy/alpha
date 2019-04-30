var Log = require('./../model/Log');
var OrderLog = require("./../model/OrderLog");
var mongoose = require("mongoose");
var _ = require('underscore')._;

function log() {
  return function (req, res, next) {
    var end = res.end, url = req.originalUrl.toString();
    console.debug("order action %s is recorded!", url);
    // proxy end to output a line to the provided logger.
    res.end = function (chunk, encoding) {
      res.end = end;
      res.end(chunk, encoding);
      var data;
      if (url) {
        //记录订单日志
        if (url == '/order/save') {
          if (chunk) data = JSON.parse(chunk);
          //订单保存
          var order_ID = data.data && data.data._id;
          new OrderLog({
            order_ID: order_ID,
            opType: "提交订单",
            operator: req.body.operator,
            operateTime: Date.now(),
            detail: ""
          }).save();

        } else if (/\/order\/update\/\w{24,24}/.test(url)) {
          if (chunk) data = JSON.parse(chunk);
          //订单更新
          console.debug("the request orderID is %s", req.params.id);
          //获取订单号信息
          var order_ID, detail;
          if (req.params.id && req.params.id.length == 24) {
            order_ID = mongoose.Types.ObjectId(req.params.id);
          }
          //获取变更信息
          if (data.error == 0) {
            var statusName = "";
            switch (req.body.status.toString()) {
              case "0": statusName = "未支付"; break;
              case "1": statusName = "已支付"; break;
              case "2": statusName = "已确认"; break;
              case "3": statusName = "已取消"; break;
              case "4": statusName = "已退款"; break;
              case "5": statusName = "退款中"; break;
              default: statusName = "";
            }
            detail = "订单状态更改为__newStatus__".replace(/__newStatus__/, statusName);
          } else {
            detail = "订单状态变更失败"
          }
          new OrderLog({
            order_ID: order_ID,
            opType: "状态变更",
            operator: req.body.operator,
            operateTime: Date.now(),
            detail: detail
          }).save();

        } else if (/\/order\/invoice\/update\/\w{24,24}/.test(url)) {
          if (chunk) data = JSON.parse(chunk);
          //更新发票状态
          var order_ID, detail;
          //获取变更信息
          if (data.error == 0) {
            var invoiceStatusName = "";
            switch (req.body.status.toString()) {
              case "0": invoiceStatusName = "未开"; break;
              case "1": invoiceStatusName = "已开"; break;
              case "2": invoiceStatusName = "已作废"; break;
              default: invoiceStatusName = "";
            }
            detail = "发票状态更改为:__newStatus__。".replace(/__newStatus__/, invoiceStatusName);
            //如果有发票号信息，把发票号信息也一并显示出来
            if (req.body.num) detail += " 发票号为:__invoceNum__".replace(/__invoceNum__/, req.body.num);
          } else {
            detail = "发票状态变更失败"
          }
          if (req.params.id && req.params.id.length == 24) {
            order_ID = mongoose.Types.ObjectId(req.params.id);
          }
          new OrderLog({
            order_ID: order_ID,
            opType: "更新发票",
            operator: req.body.operator,
            operateTime: Date.now(),
            detail: detail
          }).save();
        }
      }
    };
    next();
  }
}

exports.mongoLog = log;